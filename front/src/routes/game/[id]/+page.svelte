<script lang="ts">
  import GameTransactions from "$lib/components/game/game-transactions.svelte";
  import PlayerBalancesContainer from "$lib/components/game/player-balances-container.svelte";
  import TransactionKeyboard from "$lib/components/game/transaction-keyboard.svelte";
  import GamePasswordTrailButton from "$lib/components/layout/appbar-trail/game-password-trail-button.svelte";
  import type { PlayerBalance } from "$lib/dto";
  import { appbarTrailParamsStore, appbarTrailStore } from "$lib/stores/appbar-trail.store";
  import { layoutTitleStore } from "$lib/stores/layout-title.store";
  import { loadingStore } from "$lib/stores/loading.store";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import type { TGameData } from "./types";
  import { gamePasswordStore } from "$lib/stores/game-password.store";

  export let data: PageData;
  let { game, players, transactions } = data.gameData as TGameData;
  layoutTitleStore.set(game.name);

  let amount = 0;

  $: selectedPlayers = [] as PlayerBalance[];
  $: confirmEnabled = false;

  function onPlayerSelect(player: PlayerBalance, selected: boolean) {
    confirmEnabled = selectedPlayers.length > 0 && amount !== 0;
  }
  $: {
    confirmEnabled = selectedPlayers.length > 0 && amount !== 0;
  }

  async function onAmountConfirm(_amount: number) {
    let operation = Math.sign(amount);
    const realAmount = Math.abs(amount);
    if (selectedPlayers.length === 2) {
      operation = -1;
    }
    const firstPlayer = selectedPlayers[0];
    if (firstPlayer && data.createPlayerTransaction) {
      await data.createPlayerTransaction(firstPlayer, realAmount, operation, $gamePasswordStore[game.id]);
    }

    const secondPlayer = selectedPlayers[1];
    if (secondPlayer && data.createPlayerTransaction) {
      await data.createPlayerTransaction(secondPlayer, realAmount, operation * -1, $gamePasswordStore[game.id]);
    }

    reloadData();
    clearPlayerSelections && clearPlayerSelections();
  }

  async function reloadData() {
    loadingStore.set(true);
    if (data.getBalance) {
      players = await data.getBalance(data.id);
    }

    if (data.getTransactions) {
      transactions = await data.getTransactions(data.id);
    }
    amount = 0;
    selectedPlayers = [];
  }

  let clearPlayerSelections: () => void;

  onMount(() => {
    if (game.hasPassword) {
      appbarTrailStore.set(GamePasswordTrailButton);
      appbarTrailParamsStore.set(game.id);
    } else {
      appbarTrailStore.set(null);
      appbarTrailParamsStore.set(null);
    }
  });
</script>

<div class="p-4 space-y-4">
  <PlayerBalancesContainer {players} {selectedPlayers} {onPlayerSelect} bind:clearSelection={clearPlayerSelections} />
  {#if !game.hasPassword || (game.hasPassword && $gamePasswordStore[game.id])}
    <TransactionKeyboard bind:value={amount} {confirmEnabled} onConfirm={onAmountConfirm} />
  {/if}
  <GameTransactions transactions={transactions.data} />
</div>
