import express from 'express'
import handler from './src/handler'
import postRepo from './src/post_repo'
import config from 'config'

async function main() {
    await init()

    const projectPath = postRepo.getProjectPath(config.get('posts').git, config.get('posts').localPath)

    const app = express()

    app.set('views', './views');
    app.set('view engine', 'pug');
    app.use('/static', express.static('static'));
    app.use('/static', express.static(`${projectPath}/static`));

    app.get('/', handler.index)
    app.get('/*', handler.getPost);


    app.listen(3000, function () {
        console.log("App is runing on port 3000!")
    })
}


async function init() {
    console.info("Init posts resources...")
    const postsConfig = config.get('posts')

    await postRepo.getNewCommit(postsConfig.git, postsConfig.localPath)
    console.info("Finish init posts resources.")
}


main()