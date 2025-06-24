// INSTRUCTION FOR COPILOT:
// This screen displays detailed information about a single Pokémon.

// 1.  **Component Definition**: Create a functional component `PokemonDetailScreen`.
//     - It should use the `useRoute` hook from React Navigation to get the Pokémon name passed as a parameter.

// 2.  **State Management**:
//     - Use a custom hook `usePokemonDetail(pokemonName: string)` to fetch data.
//     - The hook will manage its own loading and error states for the detailed data.

// 3.  **UI Layout**:
//     - The screen should have a header with the Pokémon's name and ID.
//     - Display a large image of the Pokémon (use the 'official-artwork' sprite).
//     - Create sections for "Types", "Physical Stats" (Height & Weight), and "Base Stats".
//     - Display the Pokémon's types as styled badges.
//     - Display a short, descriptive text fetched from the species endpoint.
//     - Render base stats using a simple bar chart or progress bars.
//     - Handle loading and error states gracefully.

// 4.  **Navigation**: The header provided by the Stack Navigator will automatically have a back button.

// 5.  **Styling**: Use `StyleSheet.create`. The design should feel like a "Pokédex" entry card.