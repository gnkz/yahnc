import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loading from './Loading';
import { getStories } from '../utils/hn';
import StoryInfo from './StoryInfo';
import { ThemeConsumer } from '../contexts/theme';
import colors from '../styles/colors';

const CommentContainer = styled.div`
  background: rgba(128, 128, 128, 0.1411764705882353);
  color: ${({ darkMode }) =>
    darkMode ? colors.dark.commentColor : colors.light.commentColor};
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
`;

function Comment({ id, by, time, text }) {
  return (
    <ThemeConsumer>
      {({ darkMode }) => (
        <CommentContainer darkMode={darkMode}>
          <StoryInfo id={id} by={by} time={time} />
          <p dangerouslySetInnerHTML={{ __html: text }}></p>
        </CommentContainer>
      )}
    </ThemeConsumer>
  );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
  by: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default class Comments extends React.Component {
  static propTypes = {
    ids: PropTypes.array,
  };

  state = {
    comments: [],
    error: null,
    loading: true,
  };

  fetchComments = (ids) => {
    getStories(ids).then((comments) =>
      this.setState({ comments, error: null, loading: false }),
    );
  };

  componentDidMount() {
    this.fetchComments(this.props.ids);
  }

  render() {
    const { comments, loading } = this.state;

    if (loading) {
      return <Loading text="Loading comments" />;
    }

    return (
      <ul>
        {comments.map(
          (comment) =>
            !comment.deleted &&
            !comment.dead && (
              <li key={comment.id}>
                <Comment
                  id={comment.id}
                  by={comment.by}
                  time={comment.time}
                  text={comment.text}
                />
              </li>
            ),
        )}
      </ul>
    );
  }
}
