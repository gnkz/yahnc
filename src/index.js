import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import TopStories from './components/TopStories';
import styled from 'styled-components';
import { ThemeProvider } from './contexts/theme';
import User from './components/User';
import querystring from 'query-string';
import Post from './components/Post';
import GlobalStyle from './components/GlobalStyle';

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
            </BrowserRouter>
          </Main>
        </ThemeProvider>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
