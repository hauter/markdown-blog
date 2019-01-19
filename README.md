Markdown Blog
===

This is a super simple blog system based on markdown article format.

## Quick Start

### Download

```shell
git clone git@github.com:hauter/markdown-blog.git
```

### Post Git Repository

1. create a post repository as your posts library on github
2. create a index.md and commit to github, the index.md can be something like this:

```markdown
My Blog
===

## This is the index page, but it's only for test.

```


### Configuration

1. Edit the config file `config.json`, 

```json
{
    "post": {
        "git": "Your post repository url with ssh protocal",
        "localPath": "The location that you want to save the posts in the disk"
    }
}

```

2. Start Server

```
npm install
npm run start

```

### Git Webhooks

In order to let the blog server get the new post changes as soon as possiable, you need to config the webhooks of post repository. 

In Github:

Settings => Webhooks => Add webhook