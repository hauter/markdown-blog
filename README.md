Markdown Blog
===

This is a super simple blog system based on markdown article format.

## Quick Start

### Preparation
1. Install Git

```
sudo apt-get install git
```

2. Install node and make sure the verion >= 11.8

Look: [node home page](https://nodejs.org/en/) for installtion


### Clone Project and install npm dependencies

```shell
git clone git@github.com:hauter/markdown-blog.git
cd markdown-blog
npm install
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

Edit the config file `config/default.json`, 

```json
{
    "post": {
        "git": "Your post repository url with ssh protocal",
        "localPath": "The location that you want to save the posts in the disk"
    },
    "admin": {
        "password": "admin page login password",
        "jwt-secret": "json web token secret"
    }
}

```

### Start Server

```
npm run start

```

### Git Webhooks

In order to let the blog server get the new post changes as soon as possiable, you need to config the webhooks of post repository. 

In Github:

Settings => Webhooks => Add webhook