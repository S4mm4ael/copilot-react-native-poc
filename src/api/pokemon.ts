import { Pokemon } from '../types/Pokemon';

/**
 * Represents a single item in the Pokémon list response.
 */
export interface PokemonListItem {
  name: string;
  url: string;
}

/**
 * Represents the response from the PokeAPI /pokemon endpoint.
 */
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

/**
 * Fetches a paginated list of Pokémon.
 * @param limit Number of Pokémon to fetch.
 * @param offset Offset for pagination.
 * @returns Promise resolving to a list of Pokémon.
 */
export async function getPokemonList(
  limit: number = 20,
  offset: number = 0
): Promise<PokemonListResponse> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon list');
    }
    return (await response.json()) as PokemonListResponse;
  } catch (error) {
    // Optionally log error
    throw error;
  }
}

/**
 * Fetches detailed information about a specific Pokémon by name or ID.
 * @param nameOrId The Pokémon's name or ID.
 * @returns Promise resolving to a Pokemon object.
 */
export async function getPokemonDetails(
  nameOrId: string | number
): Promise<Pokemon> {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nameOrId}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon details');
    }
    return (await response.json()) as Pokemon;
  } catch (error) {
    // Optionally log error
    throw error;
  }
}

/**
 * Fetches a Pokémon by name or ID and maps it to a PokemonListItem.
 * @param search Name or ID of the Pokémon to search.
 * @returns Promise resolving to a PokemonListItem or null if not found.
 */
export async function searchPokemon(
  search: string
): Promise<PokemonListItem | null> {
  try {
    const pokemon = await getPokemonDetails(search.trim().toLowerCase());
    return {
      name: pokemon.name,
      url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
    };
  } catch (error: any) {
    // Only return null for 404 (not found), otherwise rethrow
    if (error instanceof Error && 'message' in error && error.message.includes('Failed to fetch Pokémon details')) {
      return null;
    }
    throw error;
  }
}
