import React, { useEffect, useState } from 'react'
import { NavLink, useLocation} from 'react-router-dom'
import { Container, Dropdown } from 'react-bootstrap'
import Sidebar from './Sidebar'
import { useStateContext } from '../config/context'
import Cart from './Cart'

export default function Navbar() {
  const [showLogo, setShowLogo] = useState(false)
  const { currentUser, logout } = useStateContext()
  const location = useLocation()

  const showNav = () => {
    window.scrollY >= 100 ? setShowLogo(true) : setShowLogo(false)
  }
  useEffect(() => {
    showNav()
    window.addEventListener('scroll', showNav)
    return () => {
      window.removeEventListener('scroll', showNav)
    }
  }, [])

  return (
    <div
      className='position-fixed top-0 py-3 px-2 w-100'
      style={{
        zIndex: 5,
        background: location.pathname === '*' ? 'inherit' : 'white',
      }}
    >
      <Container>
        <div
          className={
            showLogo
              ? 'd-flex justify-content-between align-items-center'
              : 'd-flex justify-content-end align-items-center'
          }
        >
          <NavLink to='/' className={showLogo ? 'd-flex' : 'd-none'}>
            <h1 className='fw-bold heading'>Footshop</h1>
          </NavLink>

          <div className='d-flex gap-2 gap-lg-4'>
            <Cart />
            <Sidebar />
            {currentUser && (
              <Dropdown className='d-none d-lg-block'>
                <Dropdown.Toggle
                  variant='dark'
                  id='dropdown-basic'
                  className='text-capitalize'
                >
                  {currentUser?.name}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <NavLink to='customer/profile'>
                      <p className='mb-0'>Account</p>
                    </NavLink>
                  </Dropdown.Item>
                  {currentUser.token && currentUser?.isAdmin === true && (
                    <Dropdown.Item>
                      <NavLink to='customer/admin/orders'>
                        <p className='mb-0'>Admin</p>
                      </NavLink>
                    </Dropdown.Item>
                  )}
                  <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
}
