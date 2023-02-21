import React, {useEffect, useState} from 'react'
import axios from 'axios'

function App() {

  const [todo , setTodo] = useState<any>([])
  const [todoId , setTodoId] = useState<any>("")

  const [task , setTask] = useState('')
  const [description , setDescription] = useState('')
  const [status , setStatus] = useState('')
  const [priority , setPriority] = useState('')
  const [archive , setArchive] = useState<any>(false)

  const [test , setTest] = useState<any>("")

  useEffect(() => {
    getData()
    console.log(todoId)
  },[])

  const getData = () => {
    axios.get("http://localhost:8000/todo")
    .then(res => {
      console.log(res)
      setTodo(res.data.todo)
      console.log(todo)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const postData = () => {
    axios.post('http://localhost:8000/todo' , {
      task,
      description,
      priority,
      archive
    })
  }

  const archived = () => {
    let url = `http://localhost:8000/todo?_id=${todoId}`
    console.log(url)
    axios.put(url, {
      archive: "true"
    })
  }

  const finishedTask = () => {
    let url = `http://localhost:8000/todo?_id=${todoId}`
    console.log(url)
    axios.put(url,{
    status: true
    })
    .then((res) => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
      <h1>Todo App</h1>

      <div>
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
            <label>Priority</label>
            <input type="text" name='priority' onChange={(e) => setPriority(e.target.value)}/>
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
              <h3>Priority:</h3>
              <p>{data.priority}</p>
          </div> 

              {/* {setTodoId(data._id)} */}
          <input type="hidden" name="_id" value={data._id} />
          <button onClick={() => archived()}>Archive</button>
          <button onClick={() => finishedTask()}>Done</button>
          
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
              <h3>Priority:</h3>
              <p>{data.priority}</p>
          </div> 

            {/* {setTodoId(data._id)} */}
          <input type="hidden" name="_id" id="" value={data._id}/>

          <button onClick={() => archived()}>Archive</button>
          <button onClick={() => finishedTask()}>Done</button>
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

export default App