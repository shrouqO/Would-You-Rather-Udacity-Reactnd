import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    optionOne: '',
    optionTwo: '',
    toHome: false
  }

  handleSelectChange =(e, option)=> {
    const value = e.target.value

    this.setState({
    [option === 1 ? 'optionOne' : 'optionTwo']: value
  })
 }

  handleFormSubmit = (e)=> {
    e.preventDefault();

    const { optionOne, optionTwo } = this.state
    const { dispatch } = this.props
    dispatch(handleAddQuestion(optionOne, optionTwo))

    this.setState((previousState)=> {
      return {
        ...previousState,
        toHome: true
      }
    })
  }

  render() {
    const { optionOne, optionTwo, toHome } = this.state
    const { authedUser, users } = this.props
    
    if (toHome === true) {
      return <Redirect to='/' />
    }

    return (
      <div>
        <div>
          <img style={{height: 70}} className='img-thumbnail'
            src={`/${users[authedUser].avatarURL}`}
            alt={`Avatar of ${authedUser}`}
          />
          <p>
            Would You Rather...
          </p>
          <form onSubmit={(e) => this.handleFormSubmit(e)}>
            <div >
              <input className="form-control"
              placeholder="Option one"
                value={optionOne}
                onChange={(e) => this.handleSelectChange(e, 1)}
              />
            </div>
            <div >
              <input className="form-control"
              placeholder="Option Two"
                value={optionTwo}
                onChange={(e) => this.handleSelectChange(e, 2)}
              />
            </div>
            <button
              className='btn btn-primary'
              type='submit'
              disabled={optionOne === '' || optionTwo === ''}>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(NewQuestion)