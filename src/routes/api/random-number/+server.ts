import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = ({ url }) => {
  const min = Number(url.searchParams.get("min") ?? "0");
  const max = Number(url.searchParams.get("max") ?? "1");

  const d = max - min;

  if (isNaN(d) || d < 0) {
    error(400, "Invalid min and max values");
  }

  const random = min + Math.random() * d;
  return new Response(String(random));
};
