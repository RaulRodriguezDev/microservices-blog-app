import axios from "axios";

const postClient = axios.create({
    baseURL: "http://localhost:4000",
})

const commentsClient = axios.create({
    baseURL: "http://localhost:4001",
})

const queryClient = axios.create({
    baseURL: "http://localhost:4002",
})

const moderationClient = axios.create({
    baseURL: 'http://localhost:4003'
})

class Agent {
    response = {
        postService:{},
        commentsService: {},
        queryService: {},
        moderationService: {}
    }

    setResponse(res, type){
        return {
            status: res.status,
            data: res.data,
            statusText: res.statusText,
            eventType: type
        }
    }
    async sendEventToPostService(event) {

        try {
            this.response.postService = this.setResponse(await postClient.post("/events", event), event.type)
        } catch (error) {
            this.response.postService = error.toJSON()
        }
    }

    async sendEventToCommentsService(event) {

        try {
            this.response.commentsService = this.setResponse(await commentsClient.post("/events", event), event.type)
        } catch (error) {
            this.response.commentsService = error.toJSON()
        }
    }

    async sendEventToQueryService(event) {
        try {
            this.response.queryService = this.setResponse(await queryClient.post('/events',event), event.type)
        } catch (error) {
            this.response.queryService = error.toJSON()
        }
    }

    async sendEventToModerationService(event){
        try{
            this.response.moderationService = this.setResponse(await moderationClient.post('/events',event))
        } catch (error) {
            this.response.moderationService = error.toJSON()
        }
        
    }
}

export { Agent }