import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loading from './Loading';
import StoryInfo from './StoryInfo';
import colors from '../styles/colors';
import { useDarkMode } from '../hooks/useDarkMode';
import { useItem } from '../hooks/useItem';

const CommentContainer = styled.div`
  background: rgba(128, 128, 128, 0.1411764705882353);
  color: ${({ darkMode }) =>
    darkMode ? colors.dark.commentColor : colors.light.commentColor};
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
`;

function Comment({ id }) {
  const { item, loading } = useItem(id);
  const darkMode = useDarkMode();

  const isValid =
    item && !item.deleted && !item.dead && item.type === 'comment';

  if (loading) {
    return (
      <li>
        <Loading />
      </li>
    );
  }

  return (
    <>
      {isValid && (
        <li>
          <CommentContainer darkMode={darkMode}>
            <StoryInfo id={item.id} by={item.by} time={item.time} />
            <p dangerouslySetInnerHTML={{ __html: item.text }}></p>
          </CommentContainer>
        </li>
      )}
    </>
  );
}

Comment.propTypes = {
  id: PropTypes.number.isRequired,
};

export default function Comments({ ids }) {
  return (
    <ul>
      {ids.map((id) => (
        <Comment key={id} id={id} />
      ))}
    </ul>
  );
}

Comments.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
};
