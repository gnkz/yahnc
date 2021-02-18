import React from 'react';
import PropTypes from 'prop-types';
import { getStories } from '../utils/hn';
import { StoryTitle } from './StoryTitle';
import Loading from './Loading';
import StoryInfo from './StoryInfo';
import Comments from './Comments';

export default class Post extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  state = {
    story: null,
    error: null,
    loading: true,
  };

  fetchStory = (id) => {
    getStories([id], 1).then((stories) =>
      this.setState({
        story: stories[0],
        error: null,
        loading: false,
      }),
    );
  };

  componentDidMount() {
    this.fetchStory(this.props.id);
  }

  render() {
    const { loading, story } = this.state;

    if (loading) {
      return <Loading text="Loading story" />;
    }

    return (
      <div>
        <h1>
          <StoryTitle id={story.id} title={story.title} url={story.url} />
        </h1>
        <StoryInfo
          id={story.id}
          by={story.by}
          time={story.time}
          descendants={story.descendants}
        />
        <Comments ids={story.kids || []} />
      </div>
    );
  }
}
