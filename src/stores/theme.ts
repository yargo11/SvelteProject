import { writable } from "svelte/store";

type Theme = "light" | "dark";

function customeThemeStore(theme: string) {
  const { subscribe, set, update } = writable<Theme>("dark");

  function toggleTheme() {
    update((theme) => {
      return theme === "light" ? "dark" : "light";
    });
  }

  function resetTheme() {
    set("dark");
  }

  return { subscribe, toggleTheme, resetTheme };
}

export const theme = customeThemeStore("light");
