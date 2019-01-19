import config from 'config'
import postRepo from './post_repo'
import mdChecker from './md_checker'
import mdFinder from './md_finder'
import path from 'path'

let ext = {
    projectPath: postRepo.getProjectPath(config.get('posts').git, config.get('posts').localPath),
    postsSummaries: [],
    init
}

async function init() {
    console.info("Init posts resources...")
    const postsConfig = config.get('posts')

    // await postRepo.getNewCommit(postsConfig.git, postsConfig.localPath)
    console.info("Finish init posts resources.")

    console.info("Looking up markdown files..")
    const posts = mdFinder.find(path.join(ext.projectPath, 'posts'))
    const sumarries = mdChecker.summaryBatch(posts)

    console.info(`Found ${sumarries.length} markdown posts:`)
    sumarries.forEach((summary) => {
        console.log(`|    ${summary.title}  ${summary.path}`)
    })

    ext.postsSummaries = sumarries
}

export default ext
