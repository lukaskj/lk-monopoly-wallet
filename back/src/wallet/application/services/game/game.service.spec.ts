import { PrismaService } from "@database/prisma.service";
import { BadRequestException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { _fixtureCreateGameDto, _fixtureGame } from "@test/fixtures/game.fixture";
import { _fixtureCreatePlayerDto } from "@test/fixtures/player.fixture";
import { mock, mockDeep } from "jest-mock-extended";
import { PlayerService } from "../player/player.service";
import { GameService } from "./game.service";

describe("GameService", () => {
  describe("getGameById", () => {
    it("should return a valid game", async () => {
      // given
      const mockGame = _fixtureGame();

      const playerService = mock<PlayerService>();
      const prismaService = mockDeep<PrismaService>();

      prismaService.game.findUnique.mockResolvedValueOnce(mockGame);
      const service = new GameService(prismaService, playerService);

      // when
      const result = await service.getGameById(mockGame.id);

      // then
      expect(result).toBeDefined();
      expect(result.id).toEqual(mockGame.id);
      expect(prismaService.game.findUnique).toHaveBeenCalledTimes(1);
    });

    it("should throw exception if not found", async () => {
      // given
      const mockGame = _fixtureGame();

      const playerService = mock<PlayerService>();
      const prismaService = mockDeep<PrismaService>();

      prismaService.game.findUnique.mockResolvedValueOnce(null);
      const service = new GameService(prismaService, playerService);

      // when
      const result = service.getGameById(mockGame.id);

      // then
      await expect(result).rejects.toThrow(NotFoundException);
      expect(prismaService.game.findUnique).toHaveBeenCalledTimes(1);
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
      const prismaService = mockDeep<PrismaService>();

      prismaService.game.create.mockResolvedValueOnce(mockGame);
      prismaService.game.findFirst.mockResolvedValueOnce(mockGame);

      const service = new GameService(prismaService, playerService);

      // when
      const result = service.createGame(mockDto);
      await expect(result).rejects.toThrow(BadRequestException);

      // then
      expect(result).toBeDefined();
      expect(prismaService.game.create).not.toHaveBeenCalled();
      expect(prismaService.game.findFirst).not.toHaveBeenCalled();
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

      const prismaService = mockDeep<PrismaService>();
      prismaService.game.create.mockResolvedValueOnce(mockGame);
      prismaService.game.findFirst.mockResolvedValueOnce(mockGame);

      const service = new GameService(prismaService, playerService);

      // when
      const result = await service.createGame(mockDto);

      // then
      expect(result).toBeDefined();
      expect(prismaService.game.create).toHaveBeenCalledTimes(1);
      expect(prismaService.game.findFirst).toHaveBeenCalledTimes(1);
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

      const prismaService = mockDeep<PrismaService>();
      prismaService.game.update.mockResolvedValueOnce(mockGame);

      const service = new GameService(prismaService, playerService);

      // when
      const result = await service.finishGame(mockGame.id);

      // then
      expect(result.id).toEqual(mockGame.id);
      expect(prismaService.game.update).toHaveBeenCalledWith({
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

  describe.only("deleteGame", () => {
    it("should successfully delete a game", async () => {
      // given
      const mockGame = _fixtureGame();

      const prismaService = mockDeep<PrismaService>();
      prismaService.game.findUnique.mockResolvedValueOnce(mockGame);
      prismaService.game.delete.mockResolvedValueOnce({} as any);
      prismaService.transaction.deleteMany.mockResolvedValueOnce({} as any);
      prismaService.player.deleteMany.mockResolvedValueOnce({} as any);

      const playerService = mock<PlayerService>();

      const service = new GameService(prismaService, playerService);

      // when
      await service.deleteGame(mockGame.id, mockGame.password as string);

      // then
      expect(prismaService.game.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaService.transaction.deleteMany).toHaveBeenCalledTimes(1);
      expect(prismaService.player.deleteMany).toHaveBeenCalledTimes(1);
      expect(prismaService.game.delete).toHaveBeenCalledTimes(1);
    });

    it("should not delete a game if not found", async () => {
      // given
      const mockGame = _fixtureGame();

      const prismaService = mockDeep<PrismaService>();
      prismaService.game.findUnique.mockResolvedValueOnce(null);
      prismaService.game.delete.mockResolvedValueOnce({} as any);
      prismaService.transaction.deleteMany.mockResolvedValueOnce({} as any);
      prismaService.player.deleteMany.mockResolvedValueOnce({} as any);

      const playerService = mock<PlayerService>();

      const service = new GameService(prismaService, playerService);

      // when
      await service.deleteGame(mockGame.id, mockGame.password as string);

      // then
      expect(prismaService.game.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaService.transaction.deleteMany).not.toHaveBeenCalled();
      expect(prismaService.player.deleteMany).not.toHaveBeenCalled();
      expect(prismaService.game.delete).not.toHaveBeenCalled();
    });

    it("should throw unauthorized if password doesn't match", async () => {
      // given
      const mockGame = _fixtureGame();
      const invalidPass = "-111";

      const prismaService = mockDeep<PrismaService>();
      prismaService.game.findUnique.mockResolvedValueOnce(mockGame);
      prismaService.game.delete.mockResolvedValueOnce({} as any);
      prismaService.transaction.deleteMany.mockResolvedValueOnce({} as any);
      prismaService.player.deleteMany.mockResolvedValueOnce({} as any);

      const playerService = mock<PlayerService>();

      const service = new GameService(prismaService, playerService);

      // when
      const call = service.deleteGame(mockGame.id, invalidPass);
      await expect(call).rejects.toThrow(UnauthorizedException);

      // then
      expect(prismaService.game.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaService.transaction.deleteMany).not.toHaveBeenCalled();
      expect(prismaService.player.deleteMany).not.toHaveBeenCalled();
      expect(prismaService.game.delete).not.toHaveBeenCalled();
    });
  });
});
