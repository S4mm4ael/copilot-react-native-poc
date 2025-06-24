// INSTRUCTION FOR COPILOT:
// Create a custom hook named `usePokemonList` to encapsulate the logic for fetching and managing the list of Pokémon.

// 1.  **State**:
//     - `pokemon`: An array to hold the list of all fetched Pokémon.
//     - `filteredPokemon`: An array to hold the Pokémon after applying the search filter.
//     - `isLoading`: A boolean for the initial loading state.
//     - `isFetchingNextPage`: A boolean for pagination loading state.
//     - `error`: An object to hold any fetch errors.
//     - `searchTerm`: A string to hold the current search input.
//     - `nextUrl`: A string or null to hold the URL for the next page of results.

// 2.  **Functions**:
//     - `fetchPokemon`: The main function to fetch the initial list. It should call `getPokemonList` from the API service.
//     - `fetchNextPage`: A function to fetch the next page of Pokémon using the `nextUrl`.
//     - `handleSearch`: A function that takes a text input and updates the `searchTerm` state.

// 3.  **Effects**:
//     - A `useEffect` to trigger the initial data fetch when the hook is first used.
//     - A `useEffect` that filters the `pokemon` array whenever `searchTerm` or `pokemon` changes, updating `filteredPokemon`.

// 4.  **Return Value**:
//     - The hook should return an object containing all the states and functions needed by the `PokemonListScreen` component.
//     - e.g., `{ filteredPokemon, isLoading, error, searchTerm, handleSearch, fetchNextPage, isFetchingNextPage }`