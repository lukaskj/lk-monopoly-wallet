<script lang="ts">
  import { sleep } from "$lib/helpers/sleep";
  import NoSleep from "nosleep.js";
  import { afterUpdate, onMount } from "svelte";

  let noSleep: NoSleep = { isEnabled: false, enable: () => {} } as NoSleep;
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
      await sleep(1000);
      document && document.body && document.body.click();
      if (!noSleep.isEnabled) {
        await noSleep.enable();
      }
      enabled = noSleep.isEnabled;
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
