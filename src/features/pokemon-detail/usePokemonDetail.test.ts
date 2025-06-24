import { renderHook, act } from '@testing-library/react-native';
import { usePokemonDetail } from './usePokemonDetail';
import * as api from '../../api/pokemon';
import { Pokemon } from '../../types/Pokemon';

const mockPokemon: Pokemon = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    other: {
      'official-artwork': {
        front_default: 'https://example.com/bulbasaur.png',
      },
    },
  },
  types: [
    {
      slot: 1,
      type: { name: 'grass', url: 'https://pokeapi.co/api/v2/type/12/' },
    },
    {
      slot: 2,
      type: { name: 'poison', url: 'https://pokeapi.co/api/v2/type/4/' },
    },
  ],
  stats: [
    {
      base_stat: 45,
      effort: 0,
      stat: { name: 'hp', url: 'https://pokeapi.co/api/v2/stat/1/' },
    },
    {
      base_stat: 49,
      effort: 0,
      stat: { name: 'attack', url: 'https://pokeapi.co/api/v2/stat/2/' },
    },
  ],
};

describe('usePokemonDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and returns pokemon detail', async () => {
    jest.spyOn(api, 'getPokemonDetails').mockResolvedValue(mockPokemon);

    const { result } = renderHook(() => usePokemonDetail('bulbasaur'));
    // Wait for loading to finish
    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockPokemon);
    expect(result.current.error).toBeNull();
  });

  it('handles API errors', async () => {
    jest.spyOn(api, 'getPokemonDetails').mockRejectedValue(new Error('API error'));

    const { result } = renderHook(() => usePokemonDetail('bulbasaur'));
    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe('API error');
  });

  it('updates when pokemonName changes', async () => {
    jest.spyOn(api, 'getPokemonDetails')
      .mockResolvedValueOnce(mockPokemon)
      .mockResolvedValueOnce({ ...mockPokemon, name: 'ivysaur', id: 2 });

    const { result, rerender } = renderHook(
      ({ name }) => usePokemonDetail(name),
      { initialProps: { name: 'bulbasaur' } }
    );
    await act(async () => {});

    expect(result.current.data?.name).toBe('bulbasaur');

    rerender({ name: 'ivysaur' });
    await act(async () => {});

    expect(result.current.data?.name).toBe('ivysaur');
  });
});
