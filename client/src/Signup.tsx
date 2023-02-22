import React , {useState} from 'react'
import axios from 'axios'

function Signup() {

    const [emailAddress , setEmailAddress] = useState<String>("")
    const [password , setPassword] = useState<String>("")

    const register = () => {
        axios.post("http://localhost:8000/auth/signup", {
            emailAddress,
            password
        })
        .then( res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }


  return (
    <div>
        <form>

        <div>
            <label>Email Address:</label>
            <input type="text" name="emailAddress" onChange={(e) => setEmailAddress(e.target.value)}/>
        </div>

        <div>
            <label>Password:</label>
            <input type="text" name="password" onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <button onClick={register}>Register</button>

        </form>
    </div>
  )
}

export default Signup