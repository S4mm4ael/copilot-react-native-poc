import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet } from 'react-native';
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
 * Renders the main AppNavigator inside a SafeAreaView and ThemeProvider.
 * Ensures the SafeAreaView covers all edges and uses the theme background.
 */
const App: React.FC = () => (
  <ThemeProvider>
    <SafeAreaProvider>
        <StatusBar barStyle="dark-content" />
        <AppNavigator />
    </SafeAreaProvider>
  </ThemeProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1, // You can set this dynamically from theme if needed
  },
});

export default App;