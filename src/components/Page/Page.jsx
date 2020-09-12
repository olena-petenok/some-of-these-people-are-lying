import React, { useState, useRef } from 'react';

import ControlPanel from '../ControlPanel/ControlPanel';
import GameIsOn from '../GameIsOn/GameIsOn';
import PlayersAndUserTopicsSection from '../PlayersAndUserTopicsSection/PlayersAndUserTopicsSection';
import GameMasterStartsTheGame from '../GameMasterStartsTheGame/GameMasterStartsTheGame';

import './page.sass';

import {
  HOSTNAME,
  ACTION_RECEIVED_USERDATA, ACTION_RECEIVED_PLAYERS, ACTION_RECEIVED_TOPICS,
  ACTION_RECEIVED_START_GAME, ACTION_RECEIVED_END_GAME, ACTION_RECEIVED_SERVER_ERROR
} from '../../constants/strings.js';

import {
  parsePlayers, parseTopics,
  filterPlayersByInTheGame,
  sortPlayers, sortPlayersByScore, filterPlayersByIsOnline,
  generateMessageAboutUser, generateMessageAboutTopic, generateMessageGameStarted,
  generateMessageGameEnded, generateMessageChangeUserScore
} from '../../utils/helper.js';

function Page(props) {
  const [hostName, setHostName] = useState(HOSTNAME);
  const [isWebSockedOpened, setIsWebSockedOpened] = useState(false);
  const refWebSocket = useRef(false);

  const [players, setPlayers] = useState(false);

  // user states
  const [userNickname, setUserNickname] = useState(false);
  const [isUserGameMaster, setIsUserGameMaster] = useState(false);
  const [userTopics, setUserTopics] = useState(false);

  // game states
  const [isGameMasterStartsTheGame, setIsGameMasterStartsTheGame] = useState(false);
  const [isGameOn, setIsGameOn] = useState(false);
  const [topicOfTheGame, setTopicOfTheGame] = useState(false);
  const [playersInTheGame, setPlayersInTheGame] = useState(false);

  const setUserStatesToDefault = () => {
    setUserNickname(false);
    setIsUserGameMaster(false);
    setUserTopics(false);
  }

  const setGameStatesToDefault = () => {
    setIsGameMasterStartsTheGame(false);
    setIsGameOn(false);
    setTopicOfTheGame(false);
    setPlayersInTheGame(false);
  }

  const setStateToDefault = () => {
    setIsWebSockedOpened(false);
    setHostName(HOSTNAME);
    setPlayers(false);

    setUserStatesToDefault();
    setGameStatesToDefault();
  }

  const setUserStates = data => {
    setUserNickname(data.name);
    setIsUserGameMaster(data.isGM);
  }

  const setGameStates = data => {
    setTopicOfTheGame(data.topic);
    
    // players are false here for whatever reason
    // let guessers = filterPlayersByInTheGame(data.guessers, players);
    // setPlayersInTheGame(sortPlayersByScore(guessers));
    setIsGameOn(true);
  }

  const onMessageActions = action => {
    switch (action.message) {
      case ACTION_RECEIVED_USERDATA: { setUserStates(action); } break;
      case ACTION_RECEIVED_PLAYERS: { setPlayers(sortPlayers(parsePlayers(action.players))); } break;
      case ACTION_RECEIVED_TOPICS: { setUserTopics(parseTopics(action)); } break;
      case ACTION_RECEIVED_START_GAME: { setGameStates(action); } break;
      case ACTION_RECEIVED_END_GAME: { setGameStatesToDefault(); } break;
      case ACTION_RECEIVED_SERVER_ERROR: { console.log(action.error); } break;
      default: console.log("invalid action");
    }
  }

  const connectSocket = host => {
    // if not host ?
    if (host) { setHostName(host); }
    refWebSocket.current = new WebSocket(`ws://${hostName}/`);
    refWebSocket.current.onerror = event => { console.log("error"); };
    refWebSocket.current.onopen = () => { setIsWebSockedOpened(true); console.log("connection opened"); };
    refWebSocket.current.onclose = () => { setStateToDefault(); console.log("connection closed"); };
    refWebSocket.current.onmessage = event => {
      const rawData = event.data;
      const [hour, minute, second] = (new Date()).toLocaleTimeString().slice(0,7).split(":");
      console.log(`message received at: ${hour}:${minute}:${second}`);
      console.log(event.data);
      if (rawData) { onMessageActions(JSON.parse(rawData)); }
    };
  }

  const disconnectSocket = () => {
    refWebSocket.current.close();
    refWebSocket.current = false;
  }

  const sendMessageThroughWebSocket = message => { refWebSocket.current.send(message); }
  const userIntroduction = userNickname => { sendMessageThroughWebSocket(generateMessageAboutUser(userNickname)); }
  const userAddTopic = newTopic => { sendMessageThroughWebSocket(generateMessageAboutTopic(newTopic)); }
  const endGame = () => { sendMessageThroughWebSocket(generateMessageGameEnded()); }
  const changeUserScore = (userNickname, score) => { sendMessageThroughWebSocket(generateMessageChangeUserScore(userNickname, score)); }

  const startTheSelectionOfThePlayersForTheGame = () => { setIsGameMasterStartsTheGame(true); }

  const sendAmountOfRandomPlayersThroughWebSocket = data => {
    console.log(generateMessageGameStarted(data));
    setIsGameMasterStartsTheGame(false);
    sendMessageThroughWebSocket(generateMessageGameStarted(data));
  }

  const parseAndApplySelectedPlayers = data => {
    console.log(data);
  }

  return (
    <>
      <ControlPanel isWebSockedOpened={isWebSockedOpened} userNickname={userNickname}
                    isUserGameMaster={isUserGameMaster} connectSocket={connectSocket}
                    disconnectSocket={disconnectSocket} hostName={hostName}
                    userAddTopic={userAddTopic} userIntroduction={userIntroduction}
                    isGameOn={isGameOn} endGame={endGame} startGame={startTheSelectionOfThePlayersForTheGame}
                    isGameMasterStartsTheGame={isGameMasterStartsTheGame} />
      { isGameMasterStartsTheGame && <GameMasterStartsTheGame sendAmountOfRandomPlayersThroughWebSocket={sendAmountOfRandomPlayersThroughWebSocket}
                                                              parseAndApplySelectedPlayers={parseAndApplySelectedPlayers}
                                                              setIsGameMasterStartsTheGame={setIsGameMasterStartsTheGame}
                                                              players={filterPlayersByIsOnline(players)} /> }
      { isGameOn && <GameIsOn topic={topicOfTheGame} playersInTheGame={playersInTheGame}
                              changeUserScore={changeUserScore} /> }
      { isWebSockedOpened && <PlayersAndUserTopicsSection players={players} userTopics={userTopics} /> }
    </>
  );
}

export default Page;
