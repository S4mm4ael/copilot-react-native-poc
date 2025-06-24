import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { usePokemonList } from './usePokemonList';

/**
 * Screen for displaying a paginated list of Pokémon.
 * Uses usePokemonList hook for data and navigation to detail screen.
 * Now includes a search bar for filtering by name.
 */
const PokemonListScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, loading, error, loadMore, hasMore, refresh, search, setSearch } = usePokemonList(20);

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
      <TextInput
        style={styles.searchInput}
        placeholder="Search Pokémon by name"
        value={search}
        onChangeText={setSearch}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing"
        testID="pokemon-search-input"
      />
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
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          !loading && search.trim().length > 0 ? (
            <Text style={styles.errorText}>No Pokémon found with that name.</Text>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
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
