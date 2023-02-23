const express = require('express');
const router = express.Router();
const { Mansedata, S045, S046, S047 } = require('../models');
const crypto = require('crypto-js');
const { mid_life_converter } = require('../tools');

router.get('/total/:queryDate', async(req, res, next) => {
    try {
        // get birthday from front-end
        const bytes = crypto.AES.decrypt(decodeURIComponent(req.params.queryDate), 'ktestsaju');
        const decryptedDate = JSON.parse(bytes.toString(crypto.enc.Utf8));
        const birthday_info = await Mansedata.findOne({
            where: { no: decryptedDate } // birthday
        });
        let my_year_e_org = birthday_info?.year_e;
        let my_month_e_org = birthday_info?.month_e;
        let my_day_e_org = birthday_info?.day_e;
        let total_02 = mid_life_converter(my_month_e_org, my_year_e_org);

        // Early Life
        const early_luck = await S045.findOne({
            where: { DB_express: my_year_e_org },
            attributes: ['DB_data'],
        });

        // Mid Life
        const mid_luck = await S046.findOne({
            where: { DB_express: total_02 },
            attributes: ['DB_data'],
        });

        // Late Life
        const late_luck = await S046.findOne({
            where: { DB_express: my_day_e_org },
            attributes: ['DB_data'],
        });

        res.status(200).json({ early_luck: early_luck.DB_data, mid_luck: mid_luck.DB_data, late_luck: late_luck.DB_data });
    } catch (error) {
        console.error(error);
        next(error);
    };
});

module.exports = router;