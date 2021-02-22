import React from 'react';

const ThemeContext = React.createContext(false);

export const ThemeProvider = ThemeContext.Provider;
export const ThemeConsumer = ThemeContext.Consumer;
export default ThemeContext;
