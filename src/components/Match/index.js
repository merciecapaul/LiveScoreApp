import React from 'react'
import moment from 'moment'
import './styles.css'

function getMatchStatus (match, status) {
    switch (status.toLowerCase()) {
        case 'ft':
            return 'ENDED';
        case '-':
            return moment(match.timestamp).format('MMM Do HH:mm')
        case 'cancelled':
            return 'CANCELLED';
        case 'ht':
        default:
            return 'LIVE';
    }
}

function getMatchStatusClassName (status) {
    switch (status.toLowerCase()) {
        case 'ft':
            return 'ended';
        case 'cancelled':
            return 'cancelled';
        case '-':
            return '';
        case 'ht':
        default:
            return 'live';
    }
}

const Match = ({match}, index) =>
    <div key={index} className="col-sm-4 col-md-6 pb-4">
        <div className="match" >
            <div className="match_country">{match.country}</div>
            <div className="match_competition">{match.competition}</div>
            <div className={"match_status " + getMatchStatusClassName(match.liveStatus)}>{getMatchStatus(match, match.liveStatus)}</div>
            <div className="match_score mt-3">
                <span className="home_score mr-2">{match.homeScore.current}</span>
                <span>-</span>
                <span className="away_score ml-2">{match.awayScore.current}</span>
            </div>
            <div className="match_teams d-flex flex-row">
                <div className="home_team">{match.homeTeam.name}</div>
                <div className="match_time">
                    <div className="progress_circle p10">
                        <span>{match.liveStatus}</span>
                        <div className="left_half_clipper">
                            <div className="first50_bar"></div>
                            <div className="value_bar"></div>
                        </div>
                    </div>
                </div>
                <div className="away_team">{match.awayTeam.name}</div>
            </div>
        </div>
    </div>;

export default Match
