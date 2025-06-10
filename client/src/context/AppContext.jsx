import { createContext, useEffect, useState } from "react"
import { posts, comments, queryService } from "../backend/agent"
import propTypes from 'prop-types'

const AppContext = createContext()

const AppProvider = ({children}) => {
    const [postsSaved, setPostsSaved] = useState([])
    const [commentCreated, setCommentCreated] = useState("")

    const addPost = async (title) => {
        await posts.createPost(title)
        const postsFetched = await queryService.getPosts()
        setPostsSaved(postsFetched.data)
    }

    const getPosts = async () => {
        const postsFetched = await queryService.getPosts()
        console.log(postsFetched.data)
        setPostsSaved(postsFetched.data)
    }

    const createComment = async (comment, postId) => {
        const newComment = await comments.createComment(comment, postId)

        setPostsSaved(prevPosts => {
            const updatedPosts = { ...prevPosts }
            if (updatedPosts[postId]) {
                updatedPosts[postId] = {
                    ...updatedPosts[postId],
                    comments: [
                        ...updatedPosts[postId].comments,
                        newComment 
                    ]
                }
            }
            return updatedPosts
        })
        setCommentCreated(comment)
    }

    useEffect(() => {
        getPosts()
    },[])

    return(
        <AppContext.Provider
            value={{
                postsSaved,
                commentCreated,
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