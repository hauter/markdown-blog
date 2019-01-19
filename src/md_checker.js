import fs from 'fs'
import variable from './variable'

/**
 * to get the summary of the markdown file
 * @param {target markdown file path} mdFilePath 
 */
function summary(mdFilePath) {
    const content = fs.readFileSync(mdFilePath, 'utf-8')

    const titleStr = content.split("===")[0].trim()
    const title = titleStr === "" ? "Untitled Post" : titleStr
    
    return {
        title,
        path: mdFilePath.replace(variable.projectPath, ""),
        absolutePath: mdFilePath
    }
}

function summaryBatch(mdFilePaths) {
    let ret = []
    mdFilePaths.forEach((f) => {
        ret.push(summary(f))
    })

    return ret
}

export default {
    summary,
    summaryBatch
}