<script>
  // import "reflect-metadata";
  // import "../theme.postcss";
  // This contains the bulk of Skeletons required styles:
  import Header from "$lib/components/layout/header.svelte";
  import { AppShell, Drawer, Toast, getToastStore, initializeStores } from "@skeletonlabs/skeleton";
  import "virtual:uno.css";
  import "../app.postcss";
  import { Notification } from "$lib/notification";
  import Navigation from "$lib/components/navigation.svelte";
  import LoadingBar from "$lib/components/loading-bar.svelte";
  import { loadingStore } from "$lib/stores/loading.store";

  initializeStores();

  const toastStore = getToastStore();
  Notification.setToastStore(toastStore);
</script>

<Drawer>
  <Navigation />
</Drawer>
<Toast />

<svelte:head>
  <title>LK Monopoly Wallet</title>
</svelte:head>

<!-- <AppShell  slotFooter="bg-black p-4"> -->
<AppShell slotSidebarLeft="bg-surface-500/5  w-0 lg:w-64" regionPage="scroll-smooth">
  <svelte:fragment slot="header">
    <Header />
    <LoadingBar loading={$loadingStore} />
  </svelte:fragment>
  <svelte:fragment slot="sidebarLeft">
    <Navigation />
  </svelte:fragment>
  <!-- (sidebarLeft) -->
  <!-- (sidebarRight) -->
  <!-- (pageHeader) -->
  <!-- Router Slot -->
  <slot />
  <!-- ---- / ---- -->
  <svelte:fragment slot="pageFooter">LK Monopoly Wallet</svelte:fragment>
  <!-- (footer) -->
</AppShell>
