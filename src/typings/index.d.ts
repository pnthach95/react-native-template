type TRouteStates = 'SPLASH' | 'SIGN_IN' | 'MAIN';

type StoreState = {
  /** Tên route */
  routeState: TRouteStates;
};

type TPokemon = {
  abilities: {
    ability: TNameURL;
    is_hidden: boolean;
    slot: number;
  }[];
  base_experience: number;
  forms: TNameURL[];
  game_indices: {
    game_index: number;
    version: TNameURL;
  }[];
  height: number;
  held_items: {
    item: TNameURL;
    version_details: {
      rarity: number;
      version: TNameURL;
    }[];
  }[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: {
    move: TNameURL;
    version_group_details: {
      level_learned_at: number;
      move_learn_method: TNameURL;
      version_group: TNameURL;
    }[];
  }[];
  name: string;
  order: number;
  past_types: TPType[];
  species: TNameURL;
  sprites: TSprite & {
    other: Record<string, TSprite>;
    versions: Record<string, Record<string, TSprite & {animated?: TSprite}>>;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: TNameURL;
  }[];
  types: TPType[];
  weight: number;
};

type TNameURL = {
  name: string;
  url: string;
};

type TPType = {
  slot: number;
  type: TNameURL;
};

type TSprite = {
  back_default?: string;
  back_gray?: string;
  back_transparent?: string;
  front_default: string;
  front_gray?: string;
  front_transparent?: string;
  back_shiny?: string;
  back_shiny_transparent?: string;
  front_shiny?: string;
  front_shiny_transparent?: string;
  back_female?: string | null;
  back_shiny_female?: string | null;
  front_female?: string | null;
  front_shiny_female?: string | null;
};
