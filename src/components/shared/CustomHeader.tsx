import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { useTheme } from '../../theme/useTheme';
import ThemeSwitcher from './ThemeSwitcher';

const HEADER_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

/**
 * A reusable, theme-aware custom header component for the main stack navigator.
 * It handles safe area insets, back navigation, and title display.
 */
const CustomHeader: React.FC<NativeStackHeaderProps> = (props) => {
  const { theme, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();
  const canGoBack = props.navigation.canGoBack();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          height: HEADER_HEIGHT + insets.top,
          backgroundColor: theme === 'dark' ? '#222' : '#fff',
          borderBottomColor: theme === 'dark' ? '#333' : '#ccc',
        },
      ]}
    >
      <View style={styles.contentContainer}>
        <View style={styles.leftContainer}>
          {canGoBack && (
            <TouchableOpacity
              onPress={props.navigation.goBack}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Text style={[styles.backButtonText, { color: theme === 'dark' ? '#fff' : '#222' }]}>←</Text>
            </TouchableOpacity>
          )}
          <Text
            style={[styles.title, { color: theme === 'dark' ? '#fff' : '#222' }]}
            numberOfLines={1}
          >
            {props.options.title ?? props.route.name}
          </Text>
        </View>
        <ThemeSwitcher isDark={theme === 'dark'} onToggle={toggleTheme} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  backButton: {
    marginRight: 12,
    padding: 8,
  },
  backButtonText: {
    fontSize: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    flexShrink: 1,
  },
});

export default CustomHeader;