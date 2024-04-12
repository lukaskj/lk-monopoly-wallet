import { Module } from "@nestjs/common";
import { WalletModule } from "./wallet/wallet.module";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [
    WalletModule,
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 30000,
        limit: 50,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
