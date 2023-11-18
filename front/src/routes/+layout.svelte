<script>
  // import "../theme.postcss";
  // This contains the bulk of Skeletons required styles:
  import Header from "$lib/layout/header.svelte";
  import "../app.postcss";
  import "virtual:uno.css";

  import { AppShell, Toast } from "@skeletonlabs/skeleton";

  import { initializeStores } from "@skeletonlabs/skeleton";
  initializeStores();
</script>

<Toast />

<AppShell>
  <svelte:fragment slot="header">
    <Header />
  </svelte:fragment>
  <!-- (sidebarLeft) -->
  <!-- (sidebarRight) -->
  <!-- (pageHeader) -->
  <!-- Router Slot -->
  <slot />
  <!-- ---- / ---- -->
  <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
  <!-- (footer) -->
</AppShell>

<svelte:head>
  <title>LK Monopoly Wallet</title>
</svelte:head>
