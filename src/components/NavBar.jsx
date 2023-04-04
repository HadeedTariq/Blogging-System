import {  useNavigate } from 'react-router-dom'
import '../css/NavBar.css'
import { useBlog } from '../context/store'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider } from '../firebase'
import { blogState } from '../context/reducer'
import { RxMoon, RxSun,RxHamburgerMenu,RxCrossCircled } from 'react-icons/rx'
import { useState } from 'react'
const NavBar = () => {
  const navigate=useNavigate()
  const [light,setLight]=useState(false)
  const [{ user,mode }, dispatch] = useBlog()
  const login = async () => {
    const { user } = await signInWithPopup(auth, provider)
    localStorage.setItem('user-info',JSON.stringify(user))
    dispatch({ type: blogState.SETUSER, user: user })
  }
  const navigator=(link)=>{
    navigate(link)
  }
  const logOut=async()=>{
    await signOut(auth)
    localStorage.removeItem('user-info')
    dispatch({ type: blogState.SETUSER, user: null })
    navigate('/')
  }
  const changeMode=(bg,color)=>{
    dispatch({type:blogState.SETMODE,mode:{backgroundColor:bg,color:color}})
    setLight(!light)
  }
  return (
    <>
      <div className="nav-bar">
        <nav className="nav">
          <h1>Next Bloggers</h1>
          <ul>
            <li onClick={()=>navigator('/')}>Home</li>
            <li onClick={()=>navigator('/blog')}>Blogs</li>
            { !light?
            (<li onClick={()=>changeMode('#1c1b23',"white")}><RxSun size={19} cursor={'pointer'}/></li>):
            (<li onClick={()=>changeMode("white",'black')}><RxMoon size={19} cursor={'pointer'}/></li>)
}
          </ul>
          {!user ?
            <button onClick={login}>Sign In</button> : (
              <div className="login-data">
                <button onClick={()=>navigator('/uploadBlog')}>Upload Blog</button>
                <button className='sign-out' onClick={logOut}>Sign Out</button>
                <img src={user.photoURL} alt="" />
              </div>
            )
          }
        </nav>
      </div>
    </>
  )
}

export default NavBar