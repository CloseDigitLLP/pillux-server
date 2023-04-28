const jwt = require('jsonwebtoken')
module.exports = {
    getToken: (user) => {
        var accessToken = jwt.sign(user, process.env.JWT_KEY, { expiresIn: '1w' });
        // var refreshToken = jwt.sign(user, process.env.JWT_KEY, { expiresIn: process.env.NODE_ENV === 'production' ? '4w' : '4w' });

        return accessToken
    },
    verify: (token) => {
        return jwt.verify(token, process.env.JWT_KEY);
    }
}