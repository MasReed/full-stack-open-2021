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
                <button onClick={ toggleVisibility }>{props.buttonLabelToOpen}</button>
            </div>

            <div style={showWhenChildVisible}>
                {props.children}
                <button onClick={ toggleVisibility }>{props.buttonLabelToClose}</button>
            </div>
        </div>
    )
})

export default Togglable
