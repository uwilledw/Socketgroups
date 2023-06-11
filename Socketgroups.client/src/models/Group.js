import { Profile } from "./Account.js"

export class Group {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.image = data.image
        this.creator = new Profile(data.creator)
        this.creatorId = data.creatorId
    }
}