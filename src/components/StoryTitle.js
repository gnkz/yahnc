import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export function StoryTitle({ id, title, url }) {
  return (
    <>
      {url ? (
        <a target="_blank" rel="noreferrer" href={url}>
          {title}
        </a>
      ) : (
        <Link to={{ pathname: '/post', search: `?id=${id}` }}>{title}</Link>
      )}
    </>
  );
}

StoryTitle.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string,
};
