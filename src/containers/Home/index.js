import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {MatchList} from '../../components'
import * as matchActions from '../../actions/matches'
import * as types from '../../constants/types'
import {connect} from 'react-redux'

class Home extends Component {
  constructor (props) {
    super(props)

    this.filterMatches = this.filterMatches.bind(this)

    this.state = {
      allCount: 0,
      resultCount: 0,
      liveCount: 0,
      upcomingCount: 0,
      cancelledCount: 0,
      filteredMatches: [],
      currentFilter: types.FILTERS.ALL
    }
  }

  componentWillMount() {
    this.props.actions.getMatches().then(() => {
      this.setState({
        filteredMatches: this.props.matches,
        allCount: this.props.matches.length,
        resultCount: this.props.matches.filter(match => match.status.type === "finished").length,
        liveCount: this.props.matches.filter(match => match.status.type === "inprogress").length,
        upcomingCount: this.props.matches.filter(match => match.status.type === "notstarted").length,
        cancelledCount: this.props.matches.filter(match => match.status.type === "canceled").length
      })
    })
  }

  filterMatches (type) {
    this.setState({
      currentFilter: type,
      filteredMatches: type === types.FILTERS.ALL ? this.props.matches : this.props.matches.filter(match => match.status.type === type)
    })
  }

  render() {
    return (
      <div className="home mt-5">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-5">Livescore App</h2>
          </div>
          <div className="col-12">
            <h4 className="mb-2">Filters</h4>
            <ul className="nav nav-pills">
              <li className="nav-item">
                <a className={"nav-link " + (this.state.currentFilter === types.FILTERS.ALL ? 'active' : '')} href="#" onClick={() => this.filterMatches(types.FILTERS.ALL)}>All<span className="badge ml-2">{this.state.allCount}</span></a>
              </li>
              <li className="nav-item">
                <a className={"nav-link " + (this.state.currentFilter === types.FILTERS.FINISHED ? 'active' : '')} href="#" onClick={() => this.filterMatches(types.FILTERS.FINISHED)}>Result<span className="badge ml-2">{this.state.resultCount}</span></a>
              </li>
              <li className="nav-item">
                <a className={"nav-link " + (this.state.currentFilter === types.FILTERS.LIVE ? 'active' : '')} href="#" onClick={() => this.filterMatches(types.FILTERS.LIVE)}>Live<span className="badge ml-2">{this.state.liveCount}</span></a>
              </li>
              <li className="nav-item">
                <a className={"nav-link " + (this.state.currentFilter === types.FILTERS.PRELIVE ? 'active' : '')} href="#" onClick={() => this.filterMatches(types.FILTERS.PRELIVE)}>Upcoming<span className="badge ml-2">{this.state.upcomingCount}</span></a>
              </li>
              <li className="nav-item">
                <a className={"nav-link " + (this.state.currentFilter === types.FILTERS.CANCELLED ? 'active' : '')} href="#" onClick={() => this.filterMatches(types.FILTERS.CANCELLED)}>Cancelled<span className="badge ml-2">{this.state.cancelledCount}</span></a>
              </li>
            </ul>
          </div>
        </div>
        <MatchList matches={this.state.filteredMatches}/>
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
