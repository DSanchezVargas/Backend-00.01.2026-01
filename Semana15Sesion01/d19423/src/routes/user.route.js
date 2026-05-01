const controller = require('../controllers/user.controller');
const { authJWT } = require('../middelwares');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    app.get('/api/test/all', controller.allAccess);
    app.get('/api/test/users', [authJWT.verifyToken], controller.onlyUsers);
    app.get('/api/test/moderator', [authJWT.verifyToken, authJWT.isModerator], controller.onlyModerators);
    app.get('/api/test/admin', [authJWT.verifyToken, authJWT.isAdmin], controller.onlyAdmins);
};