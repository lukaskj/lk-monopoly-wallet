<script lang="ts">
  import { goto } from "$app/navigation";

  export let param: any = null;
  param;

  function gotoNewGame() {
    goto("/game/new");
  }
</script>

<button class="btn btn-icon icon:plus-box-outline" on:click={gotoNewGame}> </button>
