import React, { Component } from 'react';
import { connect } from 'react-redux';

class  Leaderboard extends Component{
  render(){
    const { users } = this.props;
    const userArray = Object.keys(users).map((key) => users[key]);
    const sortedUser = userArray.sort((a, b) => {
    return(Object.keys(b.answers).length + b.questions.length) - (Object.keys(a.answers).length + a.questions.length)
  })

  return (
    <div>
      <ul className='list-unstyled'>
        {sortedUser.map((user) => (
          <li key={user.id}className='h4'>
            <div className='users'>
              <img style={{height: 80}} 
                src={user.avatarURL}
                alt={`Pic of ${user.name}`}
              />
              <span>{user.name}</span>
              <div>
                <p className='h6'>Asked: {user.questions.length}</p>
                <p className='h6'>Answered: {Object.keys(user.answers).length}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
        }
      }

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(Leaderboard)
