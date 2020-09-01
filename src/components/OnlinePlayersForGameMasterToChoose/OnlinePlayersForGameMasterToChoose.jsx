import React from 'react';
import PropTypes from 'prop-types';

import './online-players-for-game-master-to-choose.sass';

import { CAPTION_ONLINE_PLAYERS, ERROR_EMPTY_LIST } from '../../constants/strings.js';

// import {  } from '../../utils/helper.js';

function Player(props) {
  const { userNickname, userScore } = props;
  return (
    <li>
      <ul className="player-block">
        <li className="player">{userNickname}</li>
        <li className="player">{userScore}</li>
      </ul>
    </li>
  );
}

function OnlinePlayersForGameMasterToChoose(props) {
  const data = props.players;
  let players = null;
  if (!data || data.length === 0) { players = <li className="player">{ERROR_EMPTY_LIST}</li>; }
  else {
    players = data.map(item =>
      <Player key={item.id} userNickname={item.userNickname} userScore={item.userScore} /> );
  }

  return (
    <section className="players-container">
      <h4>{CAPTION_ONLINE_PLAYERS}</h4>
      <ul>{players}</ul>
    </section>
  );
}

// OnlinePlayersForGameMasterToChoose.propTypes = { players: PropTypes.oneOfType([ PropTypes.object, PropTypes.oneOf([false]) ]) };
// OnlinePlayersForGameMasterToChoose.defaultProps = { players: false };

export default OnlinePlayersForGameMasterToChoose;
