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

class Agent {

    sendEventToPostService(event) {
        return postClient.post("/events", event);
    }

    sendEventToCommentsService(event) {
        return commentsClient.post("/events", event);
    }

    sendEventToQueryService(event) {
        return queryClient.post("/events", event);
    }
}

export { Agent }