import React from 'react';
import { Switch, View, Text, StyleSheet } from 'react-native';

export interface ThemeSwitcherProps {
  isDark: boolean;
  onToggle: () => void;
}

/**
 * A shared theme switcher component for toggling light/dark mode.
 */
const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ isDark, onToggle }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{isDark ? 'Dark' : 'Light'}</Text>
    <Switch value={isDark} onValueChange={onToggle} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  label: {
    marginRight: 8,
    fontSize: 16,
  },
});

export default ThemeSwitcher;
