import { getPokemonList, getPokemonDetails } from './pokemon';

async function testApi() {
  try {
    // Test fetching a list of Pokémon
    const list = await getPokemonList(5, 0);
    console.log('Pokemon List:', list);

    // Test fetching details for the first Pokémon in the list
    if (list.results.length > 0) {
      const firstName = list.results[0].name;
      const details = await getPokemonDetails(firstName);
      console.log(`Details for ${firstName}:`, details);
    }
  } catch (error) {
    console.error('API Test Error:', error);
  }
}

testApi();
