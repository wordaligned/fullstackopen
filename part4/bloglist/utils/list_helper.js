const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length > 0) {
    return blogs.reduce((favourite, blog) => {
      return blog.likes > favourite.likes ? blog : favourite
    }, blogs[0])
  }
}

module.exports = { dummy, totalLikes, favouriteBlog }
