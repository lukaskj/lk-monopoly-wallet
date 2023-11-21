<script lang="ts">
  import type { Game } from "$lib/dto";
  import { onMount } from "svelte";
  import GamePasswordTrailButton from "../game-password-trail-button.svelte";
  import { loadingStore } from "$lib/stores/loading.store";

  export let param: Game;

  onMount(() => {
    if (!param) return;
  });

  function refreshGame() {
    loadingStore.set(true);
    location.reload();
  }
</script>

{#if param}
  <button class="btn btn-icon icon:refresh" on:click={refreshGame}> </button>
  {#if param.hasPassword}
    <GamePasswordTrailButton param={param.id} />
  {/if}
{/if}
