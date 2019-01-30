import config from 'config'
import jwtUtil from './jwt_util'
import postRepo from './post_repo'
import variable from './variable'

async function loginFilter(req, res, next) {

    const loginToken = req.cookies.token
    if (loginToken && "" !== loginToken) {
        try {
            const payload = jwtUtil.verifyLoginToken(loginToken)
            if (payload.name == 'admin') {
                next()
                return
            }
        } catch (err) {
            console.error('parser token error', err)
        }
    }

    if (req.accepts(['json', 'html']) === 'json') {
        res.send({ message: 'Login Session Expired!'})
    } else {
        res.render('admin_login', { title: 'Admin Login', message: 'Login Session Expired!'});
    }
}

async function adminHome(req, res) {
    res.render('admin_list', { title: 'Admin List'});
}

async function loginPage(req, res) {
    res.render('admin_login', { title: 'Admin Login' });
}

async function doLogin(req, res) {
    if (req.body.password == undefined || req.body.password !== config.get("admin.password")) {
        res.render('admin_login', { title: 'Admin Login', message: 'Invaid Password'});
    } else {
        const token = jwtUtil.signLoginToken({name: 'admin', loginAt: new Date()})
        res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
        res.redirect('/admin');
    }
}

async function refreshPosts(req, res) {
    await variable.init()
    res.send({message: "Done!"})
}

export default {
    loginFilter,
    adminHome,
    loginPage,
    doLogin,
    refreshPosts
}