export function getStoriesIds(source) {
  return fetch(
    `https://hacker-news.firebaseio.com/v0/${source}.json`,
  ).then((res) => res.json());
}

export function getUser(userName) {
  return fetch(
    `https://hacker-news.firebaseio.com/v0/user/${userName}.json`,
  ).then((res) => res.json());
}

export function getStories(storiesIds, limit = 30) {
  const promises = [];

  for (const storyId of storiesIds.slice(0, limit)) {
    promises.push(
      fetch(
        `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`,
      ).then((res) => res.json()),
    );
  }

  return Promise.all(promises);
}
