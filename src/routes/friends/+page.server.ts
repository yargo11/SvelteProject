import { MY_STEAM_ID } from "$env/static/private";
import type { PageServerLoad } from "../$types";
import { getFriendList } from "../../lib/services/steam.service";

export const load: PageServerLoad = async () => {
  const friendList = await getFriendList(MY_STEAM_ID);

  return { friendList };
};
