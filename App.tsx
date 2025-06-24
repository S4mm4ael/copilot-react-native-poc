import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet, View } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider, useTheme } from './src/theme/useTheme';

/**
 * This component contains the main app content and logic for theme handling.
 * It's separated so it can access context from the providers that wrap it.
 */
const AppContent: React.FC = () => {
  const { theme } = useTheme();

  // This custom theme makes the navigator's own background transparent,
  // allowing the background color of our root View to be visible.
  // This solves the white bar issue under the home indicator on iOS.
  const navigationTheme = {
    ...(theme === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(theme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      background: 'transparent',
    },
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === 'dark' ? '#121212' : '#f2f2f2' },
      ]}
    >
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
      </NavigationContainer>
    </View>
  );
};

/**
 * Root App component.
 * It's responsible for setting up all the global providers.
 * The SafeAreaProvider should be at the very root.
 */
const App: React.FC = () => (
  <SafeAreaProvider>
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;