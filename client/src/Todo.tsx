import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Signin from './Signin'
import Signup from './Signup'

function Todo(props:any) {

    const [todo , setTodo] = useState<any>([])
  const [task , setTask] = useState('')
  const [description , setDescription] = useState<any>('')
  const [archive , setArchive] = useState<any>(false)
  const [classname , setClass] = useState<any>("")
  const [deadline , setDeadline] = useState<any>()
  const [userId , setUserId] = useState<any>("")
  const [showEditFrom , setShowEditForm] = useState<any>(false)
  const [newDes , setNewDesc] = useState<any>()
  
  

  useEffect(() => {
   getData()
   console.log(todo)
   console.log(props.userId)
   setUserId(props.userId)
  },[props.userId])

  const getData = () => {
    axios.get(`http://localhost:8000/todo?_id=${props.userId}`)
    .then(res => {
        console.log(props.userId)
        console.log(res.data)
        console.log(res.data.data)

      setTodo(res.data.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const postData = () => {
    axios.post('http://localhost:8000/todo' , {
      createdBy: userId,
      task,
      description,
      archive,
      deadline
    })
  }

  const archived = (todoId:String) => {
    axios.put(`http://localhost:8000/todo?_id=${todoId}`,{
      archived: true
      })
      .then((res) => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const unarchived = (todoId:String) => {
    axios.put(`http://localhost:8000/todo?_id=${todoId}`,{
      archived: false
      })
      .then((res) => {
        showEditFrom(false)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const finishedTask = (todoId:String) => {
    axios.put(`http://localhost:8000/todo?_id=${todoId}`,{
      status: true
      })
      .then((res) => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const unfinishedTask = (todoId:String) => {
    axios.put(`http://localhost:8000/todo?_id=${todoId}`,{
      status: false
      })
      .then((res) => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }


  const deleteTodo = (todoId:String) => {
      axios.delete(`http://localhost:8000/todo?_id=${todoId}`)
      .then((res) => {
        console.log(`http://localhost:8000/todo?_id=${todoId}`)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }


  const edit = (todoId:string) => {
    axios.put('http://localhost:8000/todo?_id=${todoId}' , {
        description: newDes
    })
    .then((res) => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })
  }

  const showForm = () => {
    setShowEditForm(true)
  }

  return (
    <div>
    <h1>Todo App</h1>

    <div className='add'>
      <h3>Add Task</h3>
      <form action="">

        <div>
          <label>Task</label>
          <input type="text" name="task" onChange={(e) => setTask(e.target.value)}/>
        </div>

        <div>
          <label>Description</label>
          <input type="text" name="description" onChange={(e) => setDescription(e.target.value)}/>
        </div>

        
        <div>
          <label>Deadline:</label>
          <input type="datetime-local" name="deadline" onChange={(e) => setDeadline(e.target.value)}/>
        </div>




        <button onClick={() => postData()}>Add Task</button>

      </form>
    </div>

    <div>
      <h2>Tasks</h2>
      {todo.map((data:any) => (
        <>


        {data.status === false ? (

        <form>
        <div className='todo'>
        <div>

       
          <h3>Task:</h3>
          <p>{data.task}</p>
        </div>

        <div>
            <h3>Description:</h3>
            <p>{data.description}</p>
        </div>

        <div>
            <h3>Status:</h3>
            <p>{data.status.toString()}</p>
        </div>


        <div>
            <h3>Deadline:</h3>
            <p>{data.deadline}</p>
        </div>

           
        <input type="hidden" name="_id" value={data._id} />
        <button onClick={() => archived(data._id)}>Archive</button>
        <button onClick={() => finishedTask(data._id)}>Done</button>
        <button onClick={() => deleteTodo(data._id)}>Delete</button>
        <button type="button" onClick={showForm}>Edit Description</button>

        {showEditFrom == true ? (
            <form action="">
                <div>
                    <label>Description:</label>
                    <input type="text" defaultValue={data.description} onChange={(e) => setNewDesc(e.target.value)}/>
                </div>
                <button onClick={() => edit(data._id)}>Send</button>
            </form>
        ):
        (
            <h1></h1>
        )}


        
        </div>
        </form>
          )
          
        : (
          <>
          <h2>Done Tasks</h2>
          <div className='done'>

          <div>
          <h3>Task:</h3>
          <p>{data.task}</p>
        </div>

        <div>
            <h3>Description:</h3>
            <p>{data.description}</p>
        </div>

        <div>
            <h3>Status:</h3>
            <p>{data.status.toString()}</p>
        </div>

        <div>
            <h3>Deadline:</h3>
            <p>{data.deadline}</p>
        </div>

         
        <input type="hidden" name="_id" id="" value={data._id}/>

        <button onClick={() => unarchived(data._id)}>UnArchive</button>
        <button onClick={() => unfinishedTask(data._id)}>UnDone</button>
        <button onClick={() => deleteTodo(data._id)}>Delete</button>

          </div>

          
          </>
        )
        }
          </>

      ))

      }
    </div>


  </div>
  )
}

export default Todo