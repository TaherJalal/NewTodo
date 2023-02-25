import express from 'express'
import * as todoCntrl from '../controller/todo';

const router = express.Router()


router.get('/' , todoCntrl.onlyUserGet)
 router.post('/' , todoCntrl.todo_post)
 router.put('/' , todoCntrl.todo_edit)
 router.put('/' , todoCntrl.todo_edit_description)
router.delete('/' , todoCntrl.todo_delete)

export default router
