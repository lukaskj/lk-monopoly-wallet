<script lang="ts">
  import GameCard from "$lib/components/game/game-card.svelte";
  import NewGameTrailButton from "$lib/components/layout/appbar-trail/new-game-trail-button.svelte";
  import { Game, type PaginatedData } from "$lib/dto";
  import { ApiProxy } from "$lib/request/api-proxy";
  import { appbarTrailParamsStore, appbarTrailStore } from "$lib/stores/appbar-trail.store";
  import { layoutTitleStore } from "$lib/stores/layout-title.store";
  import { loadingStore } from "$lib/stores/loading.store";
  import { Paginator, type PaginationSettings } from "@skeletonlabs/skeleton";
  import { onMount } from "svelte";

  let pageData: PaginatedData<Game> = {
    data: [],
    meta: {} as any,
  };

  let paginationSettings = {
    page: 0,
    limit: 10,
    size: 0,
    amounts: [],
  } satisfies PaginationSettings;

  async function getGames(page: number) {
    try {
      $loadingStore = true;
      const response = await new ApiProxy()
        .endpoint("/game", { finished: false })
        .getPaginated(page, paginationSettings.limit, Game);
      pageData = response;

      paginationSettings.page = pageData.meta.page - 1;
      paginationSettings.size = pageData.meta.total;
    } catch (error) {
      console.error(error);
    } finally {
      $loadingStore = false;
    }
  }

  function onPageChange(e: CustomEvent): void {
    getGames(paginationSettings.page + 1);
  }

  onMount(() => {
    $layoutTitleStore = "Partidas";
    getGames(1);
    appbarTrailStore.set(NewGameTrailButton);
    appbarTrailParamsStore.set(null);
  });
</script>

<div class="container space-y-4">
  {#each pageData.data as game}
    <GameCard {game} />
  {/each}

  <Paginator
    bind:settings={paginationSettings}
    showNumerals={false}
    showFirstLastButtons={false}
    showPreviousNextButtons={true}
    separatorText="de"
    on:page={onPageChange}
  />
</div>
