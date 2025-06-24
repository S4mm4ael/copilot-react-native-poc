import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/theme/useTheme';

/**
 * Root App component.
 * Renders the main AppNavigator inside a SafeAreaView and ThemeProvider.
 */
const App: React.FC = () => (
  <ThemeProvider>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </SafeAreaView>
  </ThemeProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
