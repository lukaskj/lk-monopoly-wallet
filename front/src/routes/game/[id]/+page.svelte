<script lang="ts">
  import GameTransactions from "$lib/components/game/game-transactions.svelte";
  import PlayerBalanceCard from "$lib/components/game/player-balance-card.svelte";
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

  $: selectedPlayers = [] as PlayerBalance[];
  $: confirmEnabled = false;

  function onPlayerSelect(player: PlayerBalance, selected: boolean) {
    confirmEnabled = selectedPlayers.length > 0 && amount !== 0;
  }
  $: {
    confirmEnabled = selectedPlayers.length > 0 && amount !== 0;
  }

  async function onAmountConfirm(_amount: number) {
    const operation = Math.sign(amount);
    const realAmount = Math.abs(amount);
    const firstPlayer = selectedPlayers[0];
    if (firstPlayer && data.createPlayerTransaction) {
      await data.createPlayerTransaction(firstPlayer, realAmount, operation, "1234");
    }

    const secondPlayer = selectedPlayers[1];
    if (secondPlayer && data.createPlayerTransaction) {
      await data.createPlayerTransaction(secondPlayer, realAmount, operation * -1, "1234");
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
</script>

<div class="p-4 space-y-4">
  <PlayerBalancesContainer {players} {selectedPlayers} {onPlayerSelect} bind:clearSelection={clearPlayerSelections} />
  <TransactionKeyboard bind:value={amount} {confirmEnabled} onConfirm={onAmountConfirm} />
  <GameTransactions transactions={transactions.data} />
</div>
