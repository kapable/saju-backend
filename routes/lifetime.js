const express = require('express');
const router = express.Router();
const { Mansedata, S022, S064, S065, S066, S027, S116, S117, S028 } = require('../models');
const { F_re_yukchin, gabja_alphabet_converter, F_mb_sibsin, save_wealth_logic,
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
        let my_month_h_org = birtday_info?.month_h;
        let my_month_e_org = birtday_info?.month_e;
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

        // wealth Luck
        const mb_sibsin = F_re_yukchin(my_month_e_org, 12, gabja_alphabet_converter(my_day_h_org));
        const serial_no = F_mb_sibsin(mb_sibsin);
        const wealth_luck = await S027.findOne({
            where: { DB_express: serial_no },
            attributes: ['DB_data'],
        });

        // save wealth
        const wealth_serial_no = save_wealth_logic(req.params.queryDate.slice(4,6), parseInt(req.params.queryDate.slice(6,8), 10));
        const save_wealth = await S116.findOne({
            where: { DB_express: wealth_serial_no },
            attributes: ['DB_data'],
        });

        // protect wealth
        const protect_wealth = await S117.findOne({
            where: { DB_express: wealth_serial_no },
            attributes: ['DB_data'],
        });
        
        // born Character
        const born_character = await S028.findOne({
            where: { DB_express: parseInt(my_year_e_org, 10) },
            attributes: ['DB_data'],
        });

        res.status(200).json({ total_saju: total_saju.DB_data, health_saju: health_saju.DB_data, chracter_saju: chracter_saju.DB_data, job_saju: job_saju.DB_data, wealth_luck: wealth_luck.DB_data, save_wealth: save_wealth.DB_data, protect_wealth: protect_wealth.DB_data, born_character: born_character.DB_data});
    } catch (error) {
        console.error(error);
        next(error);
    };
});

module.exports = router;