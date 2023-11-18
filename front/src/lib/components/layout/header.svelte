<script lang="ts">
  import { Notification } from "$lib/notification";
  import { AppBar, getDrawerStore } from "@skeletonlabs/skeleton";
  // import IconWallet from "~icons/game-icons/wallet";

  const drawerStore = getDrawerStore();

  function drawerOpen(): void {
    drawerStore.open({ width: "w-40" });
  }
</script>

<AppBar slotDefault="place-self-center" shadow="shadow-2xl" slotTrail="!space-x-2">
  <svelte:fragment slot="lead">
    <!-- <i class="icon:wallet" /> -->
    <div class="flex items-center">
      <button class="lg:hidden btn btn-sm mr-4" on:click={drawerOpen}>
        <span>
          <svg viewBox="0 0 100 80" class="fill-token w-4 h-4">
            <rect width="100" height="20" />
            <rect y="30" width="100" height="20" />
            <rect y="60" width="100" height="20" />
          </svg>
        </span>
      </button>
    </div>
  </svelte:fragment>
  <strong class="text-xl uppercase">LK Monopoly Wallet</strong>

  <svelte:fragment slot="trail">
    <i class="icon:settings-knobs"></i>
    <!-- <button on:click={() => Notification.success("Test")}>Notification</button> -->
  </svelte:fragment>
</AppBar>
