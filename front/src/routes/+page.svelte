<script lang="ts">
  import { layoutTitleStore } from "$lib/stores/layout-title.store";
  import { ApiRequest } from "../lib/request/api-request";
  $layoutTitleStore = "Jogos";

  async function getGames() {
    const response = await new ApiRequest(fetch).endpoint("/game").getPaginated();

    // games = (await response.json()).data;
    console.log(response);
  }
</script>

<div class="container p-10 space-y-4">
  <h1>Homepage</h1>
  <hr />
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate nostrum, vero explicabo sunt ipsum asperiores.
    Molestias nostrum mollitia cumque veniam eum error atque, dolores nesciunt voluptas ea consectetur sed delectus.
  </p>
</div>
