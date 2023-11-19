<script lang="ts">
  import GameTransactions from "$lib/components/game/game-transactions.svelte";
  import PlayerBalancesContainer from "$lib/components/game/player-balances-container.svelte";
  import TransactionKeyboard from "$lib/components/game/transaction-keyboard.svelte";
  import type { PlayerBalance } from "$lib/dto";
  import { layoutTitleStore } from "$lib/stores/layout-title.store";
  import { loadingStore } from "$lib/stores/loading.store";
  import type { PageData } from "./$types";
  import type { TGameData } from "./types";

  export let data: PageData;
  let { game, players, transactions } = data.gameData as TGameData;
  layoutTitleStore.set(game.name);

  let amount = 0;

  $: selectedPlayers = [];
  $: confirmEnabled = false;

  function onPlayerSelect(player: PlayerBalance, selected: boolean) {
    confirmEnabled = selectedPlayers.length > 0 && amount !== 0;
  }
  $: {
    confirmEnabled = selectedPlayers.length > 0 && amount !== 0;
  }

  async function onAmountConfirm(_amount: number) {
    loadingStore.set(true);
    if (data.getBalance) {
      players = await data.getBalance(data.id);
    }

    if (data.getTransactions) {
      transactions = await data.getTransactions(data.id);
    }
    amount = 0;
    selectedPlayers = [];

    clearPlayerSelections && clearPlayerSelections();
  }

  let clearPlayerSelections: () => void;
</script>

<div class="p-4 space-y-4">
  <PlayerBalancesContainer {players} {selectedPlayers} {onPlayerSelect} bind:clearSelection={clearPlayerSelections} />
  <TransactionKeyboard bind:value={amount} {confirmEnabled} onConfirm={onAmountConfirm} />
  <GameTransactions transactions={transactions.data} />
</div>
