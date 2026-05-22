import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  if (params.slug === "tomtom") {
    return {
      title: "Hello Tomtom",
      content: "Welcome to our blog.",
    };
  }

  error(404, "Not Found");
};
