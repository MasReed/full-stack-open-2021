import React from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'

const App = () => {
  return (
    <div>
      <h1>Hello from App</h1>
      <NewNote />
      <Notes />
    </div>
  )
}

export default App
