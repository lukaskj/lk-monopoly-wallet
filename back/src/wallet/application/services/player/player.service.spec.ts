import { PrismaService } from "@database/prisma.service";
import { mockDeep } from "jest-mock-extended";
import { _fixtureCreatePlayerDto, _fixturePlayer } from "../../../../../test/fixtures/player.fixture";
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
});
