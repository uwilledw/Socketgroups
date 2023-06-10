import { dbContext } from "../db/DbContext.js"


class ChatsService {
    async getChats(groupId) {
        const chats = await dbContext.Chats.find({ groupId }).populate("creator", "name picture")
        return chats
    }
    async createChat(chatData) {
        const chat = await dbContext.Chats.create(chatData)
        await chat.populate("creator", "name picture")
        return chat
    }


}

export const chatsService = new ChatsService()