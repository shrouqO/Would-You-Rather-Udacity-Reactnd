import React from 'react'
import { connect } from 'react-redux'

const NotFound =(props) => {
    return (
      <div>
        <h3 className='center'>oops! Page doesn't exist!</h3>
       </div>
    )
}

function mapStateToProps({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(NotFound)
