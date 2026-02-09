import type { Router } from "vue-router";
import type { IRules } from "./types/IRules";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $filters: {
      imageUrl: (uuid: string) => string;
      date: (date: string) => string;
      dateTime: (date: string) => string;
    },
    $theme: {
      btnIcon: Record<string, unknown>;
      btn: Record<string, unknown>;
      avatar: Record<string, unknown>;
      menu: Record<string, unknown>;
      input: Record<string, unknown>;
      card: Record<string, unknown>;
    };
    $rules: IRules;
    $router: Router
  }
}
