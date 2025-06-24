import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native';

/**
 * Props for the ThemeSwitcher component.
 */
export interface ThemeSwitcherProps {
  isDark: boolean;
  onToggle: () => void;
}

/**
 * A shared theme switcher component for toggling light/dark mode.
 * Uses basic Unicode icons for sun/moon and ensures proper touch area and alignment on both iOS and Android.
 */
const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ isDark, onToggle }) => (
  <TouchableOpacity
    onPress={onToggle}
    style={styles.container}
    accessibilityRole="button"
    accessibilityLabel="Toggle theme"
    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    activeOpacity={Platform.OS === 'android' ? 0.7 : 1}
  >
    <View style={styles.iconContainer}>
      <Text style={styles.icon}>{isDark ? '🌙' : '☀️'}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginRight: Platform.OS === 'android' ? 0 : -8,
    padding: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 26,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});

export default ThemeSwitcher;
