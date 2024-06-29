import { createContext, useEffect, useState } from "react"
import { posts, comments, queryService } from "../backend/agent"
import propTypes from 'prop-types'

const AppContext = createContext()

const AppProvider = ({children}) => {
    const [postsSaved, setPostsSaved] = useState([])

    const addPost = async (title) => {
        await posts.createPost(title)
        const postsFetched = await queryService.getPosts()
        setPostsSaved(postsFetched.data)
    }

    const getPosts = async () => {
        const postsFetched = await queryService.getPosts()
        setPostsSaved(postsFetched.data)
    }

    const createComment = async (comment, postId) => {
        await comments.createComment(comment, postId)
        const postsFetched = await queryService.getPosts()
        setPostsSaved(postsFetched.data)
    }

    useEffect(() => {
        getPosts()
    },[])

    return(
        <AppContext.Provider
            value={{
                postsSaved,
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