<script lang="ts">
  import type { Game } from "$lib/dto";

  export let game: Game;
</script>

<div class="card card-hover block">
  <header class="card-header font-bold">{game.name}</header>
  <!-- <section class="p-4">(content)</section> -->
  <footer class="card-footer text-sm italic">Data: {game.createdAt}</footer>
</div>
