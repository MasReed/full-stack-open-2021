import React, { useState } from 'react'

const LoginForm = ({ handleSubmit }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const makeUser = (event) => {
        event.preventDefault()
        handleSubmit({
            username: username,
            password: password
        })
    }

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={makeUser} style={{margin: '20px 0px'}}>
                <div>
                    <label>username</label>
                    <input
                        type='text'
                        value={username}
                        name='username'
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    <label>password</label>
                    <input
                        type='password'
                        value={password}
                        name='password'
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
            </div>
    )
}

export default LoginForm



// const handleLogin = async (event) => {
//     event.preventDefault()
//
//     try {
//         const user = await loginService.login({
//             username, password,
//         })
//
//         window.localStorage.setItem(
//             'loggedNoteappUser', JSON.stringify(user)
//         )
//
//         noteService.setToken(user.token)
//         setUser(user)
//         setUsername('')
//         setPassword('')
//     } catch (exception) {
//         setErrorMsg('Invalid credentials')
//         setTimeout( () => {
//             setErrorMsg(null)
//         }, 5000)
//     }
//     console.log('logging in with', username, password)
// }
