import { pathOr } from 'ramda';

const getPokemons = state => pathOr([], ['feed', 'pokemons'], state);

const selectors = {
  getPokemons,
};

export default selectors;
