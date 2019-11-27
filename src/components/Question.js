import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions/questions'

class Question extends Component {
  handleOptionSelected = (option)=> {
    console.log(this.props)
    const { answerQuestion, authedUser, question } = this.props;
    const answer = option === 1 ? 'optionOne' : 'optionTwo'
    answerQuestion(authedUser, question.id, answer)
  }

  render() {
    const { authedUser, question, users } = this.props;
    const answers = Object.keys(users[authedUser].answers);
    const answered = answers.indexOf(question.id) > -1 ? true : false;
    const optionOneVotes = question.optionOne.votes.length
    const optionTwoVotes = question.optionTwo.votes.length
    const totalVotes = optionOneVotes + optionTwoVotes
    const optionOnePercent = Math.round((optionOneVotes / totalVotes)* 100);
    const optionTwoPercent = Math.round((optionTwoVotes / totalVotes)* 100);

    return (
      <Link style={{textDecoration: 'none'}} to={`/questions/${question.id}`} >
        <img style={{height: 100}} className='img-thumbnail'
          src={`/${users[question.author].avatarURL}`}
          alt={`Avatar of ${question.author}`}
        />
        <h5 style={{textDecoration: 'none'}}>Would You Rather</h5>
        <div className='option'>
          <button
            className={
              question.optionOne.votes.indexOf(authedUser) > -1
              ? 'question-ans-selected'
              : answered
                ? 'answered'
                : ''
            }
            onClick={(e) => this.handleOptionSelected(1)}
          >
            {question.optionOne.text}
          </button>
          {answered &&
           <p>
            Votes: {question.optionOne.votes.length} ({optionOnePercent}%)
          </p>}
        </div>
        <div className='option opt-offset'>
          <button
            className={
              question.optionTwo.votes.indexOf(authedUser) > -1
              ? ' question-ans-selected'
              : answered
                ? 'answered'
                : ''
            }
            onClick={(e) => this.handleOptionSelected(2)}
          >
            {question.optionTwo.text}
          </button>
          {answered && 
          <p>
            Votes: {question.optionTwo.votes.length} ({optionTwoPercent}%)
          </p>}
        </div>
      </Link>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  console.log(actions)
  return {
    authedUser,
    users
  }
}

export default connect(mapStateToProps, actions)(Question)
