import { useEffect, useState, useCallback } from 'react';
import { getPokemonList, searchPokemon, PokemonListItem } from '../../api/pokemon';

/**
 * Represents the state returned by usePokemonList.
 */
interface UsePokemonListResult {
  data: PokemonListItem[];
  loading: boolean;
  error: string | null;
  loadMore: () => void;
  hasMore: boolean;
  refresh: () => void;
  search: string;
  setSearch: (value: string) => void;
}

/**
 * Custom hook to fetch and manage a paginated list of Pokémon, with search support.
 * Handles loading, error, pagination, refresh, and search logic.
 * @param limit Number of Pokémon to fetch per page.
 * @returns State and actions for the Pokémon list.
 */
export function usePokemonList(limit: number = 20): UsePokemonListResult {
  const [data, setData] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');

  const fetchList = useCallback(
    async (reset = false) => {
      setLoading(true);
      setError(null);
      try {
        if (search.trim().length > 0) {
          // Search mode: fetch by name using searchPokemon API
          const result = await searchPokemon(search.trim());
          if (result) {
            setData([result]);
            setHasMore(false);
          } else {
            setData([]);
            setHasMore(false);
            setError('No Pokémon found with that name.');
          }
        } else {
          // Regular paginated list
          const res = await getPokemonList(limit, reset ? 0 : offset);
          setData(prev =>
            reset ? res.results : [...prev, ...res.results]
          );
          setHasMore(Boolean(res.next));
        }
      } catch (err) {
        setData([]);
        setHasMore(false);
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    },
    [limit, offset, search]
  );

  useEffect(() => {
    fetchList(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  useEffect(() => {
    if (!search) {
      fetchList(offset === 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, limit]);

  /**
   * Loads the next page of Pokémon, if available.
   */
  const loadMore = useCallback(() => {
    if (hasMore && !loading && !search) {
      setOffset(prev => prev + limit);
    }
  }, [hasMore, loading, limit, search]);

  /**
   * Refreshes the Pokémon list, resetting pagination.
   */
  const refresh = useCallback(() => {
    setOffset(0);
    fetchList(true);
  }, [fetchList]);

  return { data, loading, error, loadMore, hasMore, refresh, search, setSearch };
}
