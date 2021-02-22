import React from 'react';
import PropTypes from 'prop-types';
import { StoryTitle } from './StoryTitle';
import Loading from './Loading';
import StoryInfo from './StoryInfo';
import Comments from './Comments';
import { useItem } from '../hooks/useItem';

export default function Post({ id }) {
  id = Number(id);

  const { item, loading } = useItem(id);

  if (loading) {
    return <Loading text="Loading story" />;
  }

  const { title, url, by, time, descendants, kids } = item;

  return (
    <div>
      <h1>
        <StoryTitle id={id} title={title} url={url} />
      </h1>
      <StoryInfo id={id} by={by} time={time} descendants={descendants} />
      <Comments ids={kids || []} />
    </div>
  );
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
};
