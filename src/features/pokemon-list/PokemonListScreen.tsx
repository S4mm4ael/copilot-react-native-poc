import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { usePokemonList } from './usePokemonList';

/**
 * Screen for displaying a paginated list of Pokémon.
 * Uses usePokemonList hook for data and navigation to detail screen.
 */
const PokemonListScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, loading, error, loadMore, hasMore, refresh } = usePokemonList(20);

  const renderItem = ({ item }: { item: { name: string } }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('PokemonDetail', { pokemonName: item.name })}
    >
      <Text style={styles.itemText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {error && (
        <View style={styles.centered}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}
      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        onEndReached={hasMore ? loadMore : undefined}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={loading && data.length === 0} onRefresh={refresh} />
        }
        ListFooterComponent={
          loading && data.length > 0 ? <ActivityIndicator style={{ margin: 16 }} /> : null
        }
        contentContainerStyle={data.length === 0 ? styles.centered : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
  },
});

export default PokemonListScreen;
