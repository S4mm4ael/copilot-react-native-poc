# Pokémon App: An AI-Assisted Development Showcase

![screenshot-1](https://github.com/user-attachments/assets/bb05658d-9786-4bcd-ac6c-a5fa688e3c3e)

This project is a proof-of-concept React Native (Expo) application demonstrating a scalable and maintainable approach to mobile development. It is a simple Pokédex that interacts with the public PokéAPI.

---

https://github.com/user-attachments/assets/46b5bb38-4e8c-4d44-8c7b-ffcbbae3837f

[android-demo.webm](https://github.com/user-attachments/assets/f38deca0-9139-47ac-ba73-c032b7468e2c)


## Development Process

- **AI-Powered:** This entire application was built from scratch in approximately 3 hours.
- **Tooling:** Development was driven by a conversational workflow using Google's Gemini within the Cursor editor.
- **Open Prompts:** The complete set of prompts, instructions, and architectural guidelines given to the AI are available in the `.github` folder to provide full transparency into the development process.

---

## Technical Highlights

- **Framework:** React Native with Expo
- **Language:** TypeScript
- **Navigation:** React Navigation with a type-safe stack navigator.
- **State Management:** Local state is managed with custom hooks (`usePokemonList`, `usePokemonDetail`), while global state (theme, language) is handled via the React Context API.
- **UI:** Includes support for light/dark themes and internationalization (EN/BY).
- **Architecture:** Follows a feature-based directory structure to promote code encapsulation
