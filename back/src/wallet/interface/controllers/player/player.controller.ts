import { AuthToken } from "@common/decorators/auth-token.decorator";
import { SerializeTo } from "@common/decorators/serialize-to";
import { Body, Controller, Param, Post } from "@nestjs/common";
import { TransactionService } from "../../../application/services/transaction/transaction.service";
import { TransactionViewModel } from "../../viewmodels/game/transaction.viewmodel";
import { AddTransactionViewModel } from "../../viewmodels/transaction/add-transaction.viewmodel";

@Controller("v1/player")
export class PlayerController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post(":id/transaction")
  @SerializeTo(TransactionViewModel)
  public async addTransaction(
    @Param("id") id: number,
    @Body() params: AddTransactionViewModel,
    @AuthToken() password: string,
  ) {
    return await this.transactionService.addPlayerTransactionCheckingPassword(password, params, id);
  }
}
