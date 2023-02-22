import React , {useState} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

function Signin() {

    const [emailAddress , setEmailAddress] = useState<String>("")
    const [password , setPassword] = useState<String>("")
    const [authorizationToken , setAuthorizationToken] = useState<String>("")
    const [authorized , setAuthorized] = useState<Boolean>(false)
    const [user , setUser] = useState<any>({})
    const [test , setTest] = useState<any>("")

    const signin = () => {
        axios.post("http://localhost:8000/auth/signin " , {
            emailAddress,
            password
        })
        .then(res => {

            const token = res.data.token 
            
            if(token != null){
            
                setTest(token)

            localStorage.setItem("token" , token)
            console.log(token)
            setUser(jwt_decode(token))
            setAuthorizationToken(token)
            setAuthorized(true)

            // window.location.href = "/"
        }
        })
        .catch(err => {
            console.log(err)
        })
    }

    console.log(test)
    console.log(authorizationToken)
    console.log(jwt_decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2Y2M2NhMjk4Yzk5ZWNmMWM4ZGQ0Y2QiLCJlbWFpbEFkZHJlc3MiOiJ0YWhlckBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ2YTJyL1V6ZlY4SEFzeVZTMDg4YVVlUXRFUllKV2tzOWRYT2F4U1BUMGY1UUwwWjJESUx5UyIsIl9fdiI6MCwiaWF0IjoxNjc3MDg1NzI5LCJleHAiOjE2Nzc2OTA1Mjl9.69evxI6cZdDdmKY9Bf4sawg4Hq7532EgBIn8ln45Xcg'))
    console.log("user is ?" + JSON.stringify(user))

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