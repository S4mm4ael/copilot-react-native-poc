/**
 * Represents a Pokémon as returned by the PokeAPI /pokemon/{id} endpoint.
 */
export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      ['official-artwork']: {
        front_default: string | null;
      };
    };
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
}
