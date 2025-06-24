import { useEffect, useState, useCallback, useRef } from 'react';
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
 * Custom hook to fetch and manage a paginated list of Pokémon, with throttled search support.
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
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  // Throttled search effect
  useEffect(() => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    // Only search after 2+ characters, otherwise show paginated list
    if (search.trim().length > 1) {
      setLoading(true);
      setError(null);
      searchTimeout.current = setTimeout(async () => {
        try {
          const result = await searchPokemon(search.trim());
          if (result) {
            setData([result]);
            setHasMore(false);
            setError(null);
          } else {
            setData([]);
            setHasMore(false);
            setError('No Pokémon found with that name.');
          }
        } catch (err) {
          setData([]);
          setHasMore(false);
          setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
          setLoading(false);
        }
      }, 400); // 400ms throttle
    } else {
      // Reset to paginated list if search is cleared or too short
      setOffset(0);
      setError(null);
      setLoading(true);
      searchTimeout.current = setTimeout(async () => {
        try {
          const res = await getPokemonList(limit, 0);
          setData(res.results);
          setHasMore(Boolean(res.next));
        } catch (err) {
          setData([]);
          setHasMore(false);
          setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
          setLoading(false);
        }
      }, 200); // small delay for UX consistency
    }

    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, limit]);

  // Pagination effect (only when not searching)
  useEffect(() => {
    if (search.trim().length > 1 || offset === 0) return;
    setLoading(true);
    setError(null);
    getPokemonList(limit, offset)
      .then((res) => {
        setData((prev) => (offset === 0 ? res.results : [...prev, ...res.results]));
        setHasMore(Boolean(res.next));
      })
      .catch((err) => {
        setData([]);
        setHasMore(false);
        setError(err instanceof Error ? err.message : 'Unknown error');
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, limit]);

  /**
   * Loads the next page of Pokémon, if available.
   */
  const loadMore = useCallback(() => {
    if (hasMore && !loading && search.trim().length <= 1) {
      setOffset((prev) => prev + limit);
    }
  }, [hasMore, loading, limit, search]);

  /**
   * Refreshes the Pokémon list, resetting pagination.
   */
  const refresh = useCallback(() => {
    setOffset(0);
    setSearch('');
  }, []);

  return { data, loading, error, loadMore, hasMore, refresh, search, setSearch };
}
