const express = require(`express`);

const logger = (req, res, next) => {
    const initTime = Date.now();
    
    const { method, originalUrl } = req;

    res.on(`finish`, () =>{
        const duration = Date.now() - initTime;
        const { statusCode } = res;
        
        console.log(`${method} ${originalUrl} → ${statusCode} (${duration}ms)`);
    });

    next();
};

module.exports = logger;
