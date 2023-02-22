import React , {useState} from 'react'
import axios from 'axios'

function Signin() {

    const [emailAddress , setEmailAddress] = useState<String>("")
    const [password , setPassword] = useState<String>("")
    const [authorizationToken , setAuthorizationToken] = useState<String>("")

    const signin = () => {
        axios.post("http://localhost:8000/auth/signin " , {
            emailAddress,
            password
        })
        .then(res => {
            const token = res.data.token 

            localStorage.setItem("token" , token)

            setAuthorizationToken(token)

            // window.location.href = "/"
        })
        .catch(err => {
            console.log(err)
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

                <button type="submit" onClick={signin}>Sign in</button>

            </form>
        </div>
    </div>
  )
}

export default Signin