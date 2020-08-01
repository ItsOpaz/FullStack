const lodash = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0){
    return 0
  }else{
    return blogs.map(blog => blog.likes).reduce((a,b) => a+b, 0)
  }
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((fav, blog) => fav.likes > blog.likes ? fav : blog)

}

const mostBlogs = (blogs) => {
  const count = lodash.countBy(blogs, 'author')
  const author = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b)
  return ({ author: author, blogs: count[author] })
}

const mostLikes = (blogs) => {
  const favorite = favoriteBlog(blogs).author
  const blogsFromFavorite = blogs.filter(blog => blog.author === favorite)
  return ({author: favorite, likes: totalLikes(blogsFromFavorite)})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}