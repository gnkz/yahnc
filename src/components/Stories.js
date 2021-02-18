import React from 'react';
import PropTypes from 'prop-types';
import { getStories } from '../utils/hn';
import styled from 'styled-components';
import Loading from './Loading';
import StoryInfo from './StoryInfo';
import { StoryTitle } from './StoryTitle';

const StoryListItemContainer = styled.div`
  margin: 20px 0;
`;

function StoryListItem({ story }) {
  return (
    <StoryListItemContainer>
      <StoryTitle id={story.id} title={story.title} url={story.url} />
      <StoryInfo
        id={story.id}
        by={story.by}
        time={story.time}
        descendants={story.descendants || 0}
      />
    </StoryListItemContainer>
  );
}

StoryListItem.propTypes = {
  story: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
    time: PropTypes.number.isRequired,
    descendants: PropTypes.number,
    by: PropTypes.string.isRequired,
  }),
};

export default class Stories extends React.Component {
  static propTypes = {
    storiesIds: PropTypes.array.isRequired,
  };

  state = {
    stories: [],
    error: null,
    loading: true,
  };

  fetchStories = (storiesIds) => {
    getStories(storiesIds).then((stories) =>
      this.setState({
        stories: stories.filter(
          (story) => story.type === 'story' && !story.deleted,
        ),
        error: null,
        loading: false,
      }),
    );
  };

  componentDidMount() {
    this.fetchStories(this.props.storiesIds);
  }

  render() {
    const { stories, loading } = this.state;

    if (loading) {
      return <Loading text="Fetching stories" />;
    }

    return (
      <ul>
        {stories.map((story) => {
          return (
            story && (
              <li key={story.id}>
                <StoryListItem story={story} />
              </li>
            )
          );
        })}
      </ul>
    );
  }
}
