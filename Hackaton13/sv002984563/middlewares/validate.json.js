const express = require(`express`);

const validateJson = (req, res, next) => {
    if (!req.is(`application/json`)) {
        return res.status(400).json({
            error: 'Content-Type debe ser application/json'
        });
    }
    next();
};

module.exports = validateJson;