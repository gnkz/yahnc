import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../styles/colors';
import Button from './Button';
import { ThemeConsumer } from '../contexts/theme';

const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  font-size: 18px;

  ul {
    display: flex;
    flex-direction: row;
  }

  li {
    margin-right: 10px;
  }

  a {
    color: ${({ darkMode }) =>
      darkMode ? colors.dark.navLink : colors.light.navLink};

    &.active {
      color: ${colors.light.navLinkActive};
    }
  }
`;

export default function Nav() {
  return (
    <ThemeConsumer>
      {({ darkMode, toggleDarkMode }) => (
        <NavContainer darkMode={darkMode}>
          <ul>
            <li>
              <NavLink exact to="/">
                Top
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/new">
                New
              </NavLink>
            </li>
          </ul>
          <Button size="30px" onClick={toggleDarkMode}>
            {darkMode ? '💡' : '🔦'}
          </Button>
        </NavContainer>
      )}
    </ThemeConsumer>
  );
}
