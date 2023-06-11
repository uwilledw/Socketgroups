import { Profile } from "./Account.js"

export class Chat {
    constructor(data) {
        this.body = data.body
        this.creator = new Profile(data.creator)
        this.creatorId = data.creatorId
        this.groupId = data.groupId
        this.id = data.id
        this.createdAt = new Date(data.createdAt)
    }
}