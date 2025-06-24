import { renderHook, act } from '@testing-library/react-native';
import { usePokemonList } from './usePokemonList';
import * as api from '../../api/pokemon';

const mockResults = [
  { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
];

describe('usePokemonList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and returns pokemon list', async () => {
    jest.spyOn(api, 'getPokemonList').mockResolvedValue({
      count: 2,
      next: null,
      previous: null,
      results: mockResults,
    });

    const { result } = renderHook(() => usePokemonList(2));
    // Wait for loading to finish
    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockResults);
    expect(result.current.error).toBeNull();
    expect(result.current.hasMore).toBe(false);
  });

  it('handles API errors', async () => {
    jest.spyOn(api, 'getPokemonList').mockRejectedValue(new Error('API error'));

    const { result } = renderHook(() => usePokemonList(2));
    await act(async () => {});

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual([]);
    expect(result.current.error).toBe('API error');
  });

  it('loads more data when loadMore is called', async () => {
    const getPokemonList = jest.spyOn(api, 'getPokemonList');
    getPokemonList.mockResolvedValueOnce({
      count: 4,
      next: 'next-url',
      previous: null,
      results: mockResults,
    });
    getPokemonList.mockResolvedValueOnce({
      count: 4,
      next: null,
      previous: 'prev-url',
      results: [
        { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
        { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      ],
    });

    const { result } = renderHook(() => usePokemonList(2));
    await act(async () => {});

    act(() => {
      result.current.loadMore();
    });
    await act(async () => {});

    expect(result.current.data).toHaveLength(4);
    expect(result.current.data[2].name).toBe('venusaur');
    expect(result.current.hasMore).toBe(false);
  });

  it('refresh resets the list', async () => {
    jest.spyOn(api, 'getPokemonList').mockResolvedValue({
      count: 2,
      next: null,
      previous: null,
      results: mockResults,
    });

    const { result } = renderHook(() => usePokemonList(2));
    await act(async () => {});

    act(() => {
      result.current.refresh();
    });
    await act(async () => {});

    expect(result.current.data).toEqual(mockResults);
  });
});
       

