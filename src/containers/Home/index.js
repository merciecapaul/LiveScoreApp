import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {MatchList} from '../../components'
import * as matchActions from '../../actions/matches'
import {connect} from 'react-redux'

class Home extends Component {
  componentWillMount() {
    this.props.actions.getMatches()
  }

  render() {
    const {matches, actions} = this.props;
console.log(matches)
    return (
      <div className="home mt-5">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-3">Livescore App</h2>
          </div>
        </div>
        <MatchList matches={matches}/>
      </div>
    )
  }
}

export default connect(
  state => ({
    matches: state.app.matches
  }),
  dispatch => ({
    actions: bindActionCreators(matchActions, dispatch)
  })
)(Home)
