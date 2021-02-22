import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Stories from './Stories';
import colors from '../styles/colors';
import Loading from './Loading';
import { useUser } from '../hooks/useUser';
import { useDarkMode } from '../hooks/useDarkMode';

const UserCard = styled.div`
  color: ${({ darkMode }) =>
    darkMode ? colors.dark.userColor : colors.light.userColor};

  h1 {
    margin-bottom: 5px;
  }
`;

const UserCardInfo = styled.div`
  color: grey;
`;

export default function User({ username }) {
  const { user, loading } = useUser(username);
  const darkMode = useDarkMode();

  if (loading) {
    return <Loading text="Fetching user" />;
  }

  return (
    <UserCard darkMode={darkMode}>
      <h1>{user.id}</h1>
      <UserCardInfo>
        <span>
          joined <b>{new Date(user.created * 1000).toLocaleString()}</b>
        </span>
        <span>
          {' '}
          has <b>{user.karma}</b> karma
        </span>
      </UserCardInfo>
      <p dangerouslySetInnerHTML={{ __html: user.about }}></p>
      <h2>Posts</h2>
      <Stories storiesIds={user.submitted} />
    </UserCard>
  );
}

User.propTypes = {
  username: PropTypes.string.isRequired,
};
