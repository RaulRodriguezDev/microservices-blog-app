import { BsPostcard } from "react-icons/bs"

const PostListEmptyDashboard = () => {
    return (
        <div className="container rounded w-1/2 mx-auto flex flex-col items-center">
            <BsPostcard size={100} className=""/>
            <p className="text-2xl">No posts yet. Create a new one</p>
        </div>
    )
}

export default PostListEmptyDashboard