import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

function Nav(props) {
  const { authedUser, users } = props

  const avatar = authedUser ? users[authedUser].avatarURL : 'placeholder.jpg'
  const loading = authedUser !== null

  return (
    <nav className='navbar navbar-dark bg-primary'>
      <ul className='list-unstyled'>
        <li className='list-inline-item'>
          <NavLink style={{textDecoration: 'none', color: 'white'}} to='/' >
            Home
          </NavLink>
        </li>
        <li className='list-inline-item'>
          <NavLink style={{textDecoration: 'none', color: 'white'}}to='/add'>
            New Poll
          </NavLink>
        </li>
        <li className='list-inline-item'>
          <NavLink style={{textDecoration: 'none', color: 'white'}} to='/leaderboard'>
            Leaderboard
          </NavLink>
        </li>
        {
          loading
          ? <li>
              <NavLink style={{textDecoration: 'none', color: 'white'}} to='/login' >
              <div>
                Logout
                <img style={{height:30}} className='img-thumbnail'
                   src={avatar}
                   alt={`Avatar of ${authedUser}`}
                />
                {authedUser}
              </div>
              </NavLink>
            </li>
          : <li className='list-inline-item'>
              <NavLink style={{textDecoration: 'none', color: 'white'}}to='/login' exact>
                Login
              </NavLink>
            </li>
        }
      </ul>
    </nav>
  );
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps, null, null, { pure: false })(Nav)