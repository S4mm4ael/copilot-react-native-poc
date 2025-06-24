/**
 * Root stack parameter list for React Navigation.
 * Defines all routes and their parameters.
 */
export type RootStackParamList = {
  PokemonList: undefined;
  /**
   * Route for the Pokémon detail screen.
   * @param pokemonName - The name of the Pokémon to display.
   */
  PokemonDetail: { pokemonName: string };
};
