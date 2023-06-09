import { dbContext } from "../db/DbContext.js"


class GroupsService {
    async getOne(groupId) {
        const group = await dbContext.Groups.findById(groupId).populate("creator", "name picture")
        return group
    }
    async getGroups() {
        const groups = await dbContext.Groups.find().populate("creator", "name picture")
        return groups
    }
    async createGroup(gData) {
        const group = await dbContext.Groups.create(gData)
        await group.populate("creator", "name picture")
        return group
    }

}

export const groupsService = new GroupsService()