import React from 'react';
import PropTypes from 'prop-types';
import Stories from './Stories';
import { getStoriesIds } from '../utils/hn';
import Loading from './Loading';

export default class TopStories extends React.Component {
  static propTypes = {
    feed: PropTypes.string.isRequired,
  };

  state = {
    storiesIds: [],
    error: null,
    loading: true,
  };

  fetchStoriesIds = (feed) =>
    getStoriesIds(feed)
      .then((storiesIds) =>
        this.setState({ storiesIds, error: null, loading: false }),
      )
      .catch((error) => this.setState({ error, loading: false }));

  componentDidMount() {
    this.fetchStoriesIds(this.props.feed);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.feed !== this.props.feed) {
      this.setState({
        storiesIds: [],
        error: null,
        loading: true,
      });

      this.fetchStoriesIds(this.props.feed);
    }
  }

  render() {
    const { loading, storiesIds } = this.state;

    if (loading) {
      return <Loading text="Fetching stories" />;
    }

    return <Stories storiesIds={storiesIds} />;
  }
}
