import React from 'react';
// import PropTypes from 'prop-types';

import Players from '../Players/Players';
import UserTopics from '../UserTopics/UserTopics';

import './players-and-user-topics-section.sass';

// import {  } from '../../constants/strings.js';
// import {  } from '../../utils/helper.js';

function PlayersAndUserTopicsSection(props) {
  const { players, userTopics } = props;
  // const players = [{
  //     id: "Lena",
  //     isOnline: true,
  //     userNickname: "Lena",
  //     userScore: 42
  //   },{
  //     id: "Ol",
  //     isOnline: false,
  //     userNickname: "Ol",
  //     userScore: 5
  //   },{
  //     id: "O",
  //     isOnline: true,
  //     userNickname: "O",
  //     userScore: 3
  //   },{
  //     id: "Oleg",
  //     isOnline: false,
  //     userNickname: "Oleg",
  //     userScore: 42
  //   },{
  //     id: "Qwerty",
  //     isOnline: true,
  //     userNickname: "Qwerty",
  //     userScore: 2
  //   },{
  //     id: "Poiuytre",
  //     isOnline: false,
  //     userNickname: "Poiuytre",
  //     userScore: 4
  // }];

  // const userTopics = [{
  //     id: 1,
  //     value: "Qwertyui fuvk k k"
  //   },{
  //     id: 2,
  //     value: "Qwertyui"
  //   },{
  //     id: 3,
  //     value: "kkaka"
  //   },{
  //     id: 4,
  //     value: "Qwertyui fuvk. Qwertyui fuvk. Qwertyui fuvk. Qwertyui fuvk. Qwertyui fuvk. Qwertyui fuvk."
  //   },{
  //     id: 5,
  //     value: "Assdab dnland ak"
  // }];

  return (
    <section className="main-content-container">
      <Players players={players} />
      <UserTopics userTopics={userTopics} />
    </section>
  );
}

// PlayersAndUserTopicsSection.propTypes = {  };
// PlayersAndUserTopicsSection.defaultProps = {  };

export default PlayersAndUserTopicsSection;
