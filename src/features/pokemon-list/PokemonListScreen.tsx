import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, RefreshControl, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTheme as useNavTheme } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { usePokemonList } from './usePokemonList';
import { useTheme } from '../../theme/useTheme';

/**
 * Screen for displaying a paginated list of Pokémon.
 * Uses usePokemonList hook for data and navigation to detail screen.
 * Now includes a search bar for filtering by name and theme support.
 */
const PokemonListScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { data, loading, error, loadMore, hasMore, refresh, search, setSearch } = usePokemonList(20);
  const { theme } = useTheme();
  const navTheme = useNavTheme();

  const renderItem = ({ item }: { item: { name: string } }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('PokemonDetail', { pokemonName: item.name })}
    >
      <Text style={[styles.itemText, { color: navTheme.colors.text }]}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: navTheme.colors.background }]}>
      <View style={styles.searchRow}>
        <TextInput
          style={[
            styles.searchInput,
            {
              backgroundColor: theme === 'dark' ? '#222' : '#fff',
              color: navTheme.colors.text,
              borderColor: theme === 'dark' ? '#444' : '#ccc',
            },
          ]}
          placeholder="Search Pokémon by name"
          placeholderTextColor={theme === 'dark' ? '#aaa' : '#888'}
          value={search}
          onChangeText={setSearch}
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
          testID="pokemon-search-input"
        />
        {search.trim().length > 1 && loading && (
          <ActivityIndicator size="small" style={styles.searchLoading} />
        )}
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
        onEndReached={hasMore ? loadMore : undefined}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl
            refreshing={loading && data.length === 0}
            onRefresh={refresh}
            tintColor={navTheme.colors.primary}
          />
        }
        ListFooterComponent={
          loading && data.length > 0 ? <ActivityIndicator style={{ margin: 16 }} /> : null
        }
        contentContainerStyle={data.length === 0 ? styles.centered : undefined}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          !loading && search.trim().length > 1 ? (
            <Text style={[styles.errorText, { color: navTheme.colors.text }]}>No Pokémon found with that name.</Text>
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
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchLoading: {
    marginLeft: 8,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  itemText: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
  errorText: {
    marginBottom: 16,
  },
});

export default PokemonListScreen;
