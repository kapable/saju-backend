const express = require('express');
const router = express.Router();
const { Op, where } = require('sequelize');
const { Mansedata } = require('../models');

const leftPad = (value) => {
    if (value >= 10) {
        return value;
    }
    return `0${value}`;
};

const toStringByFormatting = (source, delimiter = '') => {
    const year = source.getFullYear();
    const month = leftPad(source.getMonth() + 1);
    const day = leftPad(source.getDate());

    return [year, month, day].join(delimiter);
};

router.get('/total', async(req, res, next) => {
    try {
        const todayFormatted = toStringByFormatting(new Date());
        const day_info = await Mansedata.findOne({
            where: { no: todayFormatted }
        })
        res.status(200).json(day_info);
    } catch (error) {
        console.error(error);
        next(error);
    };
});

module.exports = router;