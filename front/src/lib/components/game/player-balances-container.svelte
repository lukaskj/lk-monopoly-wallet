<script lang="ts">
  import type { PlayerBalance } from "$lib/dto";
  import PlayerBalanceCard from "./player-balance-card.svelte";

  export let players: PlayerBalance[];
  export let selectedPlayers: PlayerBalance[] = [];

  let selectedIndexes: number[] = [];

  function onPlayerSelect(player: PlayerBalance, selected: boolean) {
    let playerIndex = selectedPlayers.findIndex((p) => p.id === player.id);
    if (playerIndex >= 0) {
      if (!selected) {
        selectedPlayers.splice(playerIndex, 1);
      }
    } else {
      if (selected) {
        selectedPlayers.push(player);
      }
    }

    selectedIndexes = selectedPlayers.map((i) => i.id);
  }
</script>

<div class="flex flex-row p-4 space-x-2 justify-between flex-wrap">
  {#each players as player}
    <PlayerBalanceCard {player} onSelect={onPlayerSelect} selectedIndex={selectedIndexes.indexOf(player.id) + 1} />
  {/each}
</div>
