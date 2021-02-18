import React from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../utils/hn';
import styled from 'styled-components';
import Stories from './Stories';
import { ThemeConsumer } from '../contexts/theme';
import colors from '../styles/colors';
import Loading from './Loading';

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

export default class User extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
  };

  state = {
    user: null,
    error: null,
  };

  fetchUser = (username) => {
    return getUser(username)
      .then((user) => this.setState({ user, error: null }))
      .catch((error) => this.setState({ error }));
  };

  isLoading = () => this.state.user === null && this.state.error === null;

  componentDidMount() {
    this.fetchUser(this.props.username);
  }

  render() {
    const { user } = this.state;
    if (this.isLoading()) {
      return <Loading text="Fetching user" />;
    }

    return (
      <ThemeConsumer>
        {({ darkMode }) => (
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
        )}
      </ThemeConsumer>
    );
  }
}
