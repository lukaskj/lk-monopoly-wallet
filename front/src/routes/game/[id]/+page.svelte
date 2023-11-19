<script lang="ts">
  import GameTransactions from "$lib/components/game/game-transactions.svelte";
  import { layoutTitleStore } from "$lib/stores/layout-title.store";
  import type { PageData } from "./$types";
  import type { TGameData } from "./types";

  export let data: PageData;
  let { game, players, transactions } = data.gameData as TGameData;
  layoutTitleStore.set(game.name);
</script>

<GameTransactions transactions={transactions.data} />
