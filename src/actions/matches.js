import moment from 'moment'
import * as types from '../constants/types'

export const getMatches = () =>
  dispatch =>
    fetch(`sports.json`)
      .then(response => response.json())
      .then(response => {
        dispatch({
          type: types.FETCH_MATCHES,
          payload: response
        })
      })


export function getMatchStatus (match, status) {
    switch (status.toLowerCase()) {
        case 'ft':
            return 'ENDED';
        case '-':
            return moment(match.timestamp).format('MMM Do HH:mm')
        case 'canceled':
            return 'CANCELLED';
        case 'ht':
        default:
            return 'LIVE';
    }
}
    
export function getMatchStatusClassName (status) {
    switch (status.toLowerCase()) {
        case 'ft':
            return 'ended';
        case 'canceled':
            return 'cancelled';
        case '-':
            return '';
        case 'ht':
        default:
            return 'live';
    }
}
    
export function calculateMatchProgress (status) {
    status = status.replace('+', '');
    switch (status.toLowerCase()) {
        case 'ft':
            return 360;
        case 'canceled':
        case '-':
            return 0;
        case 'ht':
            return 180;
        default:
            return (status / 90) * 360;
    }
}
    
export function getMatchStatusShorthand (status) {
    switch (status.toLowerCase()) {
        case 'ft':
        case 'ht':
            return status.toUpperCase();
        case 'canceled':
        case '-':
            return '';
        default:
            return `${status}'`;
    }
}
    
export function isMatchMoreThanHalfPlayed (status) {
    if (status.toLowerCase() === 'ft') {
        return true;
    }

    if (!isNaN(status)) {
        return status > 45;
    }
}

export function displayMatchScore (score) {
    return score.current ? score.current : 0
}