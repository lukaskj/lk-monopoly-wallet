<script lang="ts">
  import GameTransactions from "$lib/components/game/game-transactions.svelte";
  import PlayerBalancesContainer from "$lib/components/game/player-balances-container.svelte";
  import TransactionKeyboard from "$lib/components/game/transaction-keyboard.svelte";
  import GameTrailButtons from "$lib/components/layout/appbar-trail/game/game-trail-buttons.svelte";
  import type { PlayerBalance } from "$lib/dto";
  import { appbarTrailParamsStore, appbarTrailStore } from "$lib/stores/appbar-trail.store";
  import { gamePasswordStore } from "$lib/stores/game-password.store";
  import { layoutTitleStore } from "$lib/stores/layout-title.store";
  import { loadingStore } from "$lib/stores/loading.store";
  import { onDestroy, onMount } from "svelte";
  import type { PageData } from "./$types";
  import type { TGameData } from "./types";

  export let data: PageData;
  let { game, players, transactions } = data.gameData as TGameData;

  let amount = 0;
  let clearPlayerSelections: () => void;

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
    amount = 0;
    selectedPlayers = [];
  }

  async function reloadData() {
    if (data.getBalance) {
      players = await data.getBalance(data.id);
    }

    if (data.getTransactions) {
      transactions = await data.getTransactions(data.id);
    }
  }

  async function endGame() {
    const response = confirm("Deseja mesmo finalizar esse jogo?");
    if (response && data.endGame) {
      await data.endGame(game.id, $gamePasswordStore[game.id]);
    }
  }

  let updateLoopId: NodeJS.Timeout | null = null;

  function startUpdateLoop() {
    updateLoopId = setInterval(() => {
      if (!hasPassword) {
        reloadData();
      }
    }, 3000);
  }

  onMount(() => {
    layoutTitleStore.set(game.name);
    appbarTrailStore.set(GameTrailButtons);
    appbarTrailParamsStore.set(game);

    startUpdateLoop();
  });

  onDestroy(() => {
    updateLoopId && clearInterval(updateLoopId);
  });

  $: hasPassword = !game.hasPassword || (game.hasPassword && $gamePasswordStore[game.id]);
</script>

<div class="flex flex-col h-full justify-between">
  <div class="space-y-4">
    <PlayerBalancesContainer
      {players}
      bind:selectedPlayers
      {onPlayerSelect}
      bind:clearSelection={clearPlayerSelections}
    />
    {#if hasPassword}
      <TransactionKeyboard bind:value={amount} {confirmEnabled} onConfirm={onAmountConfirm} />
    {/if}
    <GameTransactions transactions={transactions.data} />
  </div>
  {#if hasPassword}
    <div>
      <button class="btn w-full variant-filled-error mt-8" on:click={endGame}>Finalizar</button>
    </div>
  {/if}
</div>
