import {
  ACTION, ACTION_INTRODUCTION, ACTION_DATANAME_NAME, ACTION_TOPIC, ACTION_DATANAME_TOPIC,
  ACTION_GAME_MASTER, ACTION_DATANAME_GAME_MASTER, ACTION_START_GAME, ACTION_END_GAME,
  ACTION_DATANAME_PLAYERS, ACTION_CHANGE_USER_SCORE, ACTION_DATANAME_SCORE
} from '../constants/strings.js';

// parsers
export const parsePlayers = data => data.map(item => ({
    id: item.name,
    isOnline: item.isOnline,
    userNickname: item.name,
    userScore: item.score
  }));

export const parseTopics = data => {
  let result = [];
  for (const i in data.topics) {
    result.push({
      id: i,
      value: data.topics[i]
    });
  }
  return result;
}

export const filterPlayersByInTheGame = (guessers, players) => {
  let playersInTheGame = [];
  console.log(guessers);
  console.log(players);
  players.forEach(item => {
    for (guesser of guessers) {
      if (guesser === item.userNickname) {
        playersInTheGame.push(item);
        break;
      }
    }
  });
  return playersInTheGame;
}

// sorting and filtering algorithms
export const sortPlayersByScore = data => data.sort((a, b) =>
  (a.userScore === b.userScore) ? 0 : (a.userScore > b.userScore) ? -1 : 1);

export const sortPlayers = data => {
  if (data && data.length !== 0) {
    let online = sortPlayersByScore(data.filter(a => a.isOnline === true));
    let offline = sortPlayersByScore(data.filter(a => a.isOnline === false));
    return online.concat(offline);
  }
}

export const filterPlayersByIsOnline = data => {
  if (data && data.length !== 0) { return data.filter(a => a.isOnline === true); }
  return false;
}

// WebSocket messages
export const generateMessageAboutUser = data =>
  JSON.stringify({
    [ACTION]: ACTION_INTRODUCTION,
    [ACTION_DATANAME_NAME]: data
  });

export const generateMessageAboutTopic = data =>
  JSON.stringify({
    [ACTION]: ACTION_TOPIC,
    [ACTION_DATANAME_TOPIC]: data
  });

export const generateMessageGameStarted = data =>
  JSON.stringify({
    [ACTION]: ACTION_GAME_MASTER,
    [ACTION_DATANAME_GAME_MASTER]: ACTION_START_GAME,
    [ACTION_DATANAME_PLAYERS]: data
  });

export const generateMessageGameEnded = () =>
  JSON.stringify({
    [ACTION]: ACTION_GAME_MASTER,
    [ACTION_DATANAME_GAME_MASTER]: ACTION_END_GAME
  });

export const generateMessageChangeUserScore = (userNickname, score) =>
  JSON.stringify({
    [ACTION]: ACTION_GAME_MASTER,
  	[ACTION_DATANAME_GAME_MASTER]: ACTION_CHANGE_USER_SCORE,
  	[ACTION_DATANAME_NAME]: userNickname,
  	[ACTION_DATANAME_SCORE]: score
  });
