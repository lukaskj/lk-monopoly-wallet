<script lang="ts">
  import { layoutTitleStore } from "$lib/stores/layout-title.store";
  import type { PageData } from "./$types";
  import type { TGameData } from "./types";

  export let data: PageData;
  let { game, players, transactions } = data.gameData as TGameData;
  layoutTitleStore.set(game.name);
  console.log("AAAAAAAAAAA", players, transactions);
</script>
