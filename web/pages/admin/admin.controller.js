import {createViewPath} from '../create-view-path'
import {parseRequestPostData} from './parse-request-post-data'
import blogRepository from '../../../api/repository/blog'

export const logout = (req, res, next) => {
    req.logout();
    res.redirect('/admin')
}
  
export const login = (req, res, next) => {
    if (req.user) {
        return res.redirect('/admin') // logged!
    }

    let message = null
    if (req.flash('error').length > 0) {
        message = 'Invalid password or email.'
    }

    res.render(createViewPath('admin', 'views/login.pug'), {
        message: message
    })
}
  
export const postLogin = (req, res, next) => {
    if (!req.recaptcha.error) {
        return next()
    }

    return res.render(createViewPath('admin', 'views/login.pug'), {
        error: 'Recaptcha is not valid.'
    })
}
  
export const getAllPosts = (req, res, next) => {
    let locals = {
        title: 'Posts',
        path: 'admin',
        admin: true
    }

    return blogRepository.getAll().then(posts => {
        locals.posts = posts
        res.render(createViewPath('admin', 'views/home.pug'), locals)
    }).catch(err => {
        locals.error = err
        res.render(createViewPath('admin', 'views/home.pug'), locals)
    })
}

export const getPublishedPosts = (req, res, next) => {
    let locals = {
        title: 'Published',
        path: 'admin',
        admin: true
    }
    const opts = {
        nextPage: 0,
        maxPagePosts: 10
    }

    return blogRepository.getAllPublished({}, opts)
        .then(posts => {
            console.log(posts)
            locals.posts = posts
            res.render(createViewPath('admin', 'views/home.pug'), locals)
        })
        .catch(error => {
            locals.error = error
            res.render(createViewPath('admin', 'views/home.pug'), locals)
        })
}

export const getDraftsPosts = (req, res, next) => {
    let locals = {
        title: 'Drafts',
        path: 'admin',
        admin: true
    }

    return blogRepository.getAllDrafts().then(posts => {
        locals.posts = posts
        res.render(createViewPath('admin', 'views/home.pug'), locals)
    }).catch(err => {
        locals.error = err
        res.render(createViewPath('admin', 'views/home.pug'), locals)
    })
}

export const createPostComposer = (req, res, next) => {
    const context = {
        admin: true
    }

    res.render(createViewPath('admin', 'views/create.pug'), context)
}

export const postNewBlog = (req, res, next) => {
    const postData = parseRequestPostData(req.body)

    return blogRepository.create(postData).then((post) => {
        return res.json({
            post: post,
            success: 'Post created!'
        })
    }).catch((error) => {
        return res.json({
            error: 'Failed to create new post.<br />' + error
        })
    })
}
  
export const editPostPage = (req, res, next) => {
    const postPermalink = req.params.permalink

    return blogRepository.findByPermalink({
        permalink: postPermalink
    }).then(post => {
        return res.render(createViewPath('admin', 'views/create.pug'), {
            edit: true,
            post: post,
            admin: true
        })
    }).catch((err) => {
        return res.render(createViewPath('admin', 'views/home.pug'), {
            error: 'Failed to create new post.'
        })
    })
}
  
export const editPostSubmit = (req, res, next) => {
    const postPermalink = req.params.permalink
    const postData = parseRequestPostData(req.body)

    return blogRepository.findAndUpdateByPermalink(postPermalink, postData).then(post => (
        res.json({
            post
        })
    )).catch((err) => (
        res.json({
            error: 'Failed to update post.'
        })
    ))
}

// Show a confirmation screen before deleting a post
export const deletePostConfirmation = (req, res, next) => {
    const postPermalink = req.params.permalink

    return res.send('Are you sure you want to delete the post?<br /><a href="/admin">Cancel</a><a href="/admin/delete/' + postPermalink + '/confirm">Yes. I know this action can not be undo</a>')
}

export const deletePost = (req, res, next) => {
    const postPermalink = req.params.permalink

    blogRepository.findAndDeleteByPermalink(postPermalink).then((post) => (
        res.redirect('/admin')
    )).catch((err) => (
        res.render(createViewPath('admin', 'home.pug'), {
            error: 'Failed to update post.'
        })
    ))
}