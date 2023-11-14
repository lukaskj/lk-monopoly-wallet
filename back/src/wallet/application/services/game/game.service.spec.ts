import { PrismaService } from "@database/prisma.service";
import { NotFoundException } from "@nestjs/common";
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
    it("should successfully create a game without players", async () => {
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
      const result = await service.createGame(mockDto);

      // then
      expect(result).toBeDefined();
      expect(prismaService.game.create).toHaveBeenCalledTimes(1);
      expect(prismaService.game.findFirst).toHaveBeenCalledTimes(1);
      expect(playerService.createPlayer).toHaveBeenCalledTimes(mockDto.players.length);
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
});
