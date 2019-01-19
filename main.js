import express from 'express'
import handler from './src/handler'
import variable from './src/variable'


async function main() {
    await variable.init()
    const app = express()

    app.set('views', './views');
    app.set('view engine', 'pug');
    app.use('/static', express.static('static'));
    app.use('/static', express.static(`${variable.projectPath}/static`));

    app.get('/', handler.index)
    app.get('/posts', handler.listPosts)
    app.get('/*', handler.getPost);


    app.listen(3000, function () {
        console.log("App is runing on port 3000!")
    })
}




main()