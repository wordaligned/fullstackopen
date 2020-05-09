var _ = require('lodash')

const totalLikes = (blogs) => _.sumBy(blogs, 'likes')

const favouriteBlog = (blogs) => _.maxBy(blogs, 'likes')

const mostBlogs = (blogs) => {
  if (blogs.length > 0) {
    const authored = _.countBy(blogs, 'author')
    const most = _.maxBy(Object.keys(authored), (a) => authored[a])
    return { author: most, count: authored[most] }
  }
}

module.exports = { totalLikes, favouriteBlog, mostBlogs }
