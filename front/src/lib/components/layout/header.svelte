<script lang="ts">
  import { page } from "$app/stores";
  import { appbarTrailParamsStore, appbarTrailStore } from "$lib/stores/appbar-trail.store";
  import { AppBar, getDrawerStore } from "@skeletonlabs/skeleton";
  import { layoutTitleStore } from "../../stores/layout-title.store";

  const drawerStore = getDrawerStore();

  function drawerOpen(): void {
    drawerStore.open({ width: "w-40" });
  }

  function goBack(): void {
    history.back();
  }

  $appbarTrailStore = null;
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" shadow="shadow-2xl" slotTrail="place-content-end">
  <svelte:fragment slot="lead">
    {#if $page.url.pathname !== "/"}
      <button class="lg:hidden btn btn-sm icon:arrow-left" on:click={goBack}> </button>
    {/if}
  </svelte:fragment>
  {$layoutTitleStore}
  <svelte:fragment slot="trail">
    <svelte:component this={$appbarTrailStore} param={$appbarTrailParamsStore} />
  </svelte:fragment>
</AppBar>
