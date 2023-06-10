import { Schema } from "mongoose";

export const ChatSchema = new Schema({
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
    groupId: { type: Schema.Types.ObjectId, required: true, ref: "Group" },
    body: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

ChatSchema.virtual("creator", {
    localField: "creatorId",
    foreignField: "_id",
    justOne: true,
    ref: "Account"
})