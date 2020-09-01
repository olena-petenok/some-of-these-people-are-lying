import React from 'react';
// import PropTypes from 'prop-types';

import './user-topics.sass';

import { CAPTION_YOUR_TOPICS, ERROR_EMPTY_LIST } from '../../constants/strings.js';

// import {} from '../../utils/helper.js';

function UserTopic(props) {
  return (
    <li>
      <ul className="topic-block">
        <li className="dot"></li>
        <li className="topic">{props.topic}</li>
      </ul>
    </li>
  );
}

function UserTopics(props) {
  const data = props.userTopics;
  let userTopics = null;
  if (data === false || data.length === 0) { userTopics = <li className="">{ERROR_EMPTY_LIST}</li>; }
  else { userTopics = data.map(item => <UserTopic key={item.id} topic={item.value} /> ); }

  return (
    <section className="user-topics-container">
      <h4>{CAPTION_YOUR_TOPICS}</h4>
      <ul>{userTopics}</ul>
    </section>
  );
}

// UserTopics.propTypes = {  };
// UserTopics.defaultProps = {  };

export default UserTopics;
