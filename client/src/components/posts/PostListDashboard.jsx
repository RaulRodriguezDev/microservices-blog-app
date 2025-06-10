import { useContext, useEffect, useState } from "react"
import PostCard from "./PostCard"
import AppContext from "../../context/AppContext"
import PostListEmptyDashboard from "./PostListEmptyDashboard"

const PostListDashboard = () => {
    const { postsSaved } = useContext(AppContext)
    const [postCards, setPostCards] = useState([])

    useEffect(() => {
        const posts = Object.values(postsSaved)
        const updatedPostCards = posts.map(post => {
            return <PostCard key={post.id} post={post}/>
        })
        setPostCards(updatedPostCards)

    }, [ postsSaved ]);

    return (
        <main className="flex flex-wrap">
            {postCards.length != 0 ? postCards : <PostListEmptyDashboard/>}
            {/*TODO: Add placeholder for each post card */}            
        </main>
    )
}

export default PostListDashboard