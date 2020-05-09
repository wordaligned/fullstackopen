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

const mostLikes = (blogs) => {
  let author_likes = []
  _.each(_.groupBy(blogs, 'author'), (entries, author) => {
    author_likes.push({ author: author, likes: _.sumBy(entries, 'likes') })
  })
  return _.maxBy(author_likes, 'likes')
}

module.exports = { totalLikes, favouriteBlog, mostBlogs, mostLikes }
