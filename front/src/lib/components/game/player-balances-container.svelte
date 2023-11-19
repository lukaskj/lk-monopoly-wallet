<script lang="ts">
  import type { PlayerBalance } from "$lib/dto";
  import PlayerBalanceCard from "./player-balance-card.svelte";

  export let players: PlayerBalance[];
  export let selectedPlayers: PlayerBalance[] = [];
  export let onPlayerSelect: (player: PlayerBalance, selected: boolean) => void = () => {};
  export const clearSelection = () => {
    for (const p of selectedPlayers) {
      _onPlayerSelect(p, false);
    }
    selectedIndexes = [];
    const clearChildSelections = Object.values(_clearChildSelection);
    for (const c of clearChildSelections) {
      c && c();
    }
  };

  $: selectedIndexes = [] as number[];

  function _onPlayerSelect(player: PlayerBalance, selected: boolean) {
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

    onPlayerSelect && onPlayerSelect(player, selected);
  }
  $: {
    selectedIndexes;
  }

  let _clearChildSelection: { [key: number]: () => void } = {};
</script>

<div class="flex flex-row space-x-2 justify-between flex-wrap select-none">
  {#each players as player}
    <PlayerBalanceCard
      {player}
      onSelect={_onPlayerSelect}
      selectedIndex={selectedIndexes.indexOf(player.id) + 1}
      bind:clear={_clearChildSelection[player.id]}
    />
  {/each}
</div>
