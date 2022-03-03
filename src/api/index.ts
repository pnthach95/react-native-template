import {create} from 'apisauce';

const baseURL = 'https://pokeapi.co/api/v2';

const API = create({baseURL});

/** Link cho API */
export const LINKS = {
  TEST: 'pokemon/ditto',
};

export default API;
