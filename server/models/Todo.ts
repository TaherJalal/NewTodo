import mongoose from "mongoose";

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
    priority:{
        type: String,
        required: true,
        default: "low"
    },
    archived: {
        type: Boolean,
        default: false
    }
})

export const Todo = mongoose.model('Todo' , todoSchema)