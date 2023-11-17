import { Pagination } from "@common/pagination/pagination";
import { Controller, Get, Param, Query } from "@nestjs/common";
import { TransactionService } from "../../../application/services/transaction/transaction.service";
import { FilterTransactionsViewmodel } from "../../viewmodels/game/request/filter-transactions.viewmodel";
import { TransactionViewModel } from "../../viewmodels/game/transaction.viewmodel";

@Controller("/v1/game")
export class GameTransactionsController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get(":id/transactions")
  public async listTransactions(@Param("id") id: number, @Query() params: FilterTransactionsViewmodel) {
    const [list, total] = await this.transactionService.listTransactions({
      limit: params.limit,
      page: params.page,
      skip: params.skip,
      gameId: id,
    });

    return Pagination.transformAndPaginate(TransactionViewModel, list, params.page, params.limit, total);
  }
}
