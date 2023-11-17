import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { _fixtureCreateGameDto, _fixtureGame } from "@test/fixtures/game.fixture";
import { _fixtureCreatePlayerDto } from "@test/fixtures/player.fixture";
import { mock } from "jest-mock-extended";
import { GameRepository, PlayerRepository, TransactionRepository } from "../../../infrastructure/repositories";
import { FilterGameDto } from "../../dto/filter-game.dto";
import { PlayerService } from "../player/player.service";
import { GameService } from "./game.service";

describe("GameService", () => {
  describe("getGameById", () => {
    it("should return a valid game", async () => {
      // given
      const mockGame = _fixtureGame();

      const playerService = mock<PlayerService>();
      const playerRepository = mock<PlayerRepository>();
      const gameRepository = mock<GameRepository>();
      const transactionRepository = mock<TransactionRepository>();

      gameRepository.findUnique.mockResolvedValueOnce(mockGame);
      const service = new GameService(gameRepository, playerRepository, transactionRepository, playerService);

      // when
      const result = await service.getGameById(mockGame.id);

      // then
      expect(result).toBeDefined();
      expect(result.id).toEqual(mockGame.id);
      expect(gameRepository.findUnique).toHaveBeenCalledTimes(1);
    });

    it("should throw exception if not found", async () => {
      // given
      const mockGame = _fixtureGame();

      const playerService = mock<PlayerService>();
      const playerRepository = mock<PlayerRepository>();
      const gameRepository = mock<GameRepository>();
      const transactionRepository = mock<TransactionRepository>();

      gameRepository.findUnique.mockResolvedValueOnce(null);
      const service = new GameService(gameRepository, playerRepository, transactionRepository, playerService);

      // when
      const result = service.getGameById(mockGame.id);

      // then
      await expect(result).rejects.toThrow(NotFoundException);
      expect(gameRepository.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe("createGame", () => {
    it("should thrown when trying to create a game without players", async () => {
      // given
      const mockDto = _fixtureCreateGameDto();
      const mockGame = _fixtureGame({
        name: mockDto.name,
        password: mockDto.password,
        creatorIp: mockDto.creatorIp,
      });

      const playerService = mock<PlayerService>();

      const gameRepository = mock<GameRepository>();
      gameRepository.create.mockResolvedValueOnce(mockGame);
      gameRepository.findFirst.mockResolvedValueOnce(mockGame);

      const playerRepository = mock<PlayerRepository>();
      const transactionRepository = mock<TransactionRepository>();

      const service = new GameService(gameRepository, playerRepository, transactionRepository, playerService);

      // when
      const result = service.createGame(mockDto);
      await expect(result).rejects.toThrow(BadRequestException);

      // then
      expect(result).toBeDefined();
      expect(gameRepository.create).not.toHaveBeenCalled();
      expect(gameRepository.findFirst).not.toHaveBeenCalled();
      expect(playerService.createPlayer).not.toHaveBeenCalled();
    });

    it("should successfully create a game with players", async () => {
      // given
      const player1Dto = _fixtureCreatePlayerDto();
      const player2Dto = _fixtureCreatePlayerDto();
      const mockDto = _fixtureCreateGameDto({
        players: [player1Dto, player2Dto],
      });
      const mockGame = _fixtureGame({
        name: mockDto.name,
        password: mockDto.password,
        creatorIp: mockDto.creatorIp,
      });

      const playerService = mock<PlayerService>();
      playerService.createPlayer.mockReturnThis();

      const gameRepository = mock<GameRepository>();
      gameRepository.create.mockResolvedValueOnce(mockGame);
      gameRepository.findFirst.mockResolvedValueOnce(mockGame);

      const playerRepository = mock<PlayerRepository>();
      const transactionRepository = mock<TransactionRepository>();

      const service = new GameService(gameRepository, playerRepository, transactionRepository, playerService);

      // when
      const result = await service.createGame(mockDto);

      // then
      expect(result).toBeDefined();
      expect(gameRepository.create).toHaveBeenCalledTimes(1);
      expect(gameRepository.findFirst).toHaveBeenCalledTimes(1);
      expect(playerService.createPlayer).toHaveBeenCalledTimes(mockDto.players.length);
    });
  });

  describe("finishGame", () => {
    it("should successfully finish a game", async () => {
      // given
      const mockGameDto = _fixtureCreateGameDto();

      const mockGame = _fixtureGame({
        name: mockGameDto.name,
        password: mockGameDto.password,
        creatorIp: mockGameDto.creatorIp,
      });

      const playerService = mock<PlayerService>();

      const gameRepository = mock<GameRepository>();
      gameRepository.update.mockResolvedValueOnce(mockGame);

      const playerRepository = mock<PlayerRepository>();
      const transactionRepository = mock<TransactionRepository>();

      const service = new GameService(gameRepository, playerRepository, transactionRepository, playerService);

      // when
      const result = await service.finishGame(mockGame.id);

      // then
      expect(result.id).toEqual(mockGame.id);
      expect(gameRepository.update).toHaveBeenCalledWith({
        data: {
          finished: true,
        },
        where: {
          id: mockGame.id,
        },
        include: {
          players: true,
        },
      });
    });
  });

  describe("deleteGame", () => {
    it("should successfully delete a game", async () => {
      // given
      const mockGame = _fixtureGame();

      const gameRepository = mock<GameRepository>();
      gameRepository.findUnique.mockResolvedValueOnce(mockGame);
      gameRepository.delete.mockResolvedValueOnce({} as any);

      const transactionRepository = mock<TransactionRepository>();
      transactionRepository.deleteMany.mockResolvedValueOnce({} as any);

      const playerRepository = mock<PlayerRepository>();
      playerRepository.deleteMany.mockResolvedValueOnce({} as any);

      const playerService = mock<PlayerService>();

      const service = new GameService(gameRepository, playerRepository, transactionRepository, playerService);

      // when
      await service.deleteGame(mockGame.id, mockGame.password as string);

      // then
      expect(gameRepository.findUnique).toHaveBeenCalledTimes(1);
      expect(transactionRepository.deleteMany).toHaveBeenCalledTimes(1);
      expect(playerRepository.deleteMany).toHaveBeenCalledTimes(1);
      expect(gameRepository.delete).toHaveBeenCalledTimes(1);
    });

    it("should not delete a game if not found", async () => {
      // given
      const mockGame = _fixtureGame();

      const gameRepository = mock<GameRepository>();
      gameRepository.findUnique.mockResolvedValueOnce(null);
      gameRepository.delete.mockResolvedValueOnce({} as any);

      const transactionRepository = mock<TransactionRepository>();
      transactionRepository.deleteMany.mockResolvedValueOnce({} as any);

      const playerRepository = mock<PlayerRepository>();
      playerRepository.deleteMany.mockResolvedValueOnce({} as any);

      const playerService = mock<PlayerService>();

      const service = new GameService(gameRepository, playerRepository, transactionRepository, playerService);

      // when
      await service.deleteGame(mockGame.id, mockGame.password as string);

      // then
      expect(gameRepository.findUnique).toHaveBeenCalledTimes(1);
      expect(transactionRepository.deleteMany).not.toHaveBeenCalled();
      expect(playerRepository.deleteMany).not.toHaveBeenCalled();
      expect(gameRepository.delete).not.toHaveBeenCalled();
    });

    it("should throw unauthorized if password doesn't match", async () => {
      // given
      const mockGame = _fixtureGame();
      const invalidPass = "-111";

      const gameRepository = mock<GameRepository>();
      gameRepository.findUnique.mockResolvedValueOnce(mockGame);
      gameRepository.delete.mockResolvedValueOnce({} as any);

      const transactionRepository = mock<TransactionRepository>();
      transactionRepository.deleteMany.mockResolvedValueOnce({} as any);

      const playerRepository = mock<PlayerRepository>();
      playerRepository.deleteMany.mockResolvedValueOnce({} as any);

      const playerService = mock<PlayerService>();

      const service = new GameService(gameRepository, playerRepository, transactionRepository, playerService);

      // when
      const call = service.deleteGame(mockGame.id, invalidPass);
      await expect(call).rejects.toThrow(UnauthorizedException);

      // then
      expect(gameRepository.findUnique).toHaveBeenCalledTimes(1);
      expect(transactionRepository.deleteMany).not.toHaveBeenCalled();
      expect(playerRepository.deleteMany).not.toHaveBeenCalled();
      expect(gameRepository.delete).not.toHaveBeenCalled();
    });
  });

  describe("listGames", () => {
    it("all parameters", async () => {
      const mockGame = _fixtureGame();

      const mockFilterDto: FilterGameDto = {
        finished: true,
        id: mockGame.id,
        name: mockGame.name as string,
        limit: 10,
        page: 1,
        skip: 0,
      };

      const where = {
        id: mockFilterDto.id,
        name: {
          contains: mockFilterDto.name?.toLocaleLowerCase(),
        },
        finished: mockFilterDto.finished,
      };

      const expectedGameList = [mockGame];
      const expected = [expectedGameList, expectedGameList.length];

      const gameRepository = mock<GameRepository>();
      gameRepository.findMany.mockResolvedValueOnce(expectedGameList);
      gameRepository.count.mockResolvedValueOnce(1);

      const playerRepository = mock<PlayerRepository>();
      const transactionRepository = mock<TransactionRepository>();

      const playerService = mock<PlayerService>();

      const service = new GameService(gameRepository, playerRepository, transactionRepository, playerService);

      // when
      const result = await service.listGames(mockFilterDto);

      // then
      expect(result[0]).toEqual(expected[0]);
      expect(result[1]).toEqual(expected[1]);
      expect(gameRepository.findMany).toHaveBeenCalledWith(
        expect.objectContaining({ where, skip: mockFilterDto.skip, take: mockFilterDto.limit }),
      );
    });
  });
});
