<script lang="ts">
  import type { Game } from "$lib/dto";
  import { DateFormatter } from "$lib/helpers/date-formatter";

  export let game: Game;
</script>

<div class="card card-hover block">
  <header class="card-header font-bold">{game.name}</header>
  <section class="pl-4 pr-4 pt-1 pb-1">
    <div>Jogardores: {game.players.map((g) => g.name).join(", ")}</div>
    <div class="text-sm italic">Data: {DateFormatter.formatFull(game.createdAt)}</div>
  </section>
  <footer class="card-footer flex justify-end items-center space-x-4 p-0">
    <a class="btn btn-sm variant-filled-tertiary w-full" href={`/game/${game.id}`}>Ver</a>
  </footer>
</div>
