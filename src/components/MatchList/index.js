import React from 'react'
import {Match} from '../'

const MatchList = ({matches}) =>
  <div className="row mt-3">
      {matches.map((match, index) =>
        <Match key={index} match={match} />
      )}
  </div>;

export default MatchList
