import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import StoryInfo from './StoryInfo';
import { StoryTitle } from './StoryTitle';
import { useItem } from '../hooks/useItem';

const StoryListItemContainer = styled.div`
  margin: 20px 0;
`;

function StoryListItem({ id }) {
  const { item, loading } = useItem(id);

  if (loading) {
    return null;
  }

  const isValid = item && item.type === 'story' && !item.deleted && !item.dead;

  return (
    <>
      {isValid && (
        <li>
          <StoryListItemContainer>
            <StoryTitle id={item.id} title={item.title} url={item.url} />
            <StoryInfo
              id={item.id}
              by={item.by}
              time={item.time}
              descendants={item.descendants || 0}
            />
          </StoryListItemContainer>
        </li>
      )}
    </>
  );
}

StoryListItem.propTypes = {
  id: PropTypes.number.isRequired,
};

export default function Stories({ storiesIds, limit = 30 }) {
  const storiesToShow = storiesIds.slice(0, limit);

  return (
    <ul>
      {storiesToShow.map((id) => (
        <StoryListItem key={id} id={id} />
      ))}
    </ul>
  );
}

Stories.propTypes = {
  storiesIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  limit: PropTypes.number,
};
