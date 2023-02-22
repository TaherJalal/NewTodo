import React , {useState} from 'react'
import axios from 'axios'

function Signin() {

    const [emailAddress , setEmailAddress] = useState<String>("")
    const [password , setPassword] = useState<String>("")

    const register = () => {
        axios.post("http://localhost:8000/auth/signup " , {
            emailAddress,
            password
        })
    }

  return (
    <div>
        <div className='signin'>
            <form>
                <div>
                <label>Email Address:</label>
                <input type="text" name="emailAddress" onChange={(e) => setEmailAddress(e.target.value)}/>
                </div>

                <div>
                <label>Password:</label>
                <input type="password" name="emailAddress" onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type="submit" onClick={register}>Register</button>

            </form>
        </div>
    </div>
  )
}

export default Signin