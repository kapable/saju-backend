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
        const bytes = crypto.AES.decrypt(decodeURIComponent(req.params.queryDate), 'ktestsaju');
        const decryptedDate = JSON.parse(bytes.toString(crypto.enc.Utf8));
        const birtday_info = await Mansedata.findOne({
            where: { no: decryptedDate } // birthday
        });
        let my_year_h = birtday_info?.year_h;
        let my_year_e = birtday_info?.year_e;

        res.status(200).json({my_year_e, my_year_h})
    } catch (error) {
        console.error(error);
        next(error);
    };
});

module.exports = router;