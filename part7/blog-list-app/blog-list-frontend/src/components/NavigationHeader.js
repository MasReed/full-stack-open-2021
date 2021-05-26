import React from 'react'
import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import LogoutButton from './LogoutButton'


const NavigationHeader = () => {

  const currentUser = useSelector(state => state.user)
  return (
    <React.Fragment>
      <Navbar bg='primary' variant='light' expand='lg'>
        <Navbar.Brand href='home'>BlogLister</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='blogs'>Blogs</Nav.Link>
            <Nav.Link href='users'>Users</Nav.Link>
          </Nav>

          <Nav>
            {currentUser
              ? <Navbar.Text>
                Signed in as: <a href={'users/' + currentUser.id}>{currentUser.username}</a>
                <LogoutButton />
              </Navbar.Text>
              : null
            }
          </Nav>

        </Navbar.Collapse>
      </Navbar>

    </React.Fragment>
  )
}

export default NavigationHeader

//
// <div name='NavigationHeader' className='NavigationHeader'>
//
//   <div style={{ backgroundColor: 'lightblue', padding: '8px' }}>
//     <Link to='/' style={{ margin: '3px' }}><strong>Home</strong></Link>
//     <Link to='/blogs' style={{ margin: '3px' }}><strong>Blogs</strong></Link>
//     <Link to='/users' style={{ margin: '3px' }}><strong>Users</strong></Link>
//     {currentUser
//       ? <div style={{ display: 'inline', padding: '5px 10px' }}>
//         <p style={{ display: 'inline', padding: '1px', margin: '0' }}>{currentUser.username} is logged in.</p>
//         <LogoutButton />
//       </div>
//       : null }
//   </div>
//
//   <hr />
// </div>
