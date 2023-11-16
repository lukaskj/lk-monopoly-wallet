import { PrismaService } from "@database/prisma.service";
import { NotFoundException } from "@nestjs/common";
import { _fixtureCreatePlayerDto, _fixturePlayer } from "@test/fixtures/player.fixture";
import { mockDeep } from "jest-mock-extended";
import { PlayerService } from "./player.service";

describe("PlayerService", () => {
  describe("createPlayer", () => {
    it("should create player", async () => {
      // given
      const mockPlayer = _fixturePlayer();
      const mockDto = _fixtureCreatePlayerDto({
        name: mockPlayer.name,
        color: mockPlayer.color,
      });

      const prismaService = mockDeep<PrismaService>();
      prismaService.player.create.mockResolvedValueOnce(mockPlayer);

      const service = new PlayerService(prismaService);

      // when
      const result = await service.createPlayer(mockDto, mockPlayer.gameId);

      // then
      expect(result).toMatchObject(mockPlayer);
      expect(prismaService.player.create).toHaveBeenCalledWith({
        data: {
          name: mockDto.name,
          color: mockDto.color,
          gameId: mockPlayer.gameId,
        },
      });
    });
  });

  describe("getPlayerById", () => {
    it("should return a player", async () => {
      // given
      const mockPlayer = _fixturePlayer();

      const prismaService = mockDeep<PrismaService>();
      prismaService.player.findUnique.mockResolvedValueOnce(mockPlayer);

      const service = new PlayerService(prismaService);

      // when
      const result = await service.getPlayerById(mockPlayer.id);

      // then
      expect(result).toMatchObject(mockPlayer);
      expect(prismaService.player.findUnique).toHaveBeenCalledWith({ where: { id: mockPlayer.id } });
    });

    it("should throw if not found", async () => {
      // given

      const prismaService = mockDeep<PrismaService>();
      prismaService.player.findUnique.mockResolvedValueOnce(null);

      const service = new PlayerService(prismaService);

      // when
      const result = service.getPlayerById(1);

      // then
      await expect(result).rejects.toThrow(NotFoundException);
      expect(prismaService.player.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
