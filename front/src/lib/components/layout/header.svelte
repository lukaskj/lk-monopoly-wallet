<script lang="ts">
  import { Notification } from "$lib/notification";
  import { AppBar, getDrawerStore } from "@skeletonlabs/skeleton";
  import { layoutTitleStore } from "../../stores/layout-title.store";
  import AppBarTrail from "./appbar-trail.svelte";
  import { appbarTrailStore } from "$lib/stores/appbar-trail.store";
  // import IconWallet from "~icons/game-icons/wallet";

  const drawerStore = getDrawerStore();

  function drawerOpen(): void {
    drawerStore.open({ width: "w-40" });
  }

  $appbarTrailStore = AppBarTrail;
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" shadow="shadow-2xl" slotTrail="place-content-end">
  <svelte:fragment slot="lead">
    <!-- <i class="icon:wallet" /> -->
    <button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
      <i class="game-icons:hamburger-menu"></i>
    </button>
    <!-- <div class="flex items-center"> -->
      <!-- <button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
        <span>
          <svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
            <rect width="100" height="20" />
            <rect y="30" width="100" height="20" />
            <rect y="60" width="100" height="20" />
          </svg>
        </span>
      </button> -->
    <!-- </div> -->
  </svelte:fragment>
  <strong class="text-xl">{$layoutTitleStore}</strong>
  <svelte:fragment slot="trail">
    <svelte:component this={$appbarTrailStore} />
  </svelte:fragment>
</AppBar>
