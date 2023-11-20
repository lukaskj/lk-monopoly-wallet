<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Game, Player } from "$lib/dto";
  import { isNullOrEmptyOrUndefined } from "$lib/helpers/is-null-or-undefined";
  import { randomColor } from "$lib/helpers/random-color";
  import { Notification } from "$lib/notification";
  import { ApiProxy } from "$lib/request/api-proxy";
  import { appbarTrailStore } from "$lib/stores/appbar-trail.store";
  import { layoutTitleStore } from "$lib/stores/layout-title.store";
  import { loadingStore } from "$lib/stores/loading.store";
  import { onMount } from "svelte";

  const game: Partial<Game & { password: string }> & Pick<Game, "players"> = {
    name: "Partida X",
    initialAmount: 0,
    players: [],
  };

  function removePlayer(player: Player) {
    const index = game.players.indexOf(player);
    if (index >= 0) {
      game.players.splice(index, 1);
      game.players = game.players;
    }
  }

  function addPlayer() {
    const name = prompt("Nome do jogador");
    if (isNullOrEmptyOrUndefined(name)) return;
    game.players.push({
      id: -1,
      color: randomColor(),
      name,
    });
    game.players = game.players;
  }

  async function saveGame() {
    if (game.players.length < 2) {
      Notification.error("É necessário no mínimo dois jogadores para criar uma partida.");
      return;
    }
    $loadingStore = true;
    try {
      const body = {
        ...game,
        players: game.players.map((p) => {
          delete (p as Partial<Player>).id;
          return p;
        }),
      };

      const newGame = await new ApiProxy().endpoint("/game").body(body).post<Game>();
      goto(`/game/${newGame.id}`);
    } finally {
      $loadingStore = false;
    }
  }

  onMount(() => {
    $layoutTitleStore = "Nova partida";
    $appbarTrailStore = null;
  });
</script>

<div class="flex flex-col space-y-4">
  <label for="game-name" class="label">
    <span class="font-semibold">Nome:</span>
    <input id="game-name" type="text" class="" bind:value={game.name} />
  </label>
  <label for="game-password" class="label">
    <span class="font-semibold">Senha:</span>
    <input id="game-password" type="password" class="" maxlength="10" bind:value={game.password} />
  </label>
  <label for="game-amount" class="label">
    <span class="font-semibold">Valor inicial:</span>
    <input
      id="game-amount"
      type="number"
      min="0"
      step="1"
      class="text-right"
      maxlength="10"
      bind:value={game.initialAmount}
    />
  </label>

  <div class="pt-5">
    <span class="flex flex-row items-center justify-between">
      <strong class="text-xl">Jogadores:</strong>
      <button class="btn btn-icon variant-filled" on:click={addPlayer}>
        <i class="mdi:plus-thick"></i>
      </button>
    </span>
    <ul class="list">
      {#each game.players as player}
        <li>
          <span class={`badge`}>
            <input class="input" type="color" bind:value={player.color} />
          </span>
          <span class="flex flex-row w-full justify-between border-2 border-dashed">
            <span>{player.name} {player.color}</span>
            <button class="btn btn-sm icon:close text-red-900" on:click={() => removePlayer(player)}></button>
          </span>
        </li>
        <hr />
      {/each}
    </ul>
  </div>

  <div class="pt-5">
    <button class="btn variant-filled w-full" on:click={saveGame}>Salvar</button>
  </div>
</div>

<style type="postcss">
  input {
    @apply input rounded-lg;
  }
</style>
