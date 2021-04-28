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

// find the author with the most amount of blogs
const mostBlogs = (blogs) => {

    let counts = {}

    blogs.forEach(blog => {
        let author = blog.author
        counts[author] = counts[author] ? counts[author] + 1 : 1;
    })

    const keyMax = Object.keys(counts).reduce( (a, b) => counts[a] > counts[b] ? a : b, null)

    const result = {
        author: keyMax,
        blogs: counts[keyMax] ? counts[keyMax] : null
    }

    return keyMax ? result : {}
}

// find author with most overall likes
const mostLikes = (blogs) => {

    let likeCounts = {}

    blogs.forEach(blog => {
        let author = blog.author
        likeCounts[author] = likeCounts[author] ? likeCounts[author] + blog.likes : blog.likes
    })

    const keyMax = Object.keys(likeCounts).reduce( (a, b) => likeCounts[a] > likeCounts[b] ? a : b, null)

    const result = {
        author: keyMax,
        likes: likeCounts[keyMax]
    }

    return keyMax ? result : {}
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
