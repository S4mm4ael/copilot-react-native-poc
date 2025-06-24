import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import PokemonListScreen from '../features/pokemon-list/PokemonListScreen';
import PokemonDetailScreen from '../features/pokemon-detail/PokemonDetailScreen';
import ThemeSwitcher from '../components/shared/ThemeSwitcher';
import { useTheme } from '../theme/useTheme';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

/**
 * The main app navigator using a type-safe stack.
 * Registers all feature screens.
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName="PokemonList"
        screenOptions={{
          header: (props) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 16,
                paddingTop: insets.top,
                height: 56 + insets.top,
                backgroundColor: theme === 'dark' ? '#222' : '#fff',
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: theme === 'dark' ? '#333' : '#ccc',
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme === 'dark' ? '#fff' : '#222' }}>
                {props.options.title ?? props.route.name}
              </Text>
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
