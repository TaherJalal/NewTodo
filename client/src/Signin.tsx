import React , {useEffect, useState} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

function Signin() {

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

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) return
        setAuthorizationToken(token)
        console.log(jwt_decode(token))
        setUser(jwt_decode(token))
        setUserEmail(user.emailAddress)
            
    },[])


  return (
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
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>

                <button type="submit">Sign in</button>

            </form>
        </div>
    </div>
  )
}

export default Signin