---
mode: ask
---

// INSTRUCTION FOR COPILOT:
// This file will contain the API service for interacting with the PokéAPI (pokeapi.co).
// Create an abstraction layer for fetching data. Use async/await and handle potential errors.

// 1. Define a base URL for the PokéAPI: `https://pokeapi.co/api/v2/`

// 2. Create a function `fetchFromAPI(endpoint: string)`:
//    - This will be a generic fetch wrapper.
//    - It should take an API endpoint string.
//    - It should handle the fetch request, check for a successful response (`response.ok`),
//      and parse the JSON.
//    - If the response is not ok, it should throw an error with a descriptive message.

// 3. Create a function `getPokemonList(limit: number = 20, offset: number = 0)`:
//    - This function should fetch a paginated list of Pokémon.
//    - It should use the `fetchFromAPI` helper.
//    - It should return a promise that resolves to the data structure defined in `PokemonListResponse` from our types file.

// 4. Create a function `getPokemonDetails(name: string)`:
//    - This function should fetch detailed information for a single Pokémon by its name or ID.
//    - It should use the `fetchFromAPI` helper.
//    - It should return a promise that resolves to the `Pokemon` type.

// 5. Create a function `getPokemonSpecies(name: string)`:
//    - This function fetches the species data for a Pokémon to get its description.
//    - It will be used on the detail screen.
//    - It should return a promise that resolves to the `PokemonSpecies` type.