import React from 'react'
import './App.css'
import { BrowserRouter as Router,Routes, Route, Navigate } from 'react-router-dom'
import { Contact, Home, UploadBlog } from './pages'
import { BlogPost, NavBar } from './components'
import { useBlog } from './context/store'
const App = () => {
  const [{user,mode}]=useBlog()
  const Protectroutes=({children})=>{
    if(user){
      return children
    }
    else{
      return <Navigate to={'/'}/>
    }
  }
  return (
    <>
    <div className="app" style={mode}>
     <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog' element={<BlogPost/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/uploadBlog' element={
        <Protectroutes><UploadBlog/></Protectroutes>
        }/>
      </Routes>
     </Router>
     </div>
    </>
  )
}

export default App
