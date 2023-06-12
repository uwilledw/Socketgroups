import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { chatsService } from "../services/ChatsService.js";
import { socketProvider } from "../SocketProvider";


export class ChatsController extends BaseController {
    constructor() {
        super('api/chats')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post("", this.createChat)
    }

    async createChat(req, res, next) {
        try {
            let chatData = req.body
            chatData.creatorId = req.userInfo.id
            let chat = await chatsService.createChat(chatData)
            socketProvider.messageRoom(chat.groupId.toString(), "s:created:chat", chat)
            res.send(chat)
        } catch (error) {
            next(error)
        }
    }
}