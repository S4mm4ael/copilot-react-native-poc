import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import PokemonListScreen from '../features/pokemon-list/PokemonListScreen';
import PokemonDetailScreen from '../features/pokemon-detail/PokemonDetailScreen';
import ThemeSwitcher from '../components/shared/ThemeSwitcher';
import { useTheme } from '../theme/useTheme';
import { View } from 'react-native';

/**
 * The main app navigator using a type-safe stack.
 * Registers all feature screens.
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName="PokemonList"
        screenOptions={{
          headerRight: () => (
            <View>
              <ThemeSwitcher isDark={theme === 'dark'} onToggle={toggleTheme} />
            </View>
          ),
        }}
      >
        <Stack.Screen
          name="PokemonList"
          component={PokemonListScreen}
          options={{ title: 'Pokémon List' }}
        />
        <Stack.Screen
          name="PokemonDetail"
          component={PokemonDetailScreen}
          options={{ title: 'Pokémon Detail' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
