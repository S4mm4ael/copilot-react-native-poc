import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

/**
 * Root App component.
 * Renders the main AppNavigator inside a SafeAreaView.
 */
const App: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" />
    <AppNavigator />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
