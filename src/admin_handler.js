import config from 'config'
import jwtUtil from './jwt_util'

async function loginPage(req, res) {
    res.render('admin_login', { title: 'Admin Login' });
}

async function doLogin(req, res) {
    if (req.body.password == undefined || req.body.password !== config.get("admin.password")) {
        res.render('admin_login', { title: 'Admin Login', message: 'Invaid Password'});
    } else {
        const token = jwtUtil.signLoginToken({name: 'admin', loginAt: new Date()})
        res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true });
        res.render('admin_list', { title: 'Admin List'});
    }
}

async function refreshPosts(req, res) {

}

export default {
    loginPage,
    doLogin,
    refreshPosts
}