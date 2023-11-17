import { faker } from "@faker-js/faker";
import { UnauthorizedException } from "@nestjs/common";
import { _fixtureGame } from "@test/fixtures/game.fixture";
import { _fixturePlayer } from "@test/fixtures/player.fixture";
import { _fixtureTransaction } from "@test/fixtures/transaction.fixture";
import { mock } from "jest-mock-extended";
import { TransactionRepository } from "../../../infrastructure/repositories";
import { GameService } from "../game/game.service";
import { PlayerService } from "../player/player.service";
import { TransactionService } from "./transaction.service";

describe("TransactionService", () => {
  describe("addPlayerTransaction", () => {
    it("should create a valid transaction", async () => {
      // given
      const mockPlayer = _fixturePlayer();
      const mockTransaction = _fixtureTransaction({
        playerId: mockPlayer.id,
      });
      const createTransactionDto = {
        amount: mockTransaction.amount,
        operation: mockTransaction.operation,
      };

      const playerService = mock<PlayerService>();
      const gameService = mock<GameService>();

      const transactionRepository = mock<TransactionRepository>();
      transactionRepository.create.mockResolvedValueOnce(mockTransaction);

      const service = new TransactionService(playerService, gameService, transactionRepository);

      // when
      const result = await service.addPlayerTransaction(
        createTransactionDto,
        mockPlayer.id,
        mockTransaction.ip as string,
      );

      // then
      expect(result).toMatchObject(mockTransaction);
      expect(transactionRepository.create).toHaveBeenCalledWith({
        data: {
          amount: mockTransaction.amount,
          operation: mockTransaction.operation,
          playerId: mockTransaction.playerId,
          ip: mockTransaction.ip,
        },
      });
    });
  });

  describe("addPlayerTransactionCheckingPassword", () => {
    it("should create a valid transaction", async () => {
      // given
      const password = faker.string.alphanumeric(50);
      const mockGame = _fixtureGame({
        password,
      });

      const mockPlayer = _fixturePlayer({
        gameId: mockGame.id,
      });

      const mockTransaction = _fixtureTransaction({
        playerId: mockPlayer.id,
      });

      const createTransactionDto = {
        amount: mockTransaction.amount,
        operation: mockTransaction.operation,
      };

      const playerService = mock<PlayerService>();
      playerService.getPlayerById.mockResolvedValueOnce(mockPlayer);

      const gameService = mock<GameService>();
      gameService.getGameById.mockResolvedValueOnce(mockGame);

      const transactionRepository = mock<TransactionRepository>();

      const service = new TransactionService(playerService, gameService, transactionRepository);

      const $addPlayerTransaction = jest.spyOn(service, "addPlayerTransaction").mockResolvedValueOnce(mockTransaction);

      // when
      const result = await service.addPlayerTransactionCheckingPassword(
        password,
        createTransactionDto,
        mockPlayer.id,
        mockTransaction.ip as string,
      );

      // then
      expect(result).toMatchObject(mockTransaction);
      expect(playerService.getPlayerById).toHaveBeenCalledWith(mockPlayer.id);
      expect(gameService.getGameById).toHaveBeenCalledWith(mockGame.id);
      expect($addPlayerTransaction).toHaveBeenCalledWith(createTransactionDto, mockPlayer.id, mockTransaction.ip);
    });

    it("should throw if password mismatch", async () => {
      // given
      const password = faker.string.alphanumeric(50);
      const mockGame = _fixtureGame({
        password: password.substring(0, 40),
      });

      const mockPlayer = _fixturePlayer({
        gameId: mockGame.id,
      });

      const mockTransaction = _fixtureTransaction({
        playerId: mockPlayer.id,
      });

      const createTransactionDto = {
        amount: mockTransaction.amount,
        operation: mockTransaction.operation,
      };

      const playerService = mock<PlayerService>();
      playerService.getPlayerById.mockResolvedValueOnce(mockPlayer);

      const gameService = mock<GameService>();
      gameService.getGameById.mockResolvedValueOnce(mockGame);

      const transactionRepository = mock<TransactionRepository>();

      const service = new TransactionService(playerService, gameService, transactionRepository);
      const $addPlayerTransaction = jest.spyOn(service, "addPlayerTransaction").mockResolvedValueOnce(mockTransaction);

      // when
      const result = service.addPlayerTransactionCheckingPassword(
        password,
        createTransactionDto,
        mockPlayer.id,
        mockTransaction.ip as string,
      );

      // then
      await expect(result).rejects.toThrow(UnauthorizedException);
      expect(playerService.getPlayerById).toHaveBeenCalledWith(mockPlayer.id);
      expect(gameService.getGameById).toHaveBeenCalledWith(mockGame.id);
      expect($addPlayerTransaction).not.toHaveBeenCalled();
    });
  });
});
