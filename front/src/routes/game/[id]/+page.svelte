<script lang="ts">
  import GameTransactions from "$lib/components/game/game-transactions.svelte";
  import PlayerBalancesContainer from "$lib/components/game/player-balances-container.svelte";
  import TransactionKeyboard from "$lib/components/game/transaction-keyboard.svelte";
  import { layoutTitleStore } from "$lib/stores/layout-title.store";
  import type { PageData } from "./$types";
  import type { TGameData } from "./types";

  export let data: PageData;
  let { game, players, transactions } = data.gameData as TGameData;
  layoutTitleStore.set(game.name);
</script>

<div class="p-4 space-y-4">
  <PlayerBalancesContainer {players} />
  <TransactionKeyboard />
  <GameTransactions transactions={transactions.data} />
</div>
