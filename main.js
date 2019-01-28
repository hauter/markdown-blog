import express from 'express'
import handler from './src/handler'
import adminHander from './src/admin_handler'
import variable from './src/variable'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

async function main() {
    await variable.init()
    const app = express()

    app.set('views', './views');
    app.set('view engine', 'pug');
    app.use('/static', express.static('static'));
    app.use('/static', express.static(`${variable.projectPath}/static`));
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(cookieParser())

    app.get('/', handler.index)
    app.get('/posts', handler.listPosts)
    app.get('/admin', adminHander.loginFilter, adminHander.adminHome)
    app.get('/admin/login', adminHander.loginPage)
    app.post('/admin/login', adminHander.doLogin)
    app.post('/admin/posts/refresh', adminHander.loginFilter, adminHander.refreshPosts)
    app.get('/*', handler.getPost);


    app.listen(3000, function () {
        console.log("App is runing on port 3000!")
    })
}




main()