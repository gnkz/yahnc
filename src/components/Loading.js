import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../styles/colors';
import { useDarkMode } from '../hooks/useDarkMode';

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

function useLoadingText(initialValue, speed) {
  const [text, setText] = useState(initialValue);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setText((text) =>
        text === `${initialValue}...` ? initialValue : `${text}.`,
      );
    }, speed);

    return () => window.clearInterval(interval);
  }, [initialValue, speed]);

  return text;
}

export default function Loading({ text = 'Loading', speed = 300 }) {
  const content = useLoadingText(text, speed);
  const darkMode = useDarkMode();

  return <LoadingContent darkMode={darkMode}>{content}</LoadingContent>;
}

Loading.propTypes = {
  text: PropTypes.string,
  speed: PropTypes.number,
};
