import mongoose, { Schema } from "mongoose";
import {User} from '../models/User'

const todoSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true
    },
    description:{
        type: String
    },
    status:{
        type: Boolean,
        default: false
    },
    archived: {
        type: Boolean,
        default: false
    },
    createdBy : {
        type: Schema.Types.ObjectId,
        ref :"User",
        required: true
    },
    deadline:{
        type: Date,
         required: true
    }
} , {timestamps: true})

export const Todo = mongoose.model('Todo' , todoSchema)