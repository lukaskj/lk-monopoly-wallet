<script lang="ts">
  import { sleep } from "$lib/helpers/sleep";
  import NoSleep from "nosleep.js";
  import { afterUpdate, onMount } from "svelte";

  let noSleep: NoSleep | null = null;
  let enabled = false;

  onMount(() => {
    try {
      noSleep = new NoSleep();
    } catch (error) {
      console.error(error);
    }
  });

  afterUpdate(async () => {
    try {
      while (noSleep && !noSleep.isEnabled) {
        await sleep(1000);
        if (!noSleep.isEnabled) {
          document && document.body && document.body.click();
          await noSleep.enable();
        }
        enabled = noSleep.isEnabled;
      } 
    } catch (error) {
      console.error(error);
    }
  });
</script>

<div>
  {#if enabled}
    .
  {/if}
</div>
