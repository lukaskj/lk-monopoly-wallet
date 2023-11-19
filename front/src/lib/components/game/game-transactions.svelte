<script lang="ts">
  import type { Transaction } from "$lib/dto";
  import { CurrencyFormatter } from "$lib/helpers/currency-formatter";

  export let transactions: Transaction[];
</script>

<ul class="list p-4">
  {#each transactions as tr}
    <li>
      <span class={`badge  ${tr.operation === 1 ? "bg-success-300" : "bg-error-300"}`}>
        {#if tr.operation === 1}
          <i class="icon:arrow-up-bold"></i>
        {:else}
          <i class="icon:arrow-down-bold"></i>
        {/if}
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
