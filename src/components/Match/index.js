import React from 'react'
import {getMatchStatusClassName, getMatchStatus, isMatchMoreThanHalfPlayed, getMatchStatusShorthand, calculateMatchProgress, displayMatchScore} from '../../actions/matches'
import './styles.css'

const Match = ({match}, index) =>
    <div key={index} className="col-sm-24 col-md-6 pb-4">
        <div className="match" >
            <div className="match_country">{match.country}</div>
            <div className="match_competition">{match.competition}</div>
            <div className={"match_status " + getMatchStatusClassName(match.liveStatus)}>{getMatchStatus(match, match.liveStatus)}</div>
            <div className="match_score mt-3">
                <span className="home_score mr-2">{displayMatchScore(match.homeScore)}</span>
                <span>-</span>
                <span className="away_score ml-2">{displayMatchScore(match.awayScore)}</span>
            </div>
            <div className="match_teams d-flex flex-row">
                <div className="home_team">{match.homeTeam.name}</div>
                <div className="match_time">
                    <div className={"progress_circle " + match.liveStatus + " " + (isMatchMoreThanHalfPlayed(match.liveStatus) ? 'over50' : '')}>
                        <span>{getMatchStatusShorthand(match.liveStatus)}</span>
                        <div className="left_half_clipper">
                            <div className="first50_bar"></div>
                            <div className="value_bar" style={{transform: `rotate(${calculateMatchProgress(match.liveStatus.toLowerCase())}deg)`}}></div>
                        </div>
                    </div>
                </div>
                <div className="away_team">{match.awayTeam.name}</div>
            </div>
        </div>
    </div>;

export default Match
