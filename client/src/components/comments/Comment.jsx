import propTypes from 'prop-types'
import { FeedContent, FeedEvent, FeedLabel } from 'semantic-ui-react'

const Comment = ({content}) => {
    return (
        <FeedEvent>
            <FeedLabel icon='commenting'/>
            <FeedContent content={content}/>
        </FeedEvent>
    )
}

Comment.propTypes = {
    content: propTypes.string
}

export default Comment