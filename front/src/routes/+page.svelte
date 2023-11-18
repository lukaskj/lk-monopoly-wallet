<script lang="ts">
  import { InputChip } from "@skeletonlabs/skeleton";
  import { ApiRequest } from "../lib/request/api-request";
  let list: string[] = ["foo", "bar", "fizz", "buzz"];

  let games: { name: string }[] = [];

  async function getGames() {
    const response = await new ApiRequest(fetch).endpoint("/game").getPaginated();

    // games = (await response.json()).data;
    console.log(response);
  }
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<InputChip bind:value={list} name="chips" placeholder="Enter any value..." />
<button class="btn variant-filled" on:click={getGames}>Get games</button>

{#each games as game}
  <div>{game.name}</div>
{/each}

<div class="btn-group-vertical variant-filled">
  <button>Months</button>
  <button>Days</button>
  <button>Years</button>
</div>
