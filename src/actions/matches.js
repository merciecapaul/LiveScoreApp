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

export const compare = product => ({
    type: types.COMPARE_PRODUCT,
    product
  })
