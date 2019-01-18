import Git from 'simple-git/promise'
import fs from 'fs'
import path from 'path';

async function getNewCommit(repoPath, localPath) {
    if (!path.isAbsolute(localPath)) {
        throw `local path: ${localPath} is not a absolute path`
    }

    if (repoPath.startsWith("https")) {
        throw `Only support a repo path within ssh protocol`
    }

    const projectPath = getProjectPath(repoPath, localPath)

    // dir not found, try to create it
    if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath)
    }

    const git = Git(projectPath)
    // check if the localPath is a repo path
    let isRepo = await git.checkIsRepo()
    if (!isRepo) {

        const files = fs.readdirSync(projectPath)
        if (files.length != 0) {
            throw `Dir: ${projectPath} is not a clean dir!`
        }

        console.info('Clone repo from:', repoPath, 'at: ', projectPath)
        await git.clone(repoPath)
        return
    }

    console.info('Pull master branch from remote')
    await git.pull()
}

//  get the absolute path of the project
function getProjectPath(repoPath, localPath) {
    const pg = repoPath.split('/')
    const projectName = pg[pg.length - 1].replace('.git', '')

    return path.join(localPath, projectName)
}


getNewCommit('git@github.com:hauter/markdown-posts.git', 'D:/lc/test-git')