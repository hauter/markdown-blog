import Git from 'simple-git/promise'
import fs from 'fs'
import path from 'path';
import mkdirp from 'mkdirp'

async function getNewCommit(repoPath, localPath) {
    if (!path.isAbsolute(localPath)) {
        throw `local path: ${localPath} is not a absolute path`
    }

    if (repoPath.startsWith("https")) {
        throw `Only support a repo path within ssh protocol`
    }

    const projectPath = getProjectPath(repoPath, localPath)

    // dir not found, try to create it
    if (!fs.existsSync(localPath)) {
        console.info("making dir: ", localPath)
        mkdirp.sync(localPath)
    }

    // project not found, to clone
    if (!fs.existsSync(projectPath)) {
        console.log('Clone: ', repoPath, 'at', localPath)
        await Git(localPath).clone(repoPath)
        return
    }

    const git = Git(projectPath)

    // check if the localPath is a repo path
    let isRepo = await git.checkIsRepo()
    if (!isRepo) {
        throw `Dir: ${projectPath} is not a clean dir! Maybe you should remove it!`
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


export default {
    getNewCommit,
    getProjectPath
}