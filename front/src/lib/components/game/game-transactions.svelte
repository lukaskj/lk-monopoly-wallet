<script lang="ts">
  import type { Transaction } from "$lib/dto";
  import { CurrencyFormatter } from "$lib/helpers/currency-formatter";

  export let transactions: Transaction[];
</script>

<ul class="list p-4">
  {#each transactions as tr}
    <li>
      <span class={`badge  ${tr.operation === 1 ? "bg-success-300 rotate-180" : "bg-error-300"}`}>
        <i class="icon:fall-down"></i>
      </span>
      <span class="flex flex-row w-full justify-between border-2 border-dashed">
        <span>{tr.player.name}</span>
        <span class={tr.operation === 1 ? `text-success-500 font-medium` : `text-error-500 font-medium`}>
          {CurrencyFormatter.format(tr.amount * tr.operation)}
        </span>
      </span>
    </li>
    <hr />
  {/each}
</ul>
