import { AppState } from "../AppState.js"
import { Group } from "../models/Group.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class GroupsService {

    async getGroups() {
        const res = await api.get('api/groups')
        logger.log(res.data, "groups")
        AppState.groups = res.data.map(g => new Group(g))
        logger.log(AppState.groups)
    }

}

export const groupsService = new GroupsService()