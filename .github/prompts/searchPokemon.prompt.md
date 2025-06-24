---
mode: ask
---
// INSTRUCTION FOR COPILOT:
// Refactor the `usePokemonList` custom hook to implement efficient, client-side filtering instead of API-based search.

// **Goal:** The search input should filter the currently displayed list of Pokémon on the client-side without making new API calls for each keystroke.

// **Refactoring Steps:**

// 1.  **Simplify API Fetching:**
//     - In the `fetchList` function, remove the entire `if (search.trim() !== '') { ... }` block.
//     - The `fetchList` function should now ONLY be responsible for fetching the paginated list using `getPokemonList` and appending results. It should no longer be dependent on the `search` state.
//     - Remove `search` from the `useCallback` dependency array for `fetchList`.

// 2.  **Separate Fetching from Searching:**
//     - Remove the `useEffect` that currently re-fetches when the `search` term changes. We no longer want to fetch from the API when the user types.

// 3.  **Introduce a Filtered State:**
//     - The hook already has a `data` state which acts as our master list of all fetched Pokémon.
//     - We need a new state to hold the list that will actually be displayed. Let's call it `filteredData`.
//     - `const [filteredData, setFilteredData] = useState<PokemonListItem[]>([]);`

// 4.  **Create the Filtering Logic:**
//     - Create a new `useEffect` hook that runs whenever the `search` term or the master `data` list changes. Its dependency array should be `[search, data]`.
//     - Inside this effect:
//       - If the `search` term is empty, set `filteredData` to be the same as the master `data` list.
//       - If the `search` term is not empty, filter the `data` array. The filter condition should be `item.name.toLowerCase().includes(search.toLowerCase())`.
//       - Update the `filteredData` state with the result of the filter.

// 5.  **Update the Return Value:**
//     - In the final return object of the hook, replace `data: data` with `data: filteredData`.
//     - The component consuming this hook will now receive the filtered list automatically, without any changes needed in the component itself.
//     - The rest of the return values (`loading`, `error`, `loadMore`, `search`, `setSearch`, etc.) remain the same.