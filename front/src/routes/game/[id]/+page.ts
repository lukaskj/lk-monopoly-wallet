import { goto } from "$app/navigation";
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
  return await new ApiProxy().endpoint(`/game/${id}/balance`).get<PlayerBalance[]>();
}

async function getTransactions(id: number): Promise<PaginatedData<Transaction>> {
  return await new ApiProxy().endpoint(`/game/${id}/transactions`).getPaginated(1, 10, Transaction);
}

async function endGame(id: number, password?: string) {
  try {
    loadingStore.set(true);
    const response = await new ApiProxy()
      .setHeader("Authorization", password ?? "")
      .endpoint(`/game/${id}/finish`)
      .post();
    await goto("/");
    return response;
  } finally {
    loadingStore.set(false);
  }
}

async function createPlayerTransaction(player: PlayerBalance, amount: number, operation: number, password?: string) {
  try {
    loadingStore.set(true);
    const response = await new ApiProxy()
      .endpoint(`/player/${player.id}/transaction`)
      .body({
        amount,
        operation,
      })
      .setHeader("Authorization", password ?? "")
      .post(Transaction);
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

  return {
    id: gameId,
    gameData,
    getBalance,
    getTransactions,
    createPlayerTransaction,
    endGame,
  };
}) satisfies PageLoad;
