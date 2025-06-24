import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import PokemonListScreen from '../features/pokemon-list/PokemonListScreen';
import PokemonDetailScreen from '../features/pokemon-detail/PokemonDetailScreen';

/**
 * The main app navigator using a type-safe stack.
 * Registers all feature screens.
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="PokemonList">
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

export default AppNavigator;
