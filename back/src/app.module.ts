import { Module } from "@nestjs/common";
import { WalletModule } from "./wallet/wallet.module";
import { EventEmitterModule } from "@nestjs/event-emitter";

@Module({
  imports: [WalletModule, EventEmitterModule.forRoot()],
  controllers: [],
  providers: [],
})
export class AppModule {}
