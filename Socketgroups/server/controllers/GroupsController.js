import { Auth0Provider } from "@bcwdev/auth0provider";
import { groupsService } from "../services/GroupsService.js";
import BaseController from "../utils/BaseController.js";
import { chatsService } from "../services/ChatsService.js";


export class GroupsController extends BaseController {
    constructor() {
        super('api/groups')
        this.router
            .get("", this.getGroups)
            .get("/:id", this.getOne)
            .get("/:id/chats", this.getChats)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post("", this.createGroup)
    }
    async getChats(req, res, next) {
        try {
            let groupId = req.params.id
            let chats = await chatsService.getChats(groupId)
            res.send(chats)
        } catch (error) {
            next(error)

        }
    }
    async getOne(req, res, next) {
        try {
            let groupId = req.params.id
            let group = await groupsService.getOne(groupId)
            res.send(group)
        } catch (error) {
            next(error)
        }
    }
    async getGroups(req, res, next) {
        try {
            let groups = await groupsService.getGroups()
            res.send(groups)
        } catch (error) {
            next(error)
        }
    }
    async createGroup(req, res, next) {
        try {
            let gData = req.body
            let userId = req.userInfo.id
            gData.creatorId = userId
            let group = await groupsService.createGroup(gData)
            res.send(group)
        } catch (error) {
            next(error)
        }
    }
}