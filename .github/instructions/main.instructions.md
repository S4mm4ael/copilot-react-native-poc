---
applyTo: '**'
---
## 1. Project Architecture: Feature-Based

All code is organized by feature, not by type. This keeps related logic, UI, and state hooks together.

**Master Folder Structure:**

## 2. TypeScript and Type Safety

**Strictness is mandatory.** Always define types for props, state, API responses, and navigation parameters.

-   **Global Types:** Store shared types (e.g., `User`, `Pokemon`) in `/src/types`.
-   **Local Types:** For types used only within a single component, define them directly in that component's file.
-   **TSDoc:** ALL exported functions, types, and hooks MUST have TSDoc comments.

**Copilot Prompt Example:**
`// Define a TypeScript interface for a 'Pokemon' based on the pokeapi.co/api/v2/pokemon/{id} response. It needs id, name, sprites (official-artwork), types, and stats.`

---

## 3. Navigation

We use **React Navigation** with a file-based, type-safe setup.

1.  **Type Definition (`RootStackParamList`):** All routes and their parameters MUST be defined in `/src/navigation/types.ts`.
2.  **Navigator Setup:** The main stack navigator lives in `/src/navigation/AppNavigator.tsx`.
3.  **Usage in Components:**
    -   Use the `useNavigation` hook with the specific navigator type: `useNavigation<NativeStackNavigationProp<RootStackParamList>>()`
    -   Use the `useRoute` hook for screen parameters.

**Copilot Prompt Example:**
`// In our RootStackParamList, add a 'PokemonDetail' route that requires a 'pokemonName' string parameter.`

---

## 4. State Management

Follow the principle of **lifting state only when necessary.**

1.  **Local State (`useState`, `useReducer`):** The default choice. Keep state within the component that needs it.
2.  **Feature State (Custom Hooks):** For logic shared across a few components within the *same feature*, encapsulate it in a custom hook (e.g., `usePokemonList.ts`). These hooks live within the feature folder.
3.  **Global State (`Zustand` or `React Context`):** For state that is truly global (e.g., authentication status, user theme), use a global state manager. The store/context will be defined in `/src/state`. **Avoid this unless absolutely necessary.**

**Copilot Prompt Example:**
`// Create a custom hook 'usePokemonDetail' that takes a pokemonName. It should manage loading, error, and data states, and fetch the pokemon details from our API service.`

---

## 5. Component & UI Design

-   **Dumb vs. Smart Components:** Screens are "smart" (they handle data fetching and logic). Components are "dumb" (they receive props and render UI).
-   **Feature Components:** Components used by only one feature belong in `/src/features/{feature-name}/components/`.
-   **Shared Components:** Only components used across *multiple* features belong in `/src/components/`.
-   **Styling:** Use `StyleSheet.create` for all styling. Define styles at the bottom of the component file. Use constants from `/src/constants` for colors and spacing to ensure consistency.
-   **Platform-Specific Code:** Use `Platform.select` for minor adjustments. For major differences, create separate `Component.ios.tsx` and `Component.android.tsx` files.

**Copilot Prompt Example:**
`// Create a reusable, shared 'StatBar' component in `/src/components`. It should accept a 'label' (string), a 'value' (number from 0-255), and a 'color' (string) as props. It should render a label and a progress-bar-style view.`

---

## 6. API Layer

All network requests must be abstracted into an API service layer in `/src/api`.

-   Never use `fetch` directly in a component or hook.
-   Create functions that map to specific API endpoints (e.g., `getPokemonList`, `getPokemonDetails`).
-   Handle request logic, error handling, and response parsing within the service.
-   The API service should return strongly-typed data.

**Copilot Prompt Example:**
`// Create an API service function 'getPokemonSpecies(name: string)' that fetches from the 'pokemon-species' endpoint and returns a promise resolving to our PokemonSpecies type. It should handle errors gracefully.`

---

## 7. General Instructions for Copilot

When prompting Copilot, be explicit and reference these principles.

-   **Start with the goal:** "Create a screen for..."
-   **Specify the location:** "...in `/src/features/pokemon-detail/`."
-   **Reference the architecture:** "...it should use the `usePokemonDetail` hook to fetch data."
-   **Describe the UI:** "...display the Pokémon's name, image, and a list of stats using the `StatBar` component."
-   **Demand Type Safety:** "Ensure all props are strongly typed."