import mongoose from "mongoose";
import { string } from "zod";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

const tagSchema = new Schema({
    title: {type: String, required: true, unique: true}
})

const contentType = ['image', 'video', 'article', 'audio'];

const contentSchema = new Schema({
    link: { type: String, required: true},
    type: {type: String, enum: contentType, required: true},
    title: {type: String, required: true},
    tags: [{type: ObjectId, ref: 'Tag'}],
    userId: {type: ObjectId, ref: 'User', required: true}
})

const linkSchema = new Schema({
    hash: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
})

const userModel = mongoose.model("User", userSchema);
const tagModel = mongoose.model("Tag", tagSchema);
const contentModel = mongoose.model("Content", contentSchema);
const linkModel = mongoose.model("Link", linkSchema);

export {
    userModel,
    tagModel, 
    contentModel, 
    linkModel
}