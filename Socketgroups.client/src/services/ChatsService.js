import { AppState } from "../AppState.js"
import { Chat } from "../models/Chat.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class ChatsService {

    async GetChats(groupId) {
        const res = await api.get(`api/groups/${groupId}/chats`)
        logger.log(res.data)
        AppState.chats = res.data.map(c => new Chat(c))
        logger.log(AppState.chats, 'appstate chats')
    }

    async createChat(cData) {
        const res = await api.post('api/chats', cData)
        logger.log(res.data)
    }
}

export const chatsService = new ChatsService()