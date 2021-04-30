import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false)

    const hideWhenChildVisible = {display: visible ? 'none' : ''}
    const showWhenChildVisible = {display: visible ? '' : 'none'}

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
                <button onClick={ toggleVisibility }>{props.buttonLabel}</button>
            </div>

            <div style={showWhenChildVisible}>
                {props.children}
                <button onClick={ toggleVisibility }>Cancel</button>
            </div>
        </div>
    )
})

export default Togglable
