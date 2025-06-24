import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import PokemonListScreen from '../features/pokemon-list/PokemonListScreen';
import PokemonDetailScreen from '../features/pokemon-detail/PokemonDetailScreen';
import { useTheme } from '../theme/useTheme';
import CustomHeader from '../components/shared/CustomHeader';

/**
 * The main app navigator using a type-safe stack.
 * Registers all feature screens and configures the global header.
 * As per our guidelines, this component does NOT include the NavigationContainer.
 */
const AppNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName="PokemonList"
        screenOptions={{
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
          options={{ title: 'Pokémon Detail' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
            
