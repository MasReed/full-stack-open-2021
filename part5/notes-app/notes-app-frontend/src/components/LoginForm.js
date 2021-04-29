import React from 'react'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password

    }) => {

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} style={{margin: '20px 0px'}}>
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
