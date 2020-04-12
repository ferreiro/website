import blogRepository from '../../../api/repository/blog'

import {createViewPath} from '../create-view-path'

export const getLinksPage = (_, res) => {
	try {
		blogRepository.getMostRecentPosts()
			.then((posts) => {
				return res.render(createViewPath('links', 'links.pug'), {
			        title: 'Links Jorge Ferreiro',
			        path: 'links',
			        post: posts[0]
			    })
			})
	} catch (error) {
		console.log(error)
		return res.json({ error })
	}
}
