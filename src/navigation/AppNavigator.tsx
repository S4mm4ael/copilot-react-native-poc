import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import PokemonListScreen from '../features/pokemon-list/PokemonListScreen';
import PokemonDetailScreen from '../features/pokemon-detail/PokemonDetailScreen';
import CustomHeader from '../components/shared/CustomHeader';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * The main app navigator using a type-safe stack.
 * Registers all feature screens and configures the global header.
 * As per our guidelines, this component does NOT include the NavigationContainer.
 */
const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="PokemonList"
      screenOptions={{
        // Use the new reusable header component
        header: (props) => <CustomHeader {...props} />,
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
        // The title for this screen will be automatically used by the custom header.
        // You can also set it dynamically like this if needed:
        // options={({ route }) => ({ title: route.params.pokemonName })}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
