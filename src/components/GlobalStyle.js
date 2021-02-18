import { createGlobalStyle } from 'styled-components';
import colors from '../styles/colors';

export default createGlobalStyle`
html, body, #app {
  height: 100%;
  width: 100%;
  margin: 0;
}

html {
  background: ${({ darkMode }) =>
    darkMode ? colors.dark.background : colors.light.background};
}

a {
  color: ${({ darkMode }) => (darkMode ? colors.dark.link : colors.light.link)};
  text-decoration: none;
  font-weight: bold;
}

body {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif;
}

ul {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}
`;
