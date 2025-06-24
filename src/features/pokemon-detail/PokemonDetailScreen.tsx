import React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { usePokemonDetail } from './usePokemonDetail';
import StatBar from '../../components/shared/StatBar';

/**
 * Screen for displaying detailed information about a Pokémon.
 * Fetches data using the usePokemonDetail hook and displays
 * name, image, types, and stats using StatBar.
 */
const PokemonDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'PokemonDetail'>>();
  const { pokemonName } = route.params;
  const { data, loading, error } = usePokemonDetail(pokemonName);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !data) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error || 'Pokémon not found.'}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{data.name}</Text>
      <Image
        source={{ uri: data.sprites.other['official-artwork'].front_default || '' }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.typesContainer}>
        {data.types.map((t) => (
          <View key={t.type.name} style={styles.typeBadge}>
            <Text style={styles.typeText}>{t.type.name}</Text>
          </View>
        ))}
      </View>
      <View style={styles.statsContainer}>
        {data.stats.map((stat) => (
          <StatBar
            key={stat.stat.name}
            label={stat.stat.name}
            value={stat.base_stat}
            color="#4CAF50"
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    textTransform: 'capitalize',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  typesContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  typeBadge: {
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
  },
  typeText: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
  statsContainer: {
    width: '100%',
    marginTop: 16,
  },
});

export default PokemonDetailScreen;
