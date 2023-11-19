<script lang="ts">
  import GameCard from "$lib/components/game/game-card.svelte";
  import { Game, type PaginatedData } from "$lib/dto";
  import { layoutTitleStore } from "$lib/stores/layout-title.store";
  import { Paginator, type PaginationSettings } from "@skeletonlabs/skeleton";
  import { ApiRequest } from "../lib/request/api-request";
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

  async function getGames() {
    try {
      loading = true;
      const page = paginationSettings.page + 1;
      const limit = paginationSettings.limit;
      const response = await new ApiRequest(fetch)
        .endpoint("/game", { finished: false })
        .getPaginated(page, limit, Game);
      pageData = response;

      paginationSettings.page = pageData.meta.page - 1;
      paginationSettings.size = pageData.meta.total;
    } catch (error) {
      console.error(error);
    } finally {
      loading = false;
    }
  }

  getGames();
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
  />
</div>
