<script lang="ts">
  import GameCard from "$lib/components/game/game-card.svelte";
  import { Game, type PaginatedData } from "$lib/dto";
  import { ApiRequest } from "$lib/request/api-request";
  import { layoutTitleStore } from "$lib/stores/layout-title.store";
  import { Paginator, type PaginationSettings } from "@skeletonlabs/skeleton";
  import type { PageData } from "./$types";
  $layoutTitleStore = "Partidas";

  let pageData: PaginatedData<Game> = {
    data: [],
    meta: {} as any,
  };

  $: loading = false;

  let paginationSettings = {
    page: 0,
    limit: 10,
    size: 0,
    amounts: [],
  } satisfies PaginationSettings;

  async function getGames(page: number) {
    try {
      loading = true;
      const response = await new ApiRequest(fetch)
        .endpoint("/game", { finished: false })
        .getPaginated(page, paginationSettings.limit, Game);
      pageData = response;

      paginationSettings.page = pageData.meta.page - 1;
      paginationSettings.size = pageData.meta.total;
    } catch (error) {
      console.error(error);
    } finally {
      // loading = false;
    }
  }

  function onPageChange(e: CustomEvent): void {
    getGames(paginationSettings.page + 1);
  }

  getGames(1);
</script>

<div class="container p-4 space-y-4">
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
