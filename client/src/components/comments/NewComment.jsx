import { Button, Form, Icon, TextArea } from "semantic-ui-react"
import propTypes from 'prop-types'
import { useContext, useState } from "react"
import AppContext from "../../context/AppContext"
import { toast } from "react-toastify"

const NewComment = ({ postId }) => {
    const [comment, setComment] = useState('')
    const [loading, setLoading] = useState(false)
    const { createComment } = useContext(AppContext)

    const handleSubmitComment = async () => {
        try{

            setLoading(true)
            await createComment(comment, postId)
            toast.info('Comment created', {
                icon: <Icon name='send' />
            })

        }catch(error){
            console.log(error)
            toast.error("Error creating comment")

        }finally{
            
            setLoading(false)
            setComment('')
        }
    }

    return (
        <>
            <Form>
                <TextArea 
                    rows={3} 
                    placeholder='Add a comment' 
                    onChange={e => setComment(e.target.value)}
                    value={comment}
                />
            </Form>
            <div className="mt-2">
                <Button loading={loading} content='Add Comment' positive fluid onClick={handleSubmitComment}/>
            </div>
        </>
    )
}

NewComment.propTypes = {
    postId: propTypes.string
}
export default NewComment