import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions'
import Home from './Home'
import Leaderboard from './Leaderboard'
import Login from './Login'
import Nav from './Nav'
import NewQuestion from './NewQuestion'
import NotFound from './NotFound'
import QuestionPage from './QuestionPage'
import PrivateRoute from '../utils/PrivateRoute'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { loading } = this.props;

    return (
      <Router>
        <Fragment>
          <div className='container'>
            <Nav />
              <div>
                <Switch>
                  <PrivateRoute path='/' exact component={Home} loading={loading} />
                  <PrivateRoute path='/leaderboard' exact component={Leaderboard} loading={loading} />
                  <PrivateRoute path='/add' exact component={NewQuestion} loading={loading} />
                  <PrivateRoute path='/questions/:id' exact component={QuestionPage} loading={loading} />
                  <Route path='/login' exact component={Login} />
                  <Route component={NotFound} />
                </Switch>
              </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser !== null
  }
}

export default connect(mapStateToProps)(App)