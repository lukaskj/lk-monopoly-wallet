import { Game, PaginatedData, Transaction, type PlayerBalance } from "$lib/dto";
import { ApiProxy } from "$lib/request/api-proxy";
import { loadingStore } from "$lib/stores/loading.store";
import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import type { TGameData } from "./types";

async function getGameData(id: number): Promise<TGameData> {
  try {
    loadingStore.set(true);
    const response = new ApiProxy().endpoint(`/game/${id}`).get(Game);
    const players = getBalance(id);
    const transactions = getTransactions(id);

    const promises = await Promise.all([response, players, transactions]);

    return {
      game: promises[0],
      players: promises[1],
      transactions: promises[2],
    };
  } finally {
    loadingStore.set(false);
  }
}

async function getBalance(id: number): Promise<PlayerBalance[]> {
  try {
    loadingStore.set(true);
    const response = await new ApiProxy().endpoint(`/game/${id}/balance`).get<PlayerBalance[]>();
    return response;
  } finally {
    loadingStore.set(false);
  }
}

async function getTransactions(id: number): Promise<PaginatedData<Transaction>> {
  try {
    loadingStore.set(true);
    const response = await new ApiProxy().endpoint(`/game/${id}/transactions`).getPaginated(1, 10, Transaction);
    return response;
  } finally {
    loadingStore.set(false);
  }
}

export const load = (async ({ params, fetch }) => {
  ApiProxy.setFetch(fetch);
  const gameId = parseInt(params.id);
  if (isNaN(gameId)) {
    redirect(301, "/");
    return;
  }

  const gameData = getGameData(gameId);

  return { id: gameId, getBalance, getTransactions, gameData };
}) satisfies PageLoad;
