import React from 'react'
import { useDispatch } from 'react-redux'
import { filterCreator } from '../reducers/filterReducer'


const Filter = () => {

  const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const filter = event.target.value

    dispatch(filterCreator(filter))
  }

  const style = {
    marginBottom: '10px'
  }

  return (
    <div style={style}>
      <strong>Filter: </strong>
      <input onChange={handleChange} />
    </div>
  )
}

export default Filter
