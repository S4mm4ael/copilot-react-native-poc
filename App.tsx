import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/theme/useTheme';

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
