import express from 'express'
import handler from './src/handler'
import fs from 'fs'


async function main() {
    const app = express()

    app.set('views', './views');
    app.set('view engine', 'pug');
    app.use('/static', express.static('public'));
    app.use('/img', express.static('_post/img'));

    app.get('/', handler.index)
    app.get('/*', handler.getPost);


    app.listen(3000, function () {
        console.log("App is runing on port 3000!")
    })
}


main()