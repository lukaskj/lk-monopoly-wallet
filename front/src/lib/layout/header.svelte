<script>
  import { AppBar } from "@skeletonlabs/skeleton";
  // import IconWallet from "~icons/game-icons/wallet";
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
  <svelte:fragment slot="lead">
    <i class="icon:wallet" />
  </svelte:fragment>
  LK Monopoly Wallet
  <svelte:fragment slot="trail">asda</svelte:fragment>
</AppBar>
