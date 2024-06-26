import { createContext, useEffect, useState } from "react"
import { posts, comments } from "../backend/agent"
import propTypes from 'prop-types'

const AppContext = createContext()

const AppProvider = ({children}) => {
    const [postsSaved, setPostsSaved] = useState([])
    const [commentsSaved, setCommentsSaved] = useState({})

    const addPost = async (title) => {
        const postAdded = await posts.createPost(title)
        setPostsSaved([...postsSaved, postAdded])
    }

    const getPosts = async () => {
        const postsFetched = await posts.getPosts()
        setPostsSaved([...Object.values(postsFetched.data)])
    }

    const createComment = async (comment, postId) => {
        await comments.createComment(comment, postId)
        await getComments()
    }

    const getComments = async () => {
        const commentsFetched = await comments.getComments()
        console.log(commentsFetched.data)
        setCommentsSaved({...commentsFetched.data})
    }

    useEffect(() => {
        getPosts()
        getComments()
    },[])

    return(
        <AppContext.Provider
            value={{
                postsSaved,
                commentsSaved,
                addPost,
                createComment,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

AppProvider.propTypes = {
    children: propTypes.node
}

export { AppProvider }
export default AppContext