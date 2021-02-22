const { map } = require("../app")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, cur) => acc + cur.likes, 0)
}

const favouriteBlog = (blogs) => {
  const sorted = blogs.sort((a, b) => {
    if (a.likes > b.likes) return 1
    if (a.likes < b.likes) return -1
    return 0
  })
  
  return sorted[sorted.length - 1]
}

const mostBlogs = (blogs) => {
  const res = blogs.reduce((acc, cur) => acc.set(cur.author, (acc.get(cur.author) || 0) + 1), new Map())
  const sorted = [...res.entries()].sort((a, b) => {
    if (a[1] > b[1]) return 1
    if (a[1] < b[1]) return -1
    return 0
  })
  
  return {
    author: sorted[sorted.length - 1][0],
    
  }
}

const mostLikes = (blogs) => {
  const res = blogs.reduce((acc, cur) => acc.set(cur.author, (acc.get(cur.author) || 0) + cur.likes), new Map())
  const sorted = [...res.entries()].sort((a, b) => {
    if (a[1] > b[1]) return 1
    if (a[1] < b[1]) return -1
    return 0
  })

  return {
    author: sorted[sorted.length - 1][0],
    likes: sorted[sorted.length - 1][1]
  }
}
module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}
