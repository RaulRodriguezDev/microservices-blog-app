import propTypes from 'prop-types'
import { FeedContent, FeedEvent, FeedLabel, Icon } from 'semantic-ui-react'

const setIconName = (status) => {
    switch (status) {
        case 'Pending':
            return 'exclamation triangle'
        case 'Approved':
            return 'comment'
        case 'Rejected':
            return 'remove circle'
    }
}

const setIconColor = (status) => {
    switch (status) {
        case 'Pending':
            return 'yellow'
        case 'Approved':
            return 'blue'
        case 'Rejected':
            return 'red'
        default:
            return 'grey'
    }
}

const Comment = ({content, status}) => {

    return (
        <FeedEvent>
            <FeedLabel>
                <Icon name={setIconName(status)} color={setIconColor(status)} bordered={false}/>
            </FeedLabel>
            <FeedContent content={content}/>
        </FeedEvent>
    )
}

Comment.propTypes = {
    content: propTypes.string,
    status: propTypes.string
}

export default Comment