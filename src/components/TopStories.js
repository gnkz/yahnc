import React from 'react';
import Stories from './Stories';
import Loading from './Loading';
import { useFeed } from '../hooks/useFeed';

export default function TopStories() {
  const { storiesIds, loading } = useFeed('topstories');

  if (loading) {
    return <Loading text="Fetching stories" />;
  }

  return <Stories storiesIds={storiesIds} />;
}
