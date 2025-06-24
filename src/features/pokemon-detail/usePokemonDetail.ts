import { useEffect, useState } from 'react';
import { getPokemonDetails } from '../../api/pokemon';
import { Pokemon } from '../../types/Pokemon';

/**
 * Custom hook to fetch and manage Pokémon detail state.
 * @param pokemonName The name of the Pokémon to fetch.
 * @returns Object containing data, loading, and error states.
 */
export function usePokemonDetail(pokemonName: string) {
  const [data, setData] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    getPokemonDetails(pokemonName)
      .then((pokemon) => {
        if (isMounted) {
          setData(pokemon);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [pokemonName]);

  return { data, loading, error };
}
