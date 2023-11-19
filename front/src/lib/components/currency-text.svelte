<script lang="ts">
  export let value: number;
  export let positiveClass = "amount-positive";
  export let negativeClass = "amount-negative";

  $: classToApply = value > 0 ? positiveClass : value < 0 ? negativeClass : "";

  const currencyFormatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
</script>

<span class={classToApply}>{currencyFormatter.format(value)}</span>
