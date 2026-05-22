export interface Game {
  id: number;
  name: string;
  favorite: boolean;
  studio: string;
  cover: string;
}

export interface SteamNewsResponse {
  appnews: {
    appid: number;
    newsitems: SteamNewsItem[];
    count: number;
  };
}

type SteamNewsItem = {
  gid: string;
  title: string;
  url: string;
  is_external_url: boolean;
  author: string;
  contents: string;
  feedlabel: string;
  date: number;
  feedname: string;
  feed_type: number;
  appid: number;
};

export interface PlayerSummaryResponse {
  response: {
    players: PlayerSummary[];
  };
}

type PlayerSummary = {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  avatarhash: string;
  lastlogoff: number;
  personastate: number;
  realname: string;
  primaryclanid: string;
  timecreated: number;
  gameid: number;
  personastateflags: number;
};

export interface OwnedGamesResponse {
  response: {
    game_count: number;
    games: OwnedGame[];
  };
}

type OwnedGame = {
  appid: number;
  name: string;
  playtime_forever: number;
  img_icon_url: string;
  has_community_visible_stats: boolean;
  playtime_windows_forever: number;
  playtime_mac_forever: number;
  playtime_linux_forever: number;
  playtime_deck_forever: number;
  rtime_last_played: number;
  content_descriptorids: number[];
  playtime_disconnected: number;
};

export interface RecentlyPlayedGamesResponse {
  response: {
    total_count: number;
    games: RecentlyPlayedGame[];
  };
}

type RecentlyPlayedGame = {
  appid: number;
  name: string;
  playtime_2weeks: number;
  playtime_forever: number;
  img_icon_url: string;
};

export interface FriendListResponse {
  friendslist: {
    friends: Friend[];
  };
}

type Friend = {
  steamid: string;
  relationship: string;
  friend_since: number;
};

export interface GameDetailResponse {
  type: string;
  name: string;
  steam_appid: number;
  required_age: number;
  is_free: boolean;
  controller_support: string;
  dlc: number[];
  detailed_description: string;
  about_the_game: string;
  short_description: string;
  supported_languages: string;
  reviews: string;
  header_image: string;
  capsule_image: string;
  capsule_imagev5: string;
  website: string;
  pc_requirements: {
    minimum: string;
    recommended: string;
  };
  mac_requirements: string[] | [];
  linux_requirements: string[] | [];
  legal_notice: string;
  developers: string[];
  publishers: string[];
  price_overview: {
    currency: string;
    initial: number;
    final: number;
    discount_percent: number;
    initial_formatted: string;
    final_formatted: string;
  };
  packages: number[];
  package_groups: {
    name: string;
    title: string;
    description: string;
    selection_text: string;
    save_text: string;
    display_type: number;
    is_recurring_subscription: string;
    subs: {
      packageid: number;
      percent_savings_text: string;
      percent_savings: number;
      option_text: string;
      option_description: string;
      can_get_free_license: string;
      is_free_license: boolean;
      price_in_cents_with_discount: number;
    }[];
  }[];
  platforms: {
    windows: boolean;
    mac: boolean;
    linux: boolean;
  };
  categories: {
    id: number;
    description: string;
  }[];
  genres: {
    id: string;
    description: string;
  }[];
  screenshots: {
    id: number;
    path_thumbnail: string;
    path_full: string;
  }[];
  movies: {
    id: number;
    name: string;
    thumbnail: string;
    webm: { 480: string; max: string };
    mp4: { 480: string; max: string };
    dash_webm?: string;
    dash_av1?: string;
    highlight: boolean;
  }[];
  recommendations: {
    total: number;
  };
  achievements: {
    total: number;
    highlighted?: {
      name: string;
      path: string;
    }[];
  };
  release_date: {
    coming_soon: boolean;
    date: string;
  };
  support_info: {
    url: string;
    email: string;
  };
  background: string;
  background_raw: string;
  content_descriptors: {
    ids: number[];
    notes: string | null;
  };
  ratings: Record<
    string,
    {
      rating: string;
      rating_generated?: string;
      required_age?: string;
      banned?: string;
      use_age_gate?: string;
      descriptors?: string;
    }
  >;
}

export interface SteamAppDetailResponse {
  success: boolean;
  data: GameDetailResponse;
}

type PlayerAchievement = {
  apiname: string;
  achieved: 0 | 1;
  unlocktime: number;
};

type PlayerStatsSuccess = {
  steamID: string;
  gameName: string;
  achievements: PlayerAchievement[];
  success: true;
};

type PlayerStatsError = {
  error: string;
  success: false;
};

export interface PlayerAchievementsResponse {
  playerstats: PlayerStatsSuccess | PlayerStatsError;
}
