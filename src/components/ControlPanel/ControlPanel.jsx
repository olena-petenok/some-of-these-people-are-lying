import React from 'react';
// import PropTypes from 'prop-types';

import Button from '../Button/Button';
import InputAndButton from '../InputAndButton/InputAndButton';

import './control-panel.sass';

import {
  BUTTON_CONNECT, BUTTON_DISCONNECT, BUTTON_START_GAME, BUTTON_END_GAME,
  INPUT_HOSTNAME, INPUT_NICKNAME, INPUT_TOPIC
} from '../../constants/strings.js';

// import {  } from '../../utils/helper.js';

function ControlPanel(props) {
  const {
    isWebSockedOpened, isUserGameMaster, isGameMasterStartsTheGame, isGameOn,
    userNickname, hostName,
    connectSocket, disconnectSocket,
    userAddTopic, userIntroduction,
    endGame, startGame
  } = props;

  return (
    <form className="main-content-container input-and-button-container">
      { !isWebSockedOpened && <InputAndButton parentFunction={connectSocket} inputPlaceholder={INPUT_HOSTNAME}
                                              buttonValue={BUTTON_CONNECT} inputValue={hostName} /> }

      { isWebSockedOpened && !isGameMasterStartsTheGame &&
        <>
          { userNickname ? <InputAndButton parentFunction={userAddTopic} inputPlaceholder={INPUT_TOPIC} />
                         : <InputAndButton parentFunction={userIntroduction} inputPlaceholder={INPUT_NICKNAME} /> }
          { isUserGameMaster && <Button parentFunction={isGameOn ? endGame : startGame}
                                        buttonValue={isGameOn ? BUTTON_END_GAME : BUTTON_START_GAME} /> }
        </>
      }

      { isWebSockedOpened && <Button parentFunction={disconnectSocket} buttonValue={BUTTON_DISCONNECT} /> }
    </form>
  )
}
//
// ControlPanel.propTypes = {
//   isWebSockedOpened: PropTypes.bool,
//   isUserGameMaster: PropTypes.bool,
//   isGameMasterStartsTheGame: PropTypes.bool,
//   isGameOn: PropTypes.bool,
//   userNickname: ,
//   hostName: ,
//   connectSocket: PropTypes.func,
//   disconnectSocket: PropTypes.func,
//   userAddTopic: PropTypes.func,
//   userIntroduction: PropTypes.func,
//   endGame: PropTypes.func,
//   startGame: PropTypes.func
// };
//
// ControlPanel.defaultProps = {
//   isWebSockedOpened: false,
//   isUserGameMaster: false,
//   isGameMasterStartsTheGame: false,
//   isGameOn: false,
//   userNickname: ,
//   hostName: ,
//   connectSocket: () => { console.log("Invalid props.connectSocket"); },
//   disconnectSocket: () => { console.log("Invalid props.disconnectSocket"); },
//   userAddTopic: () => { console.log("Invalid props.userAddTopic"); },
//   userIntroduction: () => { console.log("Invalid props.userIntroduction"); },
//   endGame: () =>  { console.log("Invalid props.endGame"); },
//   startGame: () =>  { console.log("Invalid props.startGame"); }
// };

export default ControlPanel;
