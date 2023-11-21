<script lang="ts">
  import { gamePasswordStore } from "$lib/stores/game-password.store";

  export let param: number;

  function promptPassword() {
    const pass = prompt("Senha", $gamePasswordStore[param] ?? "");
    $gamePasswordStore[param] = pass ?? "";
  }
</script>

<button
  class="btn btn-icon {$gamePasswordStore[param] ? 'icon-lock-check' : 'icon:lock-alert'}"
  on:click={promptPassword}
>
</button>

<style type="postcss">
  .icon-lock-check {
    @apply text-success-500-400-token;
  }
</style>