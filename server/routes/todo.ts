import express from 'express'
import * as todoCntrl from '../controller/todo';

const router = express.Router()

router.get('/' , todoCntrl.todo_get)
 router.post('/' , todoCntrl.todo_post)
 router.put('/' , todoCntrl.todo_edit)
router.delete('/' , todoCntrl.todo_delete)

export default router
