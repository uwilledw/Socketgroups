import { Auth0Provider } from "@bcwdev/auth0provider";
import { groupsService } from "../services/GroupsService.js";
import BaseController from "../utils/BaseController.js";


export class GroupsController extends BaseController {
    constructor() {
        super('api/groups')
        this.router
            .get("", this.GetGroups)
            .get("/:id", this.GetOne)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post("", this.CreateGroup)
    }
    async GetOne(req, res, next) {
        try {
            let groupId = req.params.id
            let group = await groupsService.GetOne(groupId)
            res.send(group)
        } catch (error) {
            next(error)
        }
    }
    async GetGroups(req, res, next) {
        try {
            let groups = await groupsService.GetGroups()
            res.send(groups)
        } catch (error) {
            next(error)
        }
    }
    async CreateGroup(req, res, next) {
        try {
            let gData = req.body
            let userId = req.userInfo.id
            gData.creatorId = userId
            let group = await groupsService.CreateGroup(gData)
            res.send(group)
        } catch (error) {
            next(error)
        }
    }
}