import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDarkMode } from '../hooks/useDarkMode';

const StyledStoryInfo = styled.div`
  margin-top: 5px;
  color: gray;

  a {
    color: ${({ darkMode }) => (darkMode ? '#bebebe' : 'black')};
    text-decoration: underline;
    font-weight: normal;
  }
`;

export default function StoryInfo({ by, time, id, descendants }) {
  const darkMode = useDarkMode();

  return (
    <StyledStoryInfo darkMode={darkMode}>
      <span>
        by <Link to={{ pathname: '/user', search: `?id=${by}` }}>{by}</Link>
      </span>
      <span> on {new Date(time * 1000).toLocaleString()}</span>
      {descendants !== undefined && (
        <span>
          {' '}
          with{' '}
          <Link to={{ pathname: '/post', search: `?id=${id}` }}>
            {descendants}
          </Link>{' '}
          comments
        </span>
      )}
    </StyledStoryInfo>
  );
}

StoryInfo.propTypes = {
  by: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  descendants: PropTypes.number,
};
