import React from 'react';
import Stories from './Stories';
import Loading from './Loading';
import { useFeed } from '../hooks/useFeed';

export default function NewStories() {
  const { storiesIds, loading } = useFeed('newstories');

  if (loading) {
    return <Loading text="Fetching stories" />;
  }

  return <Stories storiesIds={storiesIds} />;
}
