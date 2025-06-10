import { Card, CardContent, CardDescription, Feed } from "semantic-ui-react"
import propTypes from 'prop-types'
import Comment from "../comments/Comment"
import NewComment from "../comments/NewComment"
import { useEffect, useState } from "react"

const PostCard = ({ post }) => {
    const {id, title, comments } = post
    const [commentsList, setCommentsList] = useState([])

    useEffect(() => {
        const updatedCommentsList = []
        if(comments.length != 0)
            comments.forEach((comment) => {
                let content

                switch (comment.status){
                    case 'Pending':
                        content = 'This comment is pending moderation'
                        break;
                    case 'Approved':
                        content = comment.content
                        break;
                    case 'Rejected':
                        content = 'This comment has been rejected'
                        break;
                }
                updatedCommentsList.push(<Comment key={comment.id} content={content} status={comment.status}/>)
            })
        setCommentsList(updatedCommentsList)
    },[comments])

    return(
        <div className=" m-3">
            <Card>
                <CardContent header={title}/>
                <CardContent>
                    <CardDescription>Comments</CardDescription>
                    <Feed>
                        {commentsList.length != 0 ? commentsList : <CardDescription>No comments yet</CardDescription>}                       
                    </Feed>
                </CardContent>
            </Card>
            <NewComment postId={id}/>
        </div>
    )
}

PostCard.propTypes = {
    post: propTypes.object,
}

export default PostCard