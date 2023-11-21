import { Test, TestingModule } from "@nestjs/testing";
import { GameInfoWsGatewayGateway } from "./game-info-ws-gateway.gateway";

describe("GameInfoWsGatewayGateway", () => {
  let gateway: GameInfoWsGatewayGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameInfoWsGatewayGateway],
    }).compile();

    gateway = module.get<GameInfoWsGatewayGateway>(GameInfoWsGatewayGateway);
  });

  it("should be defined", () => {
    expect(gateway).toBeDefined();
  });
});
