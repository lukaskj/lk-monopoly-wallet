<script lang="ts">
  import type { PlayerBalance } from "$lib/dto";
  import { isNullOrUndefined } from "$lib/helpers/is-null-or-undefined";
  import PlayerBalanceCard from "./player-balance-card.svelte";

  export let players: PlayerBalance[];
  export let selectedPlayers: PlayerBalance[] = [];
  export let onPlayerSelect: (player: PlayerBalance, selected: boolean) => void = () => {};
  export const clearSelection = () => {
    selectedTemp.clear();
    selectedIndexes = [];
  };

  $: selectedIndexes = [] as number[];
  $: selectedTemp = new Map<number, PlayerBalance>();

  function _onPlayerSelect(player: PlayerBalance) {
    const selected2 = selectedTemp.has(player.id);

    if (selected2) {
      selectedTemp.delete(player.id);
    } else {
      if (selectedTemp.size >= 2) {
        const lastPlayer = Array.from(selectedTemp.values()).pop();
        if (lastPlayer) selectedTemp.delete(lastPlayer.id);
      }
      selectedTemp.set(player.id, player);
    }

    selectedPlayers = Array.from(selectedTemp.values());
    selectedIndexes = selectedPlayers.map((i) => i.id);

    onPlayerSelect && onPlayerSelect(player, !selected2);
  }
  $: {
    selectedIndexes;
  }

  // let _clearChildSelection: { [key: number]: () => void } = {};
</script>

<div class="flex flex-row gap-4 justify-between flex-wrap select-none">
  {#each players as player}
    <PlayerBalanceCard
      {player}
      selected={selectedIndexes.indexOf(player.id) >= 0}
      onSelect={_onPlayerSelect}
      selectedIndex={selectedIndexes.indexOf(player.id) + 1}
    />
  {/each}
</div>
