const express = require('express');
const router = express.Router();
const { Mansedata, S087, S088, S089, S090, S091, S092 } = require('../models');
const { toStringByFormatting,
        gabja_alphabet_converter,
        gabja_number_converter,
    } = require('../tools');

router.get('/total/:birthDate', async(req, res, next) => {
    try {
        const todayFormatted = toStringByFormatting(new Date());
        const today_info = await Mansedata.findOne({
            where: { no: todayFormatted }
        });
        const birtday_info = await Mansedata.findOne({
            where: { no: req.params.birthDate }
        })
        let today_h = today_info?.day_h;
        let today_e = today_info?.day_e;
        let my_day_h = birtday_info?.day_h;
        let my_day_e = birtday_info?.day_e;

        today_h = gabja_alphabet_converter(today_h);
        today_e = gabja_number_converter(today_e);
        my_day_h = gabja_alphabet_converter(my_day_h);
        my_day_e = gabja_number_converter(my_day_e);
        
        const today_he = today_h + today_e;
        const my_day_he = my_day_h + my_day_e;
        const today_gabja_array = ['甲子','甲戌','甲申','甲午','甲辰','甲寅','乙丑','乙亥','乙酉','乙未','乙巳','乙卯','丙寅','丙子','丙戌','丙申','丙午','丙辰','丁卯','丁丑','丁亥','丁酉','丁未','丁巳','戊辰','戊寅','戊子','戊戌','戊申','戊午','己巳','己卯','己丑','己亥','己酉','己未','庚午','庚辰','庚寅','庚子','庚戌','庚申','辛未','辛巳','辛卯','辛丑','辛亥','辛酉','壬申','壬午','壬辰','壬寅','壬子','壬戌','癸酉','癸未','癸巳','癸卯','癸丑','癸亥'];
        const my_gabja_array = ['甲子','乙丑','丙寅','丁卯','戊辰','己巳','庚午','辛未','壬申','癸酉','甲戌','乙亥','丙子','丁丑','戊寅','己卯','庚辰','辛巳','壬午','癸未','甲申','乙酉','丙戌','丁亥','戊子','己丑','庚寅','辛卯','壬辰','癸巳','甲午','乙未','丙申','丁酉','戊戌','己亥','庚子','辛丑','壬寅','癸卯','甲辰','乙巳','丙午','丁未','戊申','己酉','庚戌','辛亥','壬子','癸丑','甲寅','乙卯','丙辰','丁巳','戊午','己未','庚申','辛酉','壬戌','癸亥'];
        const today_index = today_gabja_array.indexOf(today_he) + 1 || 1;
        const my_index = my_gabja_array.indexOf(my_day_he) + 1 || 1;
        const seed_number = today_index * my_index * new Date().getDate();
        const final_index_array = ["SS01","SS02","SS03","SS04","SS05","SS06","SS07","SS08","SS09","SS10","SS11","SS12","SS13","SS14","SS15","SJ01","SJ02","SJ03","SJ04","SJ05","SJ06","SJ07","SJ08","SJ09","SJ10","SJ11","SJ12","SJ13","SJ14","SJ15","SH01","SH02","SH03","SH04","SH05","SH06","SH07","SH08","SH09","SH10","SH11","SH12","SH13","SH14","SH15","JSS01","JSS02","JSS03","JSS04","JSS05","JSS06","JSS07","JSS08","JSS09","JSS10","JSS11","JSS12","JSS13","JSS14","JSS15","JSJ01","JSJ02","JSJ03","JSJ04","JSJ05","JSJ06","JSJ07","JSJ08","JSJ09","JSJ10","JSJ11","JSJ12","JSJ13","JSJ14","JSJ15","JSH01","JSH02","JSH03","JSH04","JSH05","JSH06","JSH07","JSH08","JSH09","JSH10","JSH11","JSH12","JSH13","JSH14","JSH15","JJS01","JJS02","JJS03","JJS04","JJS05","JJS06","JJS07","JJS08","JJS09","JJS10","JJS11","JJS12","JJS13","JJS14","JJS15","JJJ01","JJJ02","JJJ03","JJJ04","JJJ05","JJJ06","JJJ07","JJJ08","JJJ09","JJJ10","JJJ11","JJJ12","JJJ13","JJJ14","JJJ15","JJH01","JJH02","JJH03","JJH04","JJH05","JJH06","JJH07","JJH08","JJH09","JJH10","JJH11","JJH12","JJH13","JJH14","JJH15","HS01","HS02","HS03","HS04","HS05","HS06","HS07","HS08","HS09","HS10","HS11","HS12","HS13","HS14","HS15","HJ01","HJ02","HJ03","HJ04","HJ05","HJ06","HJ07","HJ08","HJ09","HJ10","HJ11","HJ12","HJ13","HJ14","HJ15","HH01","HH02","HH03","HH04","HH05","HH06","HH07","HH08","HH09","HH10","HH11","HH12","HH13","HH14","HH15"];
        
        // total luck
        const total_number = seed_number % 180;
        const total_index = final_index_array[total_number];
        const total_result = await S087.findOne({
            where: { DB_express: total_index },
            attributes: ['DB_data'],
        });

        // love luck
        const love_number = (seed_number + 135) % 180;
        const love_index = final_index_array[love_number];
        const love_result = await S088.findOne({
            where: { DB_express: love_index },
            attributes: ['DB_data'],
        });

        // wish luck
        const wish_number = (seed_number + 45) % 180;
        const wish_index = final_index_array[wish_number];
        const wish_result = await S089.findOne({
            where: { DB_express: wish_index },
            attributes: ['DB_data'],
        });

        // biz luck
        const biz_result = await S090.findOne({
            where: { DB_express: total_index },
            attributes: ['DB_data'],
        });

        // direction luck
        const direction_number = (seed_number + 90) % 180;
        const direction_index = final_index_array[direction_number];
        const direction_result = await S091.findOne({
            where: { DB_express: direction_index },
            attributes: ['DB_data'],
        });

        // wealth luck
        const wealth_result = await S092.findOne({
            where: { DB_express: total_index },
            attributes: ['DB_data'],
        });


        res.status(200).json({ total_result: total_result.DB_data, love_result: love_result.DB_data, wish_result: wish_result.DB_data, biz_result: biz_result.DB_data, direction_result: direction_result.DB_data, wealth_result: wealth_result.DB_data });
    } catch (error) {
        console.error(error);
        next(error);
    };
});

module.exports = router;