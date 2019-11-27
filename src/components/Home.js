import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Home extends Component {
  state = {
    selected: false,
  }

  handleSwitchQuestions = (option)=> {
    this.setState(()=> {
      return {
        selected: option
      }
    })
  }

  render() {
    const { selected } = this.state;
    const { authedUser, questions } = this.props;
    const questionsArray = Object.keys(questions).map((key) => questions[key]);
    const filteredQuestions = questionsArray.filter((question)=> {
      const groups = (
        question.optionOne.votes.includes(authedUser) ||
        question.optionTwo.votes.includes(authedUser)
      );
      return selected ? groups : !groups;
    });
    const displysortedQuestions = filteredQuestions.sort((a, b) => b.timestamp - a.timestamp);

    return (
      <div>
        <div className='btn-group'>
          <button
            className={!selected ? 'btn btn-secondary active' : 'btn btn-secondary'}
            onClick={(e) => this.handleSwitchQuestions(false)}
          >
            Unanswered
          </button>
          <button
            className={selected ? 'btn btn-secondary active' : 'btn btn-secondary'}
            onClick={(e) => this.handleSwitchQuestions(true)}
          >
            Answered
          </button>
        </div>
        <ul className='question-list'>
          {displysortedQuestions.map((question) => (
            <li key={question.id}className='list-unstyled'>
              <Question 
              question={question} 
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  return {
    authedUser,
    questions,
    users
  }
}

export default connect(mapStateToProps)(Home)