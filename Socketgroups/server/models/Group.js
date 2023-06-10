import mongoose from "mongoose";
const Schema = mongoose.Schema

export const GroupSchema = new Schema(
    {
        title: { type: String, required: true },
        image: { type: String, required: true },
        creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

GroupSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: "_id",
    justOne: true,
    ref: 'Account'
})