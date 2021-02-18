import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import styled from 'styled-components';
import { ThemeProvider } from './contexts/theme';
import querystring from 'query-string';
import GlobalStyle from './components/GlobalStyle';
import Loading from './components/Loading';

const TopStories = React.lazy(() => import('./components/TopStories'));
const User = React.lazy(() => import('./components/User'));
const Post = React.lazy(() => import('./components/Post'));

const Main = styled.div`
  height: 100%;
  width: 1200px;
  margin: 0 auto;
  padding: 50px;
`;

class App extends React.Component {
  state = {
    theme: {
      darkMode: false,
      toggleDarkMode: () =>
        this.setState(({ theme }) => ({
          theme: {
            ...theme,
            darkMode: !theme.darkMode,
          },
        })),
    },
  };

  render() {
    return (
      <>
        <ThemeProvider value={this.state.theme}>
          <GlobalStyle darkMode={this.state.theme.darkMode} />
          <Main>
            <BrowserRouter>
              <Nav />
              <React.Suspense fallback={<Loading />}>
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={() => <TopStories feed="topstories" />}
                  />
                  <Route
                    path="/new"
                    render={() => <TopStories feed="newstories" />}
                  />
                  <Route
                    path="/user"
                    render={({ location }) => {
                      const { id } = querystring.parse(location.search);
                      return <User username={id} />;
                    }}
                  />
                  <Route
                    path="/post"
                    render={({ location }) => {
                      const { id } = querystring.parse(location.search);
                      return <Post id={id} />;
                    }}
                  />
                </Switch>
              </React.Suspense>
            </BrowserRouter>
          </Main>
        </ThemeProvider>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
