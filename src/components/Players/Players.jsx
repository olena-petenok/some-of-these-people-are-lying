import React from 'react';
import PropTypes from 'prop-types';

import './players.sass';

import { CAPTION_PLAYERS, ERROR_EMPTY_LIST } from '../../constants/strings.js';

// import {  } from '../../utils/helper.js';

function Player(props) {
  const { isOnline, userNickname, userScore } = props;

  return (
    <li>
      <ul className="player-block">
        <li className={`circle ${isOnline ? `green` : `red`}`}></li>
        <li className="player">{userNickname}</li>
        <li className="player">{userScore}</li>
      </ul>
    </li>
  );
}

function Players(props) {
  const data = props.players;
  let players = null;
  if (!data || data.length === 0) { players = <li className="player">{ERROR_EMPTY_LIST}</li>; }
  else {
    players = data.map(item =>
      <Player key={item.id} isOnline={item.isOnline} userNickname={item.userNickname} userScore={item.userScore} /> );
  }

  return (
    <section className="players-container">
      <h4>{CAPTION_PLAYERS}</h4>
      <ul>{players}</ul>
    </section>
  );
}

// Players.propTypes = { players: PropTypes.oneOfType([ PropTypes.object, PropTypes.oneOf([false]) ]) };
// Players.defaultProps = { players: false };

export default Players;
