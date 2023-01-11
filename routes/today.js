const express = require('express');
const router = express.Router();

router.get('/total', async(req, res, next) => {
    try {
        res.status(200).send('GOOd');
    } catch (error) {
        console.error(error);
        next(error);
    };
});

module.exports = router;