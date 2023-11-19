<script lang="ts">
  import { appbarTrailStore } from "$lib/stores/appbar-trail.store";
  import { AppBar, getDrawerStore } from "@skeletonlabs/skeleton";
  import { layoutTitleStore } from "../../stores/layout-title.store";
  // import IconWallet from "~icons/game-icons/wallet";

  const drawerStore = getDrawerStore();

  function drawerOpen(): void {
    drawerStore.open({ width: "w-40" });
  }

  $appbarTrailStore = null;
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" shadow="shadow-2xl" slotTrail="place-content-end">
  <svelte:fragment slot="lead">
    <!-- <i class="icon:wallet" /> -->
    <button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
      <i class="icon:menu"></i>
    </button>
  </svelte:fragment>
  <strong class="text-xl">{$layoutTitleStore}</strong>
  <svelte:fragment slot="trail">
    <svelte:component this={$appbarTrailStore} />
  </svelte:fragment>
</AppBar>
