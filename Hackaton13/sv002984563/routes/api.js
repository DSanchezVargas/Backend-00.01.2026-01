const express = require(`express`);
const router = express.Router();

const validateJson = require(`../middlewares/validate.json`);

router.get(`/health`, (req,res)=>{
    return res.status(200).json({
        status: "ok"
    });
});

router.post(`/data`, (req,res)=>{
    return res.status(200).json({
        received: true
    });
});

module.exports = router;