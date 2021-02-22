import { useContext } from 'react';
import ThemeContext from '../contexts/theme';

export function useDarkMode() {
  return useContext(ThemeContext);
}
