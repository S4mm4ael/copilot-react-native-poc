import { useEffect, useState } from 'react';
import { getPokemonList, PokemonListItem } from '../../api/pokemon';

/**
 * Custom hook to fetch and manage the Pokémon list.
 * @param limit Number of Pokémon to fetch per page.
 */
export function usePokemonList(limit: number = 20) {
  const [data, setData] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setError(null);
    getPokemonList(limit, offset)
      .then((res) => {
        setData((prev) => offset === 0 ? res.results : [...prev, ...res.results]);
        setHasMore(!!res.next);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setLoading(false);
      });
  }, [limit, offset]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setOffset((prev) => prev + limit);
    }
  };

  const refresh = () => {
    setOffset(0);
  };

  return { data, loading, error, loadMore, hasMore, refresh };
}
