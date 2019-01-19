import { markdown } from 'markdown'
import fs from 'fs'
import variable from './variable'

const projectPath = variable.projectPath

async function index(req, res) {
    res.redirect('/index')
}

async function getPost(req, res) {
    // 获取文章路径，.md 可以忽略
    let filePath = `${projectPath}/${req.path}`

    if (!filePath.endsWith(".md")) {
        filePath += ".md"
    }
    
    const isExists = fs.existsSync(filePath)
    if (!isExists) {
        res.render('post', { title: '文章', content: '404 - NOT FOUND' });
        return
    }

    const mdContent = fs.readFileSync(filePath, 'utf-8')
    const htmlContent = markdown.toHTML(mdContent)

    res.render('post', { title: '文章', content: htmlContent });
}

async function listPosts(req, res) {
    res.render('post_list', { title: '文章列表', posts_summaries: variable.postsSummaries });
}

export default {
    getPost,
    index,
    listPosts
}