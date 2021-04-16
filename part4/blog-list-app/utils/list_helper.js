// used to implement helper function testing
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sumReducer = (sum, item) => {
        return sum + item
    }

    const likesArr = []
    blogs.forEach( blog => likesArr.push(blog.likes))

    return likesArr.reduce(sumReducer, 0)
}


module.exports = {
    dummy,
    totalLikes
}
