import { useEffect, useState, useCallback } from 'react';
import { getPokemonList, PokemonListItem } from '../../api/pokemon';

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
}

/**
 * Custom hook to fetch and manage a paginated list of Pokémon.
 * Handles loading, error, pagination, and refresh logic.
 * @param limit Number of Pokémon to fetch per page.
 * @returns State and actions for the Pokémon list.
 */
export function usePokemonList(limit: number = 20): UsePokemonListResult {
  const [data, setData] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchList = useCallback(
    async (reset = false) => {
      setLoading(true);
      setError(null);
      try {
        const res = await getPokemonList(limit, reset ? 0 : offset);
        setData(prev =>
          reset ? res.results : [...prev, ...res.results]
        );
        setHasMore(Boolean(res.next));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    },
    [limit, offset]
  );

  useEffect(() => {
    fetchList(offset === 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset, limit]);

  /**
   * Loads the next page of Pokémon, if available.
   */
  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      setOffset(prev => prev + limit);
    }
  }, [hasMore, loading, limit]);

  /**
   * Refreshes the Pokémon list, resetting pagination.
   */
  const refresh = useCallback(() => {
    setOffset(0);
  }, []);

  return { data, loading, error, loadMore, hasMore, refresh };
}
