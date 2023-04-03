import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { initialState } from './context/initialState'
import { reducer } from './context/reducer'
import { BlogProvider } from './context/store'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BlogProvider state={initialState} reducer={reducer}>
    <App />
  </BlogProvider>
)
