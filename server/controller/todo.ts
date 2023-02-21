import express from 'express'
import {Todo} from '../models/Todo'

export function todo_get(req: express.Request ,res: express.Response){
    Todo.find()
    .then(todo => {
        res.json({todo})
    })
    .catch(err => {
        console.log(err)
    })
}

export function todo_post(req: express.Request , res: express.Response){
    let todo = new Todo(req.body)
    console.log(req.body)

    todo.save()
    .then(todos => {
        res.json({todos})
    })
    .catch(err => {
        console.log(err)
    })
}

export function todo_edit(req: express.Request , res: express.Response){
    Todo.findByIdAndUpdate(req.body._id , req.body)
    .then(todo => {
        res.json({todo})
    })
    .catch(err => {
        console.log(err)
    })
}

export function todo_delete(req: express.Request , res: express.Response){
    Todo.findByIdAndDelete(req.query._id)
    .then(todo => {
        res.json({todo})
    })
    .catch(err => {
        console.log(err)
    })
}