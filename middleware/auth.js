const jwt = require('jsonwebtoken');
const getData = require('../services/getData');
const dotenv = require('dotenv');

const whiteList = [new RegExp('/about'), new RegExp('/policy'), new RegExp('/news'), new RegExp('/contact'), new RegExp('/support'), new RegExp('^/campgrounds/([a-zA-Z0-9_-]+)$')]
dotenv.config();

class Auth {
    generateToken(id) {
        return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    }

    // IF USER IS LOGGED IN OR NOT

    verifyToken(req, res, next) {
        const token = req.cookies.token;
        if (!token) {
            if (whiteList.map((item) => item.test(req.url))) {
                return next();
            }
            res?.redirect('/accounts/login');
        }
        else {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if (err)
                    res?.redirect('/accounts/login');
                else {
                    const user = await getData.getUser(decoded.id);
                    req.user = { id: user.id, avatar: user.avatar };
                    next();
                }
            })
        }
    }


    // IF USER TRIES TO ACCESS OWN CONTENT WITH ITS OWN ID

    async authType(req) {
        let id;
        if (!Object.keys(req.params).length)
            id = req.user;
        else
            id = req.params.id;
        const token = req.cookies.token;
        const user = await getData.getUser(id);
        let auth = false;
        let decodedToken = null;
        if (token) {
            try {
                decodedToken = jwt.verify(token, process.env.JWT_SECRET);
                if (decodedToken.id == id)
                    return { user, auth: true };
            } catch (err) { }
        }
        return { user, auth };
    }
}

module.exports = new Auth();