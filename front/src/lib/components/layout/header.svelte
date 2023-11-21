<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { appbarTrailParamsStore, appbarTrailStore } from "$lib/stores/appbar-trail.store";
  import { AppBar, getDrawerStore } from "@skeletonlabs/skeleton";
  import { layoutTitleStore } from "../../stores/layout-title.store";

  const drawerStore = getDrawerStore();

  function drawerOpen(): void {
    drawerStore.open({ width: "w-40" });
  }

  function goBack(): void {
    goto("/");
  }
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" shadow="shadow-2xl" slotTrail="place-content-end">
  <svelte:fragment slot="lead">
    {#if $page.url.pathname !== "/"}
      <a class="lg:hidden btn btn-sm icon:arrow-left" href="/"> </a>
    {/if}
  </svelte:fragment>
  {$layoutTitleStore}
  <svelte:fragment slot="trail">
    <svelte:component this={$appbarTrailStore} param={$appbarTrailParamsStore} />
  </svelte:fragment>
</AppBar>
