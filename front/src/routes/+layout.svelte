<script>
  import "reflect-metadata";
  // import "../theme.postcss";
  // This contains the bulk of Skeletons required styles:
  import Header from "$lib/layout/header.svelte";
  import { AppShell, Toast, getToastStore, initializeStores } from "@skeletonlabs/skeleton";
  import "virtual:uno.css";
  import "../app.postcss";
  import { Notification } from "$lib/notification";

  initializeStores();

  const toastStore = getToastStore();
  Notification.setToastStore(toastStore);
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
