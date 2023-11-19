<script lang="ts">
  import { ProgressBar } from "@skeletonlabs/skeleton";

  export let loading: boolean = false;
  export let style: string = "";
</script>

{#if loading}
  <div class="absolute mt-0 loading-bar w-full" {style}>
    <ProgressBar class="absolute mt-0" />
  </div>
{/if}
