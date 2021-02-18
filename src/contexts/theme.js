import React from 'react';

const { Provider, Consumer } = React.createContext(false);

export const ThemeProvider = Provider;
export const ThemeConsumer = Consumer;
