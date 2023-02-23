import React, {useEffect, useState} from 'react'
import { BrowserRouter as Router , Routes , Route, Link } from 'react-router-dom'
import Signin from './Signin'
import Signup from './Signup'
import Todo from './Todo'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

function App() {

  const [emailAddress , setEmailAddress] = useState<string>("")
  const [password , setPassword] = useState<string>("")
  const [authorizationToken , setAuthorizationToken] = useState<string | undefined>()
  const [authorized , setAuthorized] = useState<Boolean>(false)
  const [user , setUser] = useState<any>({})
  const [test , setTest] = useState<any>("")
  const [userEmail  ,setUserEmail] = useState<any>()

  const signin = (e:any) => {
      e.preventDefault()

      
      axios.post("http://localhost:8000/auth/signin " , {
          email:emailAddress,
          password
      })
      .then(res => {

          const token = res.data.token 
          
          if(token != null){
          
              setTest(token)

          localStorage.setItem("token" , token)
          console.log(token)
          setUser(token)
          setAuthorizationToken(token)
          setAuthorized(true)

          // window.location.href = "/"
      }
      })
      .catch(err => {
          console.log(err)
      })
  }

  const logout = () => {
    localStorage.removeItem('token')
  }

  useEffect(() => {
      const token = localStorage.getItem('token')
      if(!token) return
      setAuthorizationToken(token)
      console.log(jwt_decode(token))
      let test = jwt_decode(token)
      console.log(test)
      setUser(test)
      console.log(user._id)
          
  },[])


  return (
   <div>  
    <Router>

      <div className='nav'>
      <Link to={'/todo'}>Todo's</Link>
      <Link to={'/signup'}>Sign Up</Link>
      <Link to={'/logout'} onClick={logout}>Logout</Link>

      </div>

      <Routes>

        <Route path='/signup' element={<Signup />}/>
        <Route path='/todo' element={<Todo userId={user._id}/>}/>


      </Routes>


    </Router>

    <div>
        <div className='signin'>
            <form onSubmit={signin}>
                <div>
                <label>Email Address:</label>
                <input type="text" name="emailAddress" value={emailAddress
                } onChange={(e) => setEmailAddress(e.target.value)}/>
                </div>

                <div>
                <label>Password:</label>
                <input type="password" name="password" value={password} 
                onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type="submit">Sign in</button>    

            </form>
        </div>
    </div>

   </div>
  )
}

export default App