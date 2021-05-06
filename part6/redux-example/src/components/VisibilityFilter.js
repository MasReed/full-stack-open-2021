import React from 'react'
import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  return (
    <div style={{margin: '5px 0', padding:'10px'}}>
      <div style={{display: 'inline', margin: '0 5px'}}>
        <label>all</label>
        <input type='radio' name='filter' onChange={() => dispatch(filterChange('ALL'))} />
      </div>
      <div style={{display: 'inline', margin: '2px 5px'}}>
        <label>important</label>
        <input type='radio' name='filter' onChange={() => dispatch(filterChange('IMPORTANT'))} />
      </div>
      <div style={{display: 'inline', margin: '2px 5px'}}>
        <label>unimportant</label>
        <input type='radio' name='filter' onChange={() => dispatch(filterChange('UNIMPORTANT'))} />
      </div>
    </div>
  )
}

export default VisibilityFilter
