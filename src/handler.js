import { markdown } from 'markdown'
import fs from 'fs'


async function index(req, res) {
    res.redirect('/index')
}

async function getPost(req, res) {
    // 获取文章路径，.md 可以忽略
    let filePath = `_post/${req.path.replace("/posts/", "")}`
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

export default {
    getPost,
    index
}