import config from 'config'
import fs from 'fs'
import postRepo from './post_repo'
import path from 'path'

function searchDir(mdFileList, dirList) {
    let newDirList = []
    dirList.forEach((currentPath) => {
        fs.readdirSync(currentPath, {withFileTypes: true}).forEach((dirent) => {
            const absolutePath = path.join(currentPath, dirent.name)
            if (dirent.name.startsWith(".")) {
                return
            }
    
            if (dirent.isDirectory()) {
                newDirList.push(absolutePath)
            } else if (dirent.isFile() && (dirent.name.endsWith(".md") || dirent.name.endsWith(".MD"))) {
                mdFileList.push(absolutePath)
            }
        })
    })


    if (newDirList.length == 0) {
        return mdFileList
    }

    return searchDir(mdFileList, newDirList)
}


/**
 * search all markdown files in the target path
 * @param {target path} targetPath 
 */
function find(targetPath) {
    return searchDir([], [targetPath])
}

 
export default {
    find
}