import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ThemeConsumer } from '../contexts/theme';
import colors from '../styles/colors';

const LoadingContent = styled.p`
  color: ${({ darkMode }) =>
    darkMode ? colors.dark.loadingColor : colors.light.loadingColor};
  font-size: 35px;
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 20px;
  text-align: center;
`;

export default class Loading extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    speed: PropTypes.number,
  };

  static defaultProps = {
    text: 'Loading',
    speed: 300,
  };

  state = {
    content: this.props.text,
  };

  componentDidMount() {
    const { speed, text } = this.props;

    this.interval = window.setInterval(() => {
      this.state.content === `${text}...`
        ? this.setState({ content: text })
        : this.setState(({ content }) => ({ content: content + '.' }));
    }, speed);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    const { content } = this.state;
    return (
      <ThemeConsumer>
        {({ darkMode }) => (
          <LoadingContent darkMode={darkMode}>{content}</LoadingContent>
        )}
      </ThemeConsumer>
    );
  }
}
