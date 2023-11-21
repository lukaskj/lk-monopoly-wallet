<script lang="ts">
  import type { PlayerBalance } from "$lib/dto";
  import { CurrencyFormatter } from "$lib/helpers/currency-formatter";
  import { fontColorFromBgColor } from "$lib/helpers/hex-to-luminance";

  export let player: PlayerBalance;
  export let selected: boolean = false;
  export let selectedIndex: number = 0;
  export let onSelect: (player: PlayerBalance) => void;
  export const clear: () => void = () => {
    selected = false;
    selectedIndex = 0;
  };

  function toggleSelected() {
    // selected = !selected;
    onSelect && onSelect(player);
  }

  const fontColorFromPlayerBgColor = fontColorFromBgColor(player.color ?? "#FFFFFF");
</script>

<div
  class="player-card {selected ? 'border-blue-600' : ''}"
  on:click={toggleSelected}
  on:keydown={toggleSelected}
  style="background-color: {player.color};"
  role="button"
  tabindex="0"
>
  {#if selectedIndex > 0}
    <span class="badge-icon variant-filled-warning absolute -top-0 -right-0 z-10">{selectedIndex}º</span>
  {/if}
  <header class="card-header font-bold" style="color: {fontColorFromPlayerBgColor};">{player.name}</header>
  <section class="pl-4 pr-4 pt-1 pb-1"></section>
  <footer class="card-footer flex justify-end items-center p-0">
    <button class="balance-button">
      {CurrencyFormatter.format(player.balance)}
    </button>
  </footer>
</div>

<style type="postcss">
  .player-card {
    max-width: 150px;
    min-width: 150px;
    min-height: 100px;

    @apply card relative max-w-xs border-2 rounded-lg flex flex-col justify-between;
  }

  .balance-button {
    @apply btn btn-sm variant-filled-tertiary w-full font-bold rounded-b-md text-lg select-none;
  }
</style>
