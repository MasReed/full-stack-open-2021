import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

/*
Component which shows or hides its contents by clicking open or close buttons,
uses useRef in main App.js
*/

const Togglable = React.forwardRef((props, ref) => {

  const [visible, setVisible] = useState(false)

  const hideWhenChildVisible = { display: visible ? 'none' : '' }
  const showWhenChildVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenChildVisible}>
        <button onClick={ toggleVisibility }>{props.buttonLabelToOpen}</button>
      </div>

      <div style={showWhenChildVisible}>
        {props.children}
        <button onClick={ toggleVisibility }>{props.buttonLabelToClose}</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabelToOpen: PropTypes.string.isRequired,
  buttonLabelToClose: PropTypes.string.isRequired
}

export default Togglable
