<script lang="ts">
  import { TransactionOperation } from "$lib/enums/transaction-operation.enum";
  import CurrencyInput from "../currency-input.svelte";

  export let confirmEnabled: boolean = true;

  export let value: number = 0;
  export let operation: TransactionOperation = TransactionOperation.CREDIT;
  export let onConfirm: (amount: number) => Promise<void> = async () => {};

  function addAmount(addValue: number) {
    const v = Math.abs(value);
    value = (v + addValue) * operation;
  }

  function toggleOperation() {
    if (operation === TransactionOperation.CREDIT) {
      operation = TransactionOperation.DEBIT;
    } else {
      operation = TransactionOperation.CREDIT;
    }
    addAmount(0);
  }

  function clear() {
    value = 0;
    operation = TransactionOperation.CREDIT;
  }
</script>

<div class="flex flex-col space-y-2">
  <div class="amount flex flex-row space-x-2">
    <button class="toggle-operation" on:click={toggleOperation}>+/-</button>
    <CurrencyInput bind:value className="text-3xl rounded-lg font-bold" />
  </div>
  <div class="n-key grid grid-cols-3 grid-rows-3 gap-1 select-none">
    <button on:click={() => addAmount(10)}>10</button>
    <button on:click={() => addAmount(50)}>50</button>
    <button on:click={() => addAmount(100)}>100</button>
    <button on:click={() => addAmount(100)}>100</button>
    <button on:click={() => addAmount(500)}>500</button>
    <button on:click={() => addAmount(1000)}>1000</button>
    <button on:click={() => clear()}>C</button>
    <button on:click={() => addAmount(5000)}>5000</button>
    <button on:click={() => addAmount(10000)}>10000</button>
  </div>
  <button
    class="btn variant-filled-primary w-full text-3xl"
    disabled={!confirmEnabled}
    on:click={() => onConfirm && onConfirm(value)}
  >
    Confirmar
  </button>
</div>

<style type="postcss">
  button {
    @apply rounded-lg;
  }
  .n-key button,
  .toggle-operation {
    @apply btn variant-filled-secondary 
    rounded-lg text-3xl
    transition-all duration-500;
  }
</style>
