// INSTRUCTION FOR COPILOT:
// This file defines all the shared TypeScript types and interfaces related to Pokémon data.
// These types will be used across the application for strict type safety.

// 1. `PokemonListItem`: Represents a single Pokémon in a list.
//    - `name`: string
//    - `url`: string

// 2. `PokemonListResponse`: The structure of the response from the `/pokemon` endpoint.
//    - `count`: number
//    - `next`: string | null
//    - `previous`: string | null
//    - `results`: PokemonListItem[]

// 3. `Pokemon`: The main interface for detailed Pokémon information.
//    - `id`: number
//    - `name`: string
//    - `height`: number (in decimetres)
//    - `weight`: number (in hectograms)
//    - `sprites`: An object containing sprite URLs. We primarily need `front_default` and `other['official-artwork'].front_default`.
//    - `stats`: An array of objects, where each object has a `base_stat` (number) and a `stat` object with a `name` (string).
//    - `types`: An array of objects, where each object has a `type` object with a `name` (string).

// 4. `PokemonSpecies`: For the species endpoint to get descriptive text.
//    - `flavor_text_entries`: An array of objects. We need to find an entry where `language.name` is 'en' and get its `flavor_text`.