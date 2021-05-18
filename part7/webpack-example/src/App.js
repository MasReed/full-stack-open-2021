import React, { useState } from 'react'
import './index.css'

const App = () => {
  const [counter, setCounter] = useState(0)
  const [values, setValues] = useState([])

  const handleClick = () => {
    setCounter(counter + 1)
    setValues(values.concat(counter))
  }

  return (
    <div className='container'>
      Hello Webpack
      <p>{counter} clicks</p>
      <button onClick={ handleClick }>Press</button>
    </div>
  )
}

export default App