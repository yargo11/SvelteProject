import { MY_STEAM_ID } from "$env/static/private";
import type { PageServerLoad } from "../$types";
import { getFriendList } from "$lib/services";

export const load: PageServerLoad = async () => {
  try {
    const friendList = await getFriendList(MY_STEAM_ID);
    return { friendList, error: null };
  } catch {
    return {
      friendList: [],
      error: "Não foi possível carregar a lista de amigos.",
    };
  }
};
