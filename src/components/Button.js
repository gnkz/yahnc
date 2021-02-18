import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  border: none;
  background: none;
  font-size: ${(props) => props.size};
  cursor: pointer;
`;

export default function Button({
  children,
  onClick = () => {},
  size = '16px',
}) {
  return (
    <StyledButton size={size} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  size: PropTypes.string,
};
