// used to implement helper function testing
const dummy = (blogs) => {
    return 1
}

// get total likes from all blogs
const totalLikes = (blogs) => {
    const sumReducer = (sum, item) => {
        return sum + item
    }

    const likesArr = []
    blogs.forEach( blog => likesArr.push(blog.likes))

    return likesArr.reduce(sumReducer, 0)
}

// find the blog with the most likes
const favoriteBlog = (blogs) => {
    let favorite = []
    let topLikes = 0

    blogs.forEach(blog => {
        if (blog.likes >= topLikes) {
            favorite.push(blog)
            topLikes = blog.likes
        }
    })

    return favorite
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
