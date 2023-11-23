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
    while (noSleep && !enabled) {
      try {
        await sleep(1000);
        if (!enabled) {
          document && document.body && document.body.click();
          await sleep(500);
          await noSleep.enable();
          enabled = noSleep.isEnabled;
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
</script>

<div>
  {#if enabled}
    *
  {/if}
</div>
