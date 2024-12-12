import {useState} from "react";
import { signIn, signInWithGoogle, logIn, logOut } from "../config/firebase-config";


function Auth() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")




  return (
    <>
      <input 
        placeholder="email"
        onChange={(e)=>setEmail(e.target.value)}
      />
      <input 
        placeholder="password" 
        onChange={(e)=>setPassword(e.target.value)}  
      />
      <button onClick={()=>signIn(email, password)}>Sign in</button>
      <button onClick={signInWithGoogle}>Sign in with google</button>
      <button onClick={()=>logIn(email, password)}>Log in</button>
      <button onClick={logOut}>Log out</button>

    </>
  )
}

export default Auth
