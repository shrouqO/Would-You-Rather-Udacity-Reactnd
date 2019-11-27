import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser, logoutUser } from '../actions/authedUser'

class Login extends Component {
  state = {
    username: null,
    toHome: false
  }

  handleSelectionChange = (e) =>{
    const username = e.target.value

    this.setState((previousState)=> {
      return {
        ...previousState,
        username
      }
    })
  }

  handleLogin = (e)=> {
    const { username } = this.state;
    const { dispatch } = this.props;

    dispatch(setAuthedUser(username));

    this.setState((previousState)=> {
      return {
        ...previousState,
        toHome: true
      }
    })
  }

  componentDidMount() {
    this.props.dispatch(logoutUser())
  }

  render() {
    const { username, toHome } = this.state
    const { history, users } = this.props
    const selected = username ? username : -1
    const avatar = username ? users[username].avatarURL : 'placeholder.jpg'


    if(toHome) {
      const redirect = history.location.state;
      if (redirect != null) {
        return <Redirect to={redirect} push={true} />
      }
      return <Redirect to='/' />
    }

    return (
      <div>
        <h3>Welcome To Would You Rather</h3>
        <div className='login-box'>
          <h5>Please select a user to start Playing</h5>
          <div>
           <img 
            src={avatar}
            alt={`Avatar of ${username}`}
            style={{height: 130}}
            className='img-thumbnail'
            />
            <select className="form-control" value={selected} onChange={(e) => this.handleSelectionChange(e)}>
              <option
               value={-1} disabled>
                Select user...
              </option>
              {Object.keys(users).map((key)=> {
                return (
                <option 
                  value={users[key].id} key={key}>{users[key].id}
                </option>
                )
              })}
            </select>
          </div>
          <button
            className='btn btn-primary btn-lg active'
            disabled={username === null}
            onClick={(e) => this.handleLogin(e)}
          >
            Play
          </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users
  }
}

export default withRouter(connect(mapStateToProps)(Login))