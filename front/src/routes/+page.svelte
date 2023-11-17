<script lang="ts">
  import { InputChip } from "@skeletonlabs/skeleton";
  let list: string[] = ["foo", "bar", "fizz", "buzz"];
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<InputChip bind:value={list} name="chips" placeholder="Enter any value..." />
<button class="btn variant-filled">adsasdasd</button>

<div class="btn-group-vertical variant-filled">
	<button>Months</button>
	<button>Days</button>
	<button>Years</button>
</div>