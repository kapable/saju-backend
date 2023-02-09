const express = require('express');
const router = express.Router();
const { Mansedata, S022, S064, S065, S066, S027, S116, S117, S028 } = require('../models');
const { gabja_alphabet_converter,
        gabja_number_converter,
    } = require('../tools');
const crypto = require('crypto-js');

router.get('/total/:queryDate', async(req, res, next) => {
    try {
        // get birthday from front-end
        // const bytes = crypto.AES.decrypt(decodeURIComponent(req.params.queryDate), 'ktestsaju');
        // const decryptedDate = JSON.parse(bytes.toString(crypto.enc.Utf8));
        const birtday_info = await Mansedata.findOne({
            where: { no: req.params.queryDate } // birthday
        });
        let my_year_h_org = birtday_info?.year_h;
        let my_year_e_org = birtday_info?.year_e;
        let my_day_h_org = birtday_info?.day_h;
        let my_day_e_org = birtday_info?.day_e;

        // total SAJU
        const total_saju = await S022.findOne({
            where: { DB_express: parseInt(my_year_e_org, 10) },
            attributes: ['DB_data'],
        });

        // health SAJU
        const health_saju = await S064.findOne({
            where: { DB_express: my_day_h_org + my_day_e_org },
            attributes: ['DB_data'],
        });

        // chracter SAJU
        const chracter_saju = await S065.findOne({
            where: { DB_express: my_day_h_org + my_day_e_org },
            attributes: ['DB_data'],
        });

        // job SAJU
        const job_saju = await S066.findOne({
            where: { DB_express: my_day_h_org + my_day_e_org },
            attributes: ['DB_data'],
        });

        res.status(200).json({ total_saju: total_saju.DB_data, health_saju: health_saju.DB_data, chracter_saju: chracter_saju.DB_data, job_saju: job_saju.DB_data });
    } catch (error) {
        console.error(error);
        next(error);
    };
});

module.exports = router;