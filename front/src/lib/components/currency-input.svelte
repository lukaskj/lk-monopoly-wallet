<script lang="ts">
  import { isNullOrEmptyOrUndefined, isNullOrUndefined } from "../helpers/is-null-or-undefined";

  const DEFAULT_LOCALE = "pt-BR";
  const DEFAULT_CURRENCY = "BRL";
  const DEFAULT_NAME = "amount";
  const DEFAULT_VALUE = 0;
  const DEFAULT_FRACTION_DIGITS = 2;
  const DECIMAL_SEPARATOR = ",";
  const THOUSANDS_SEPARATOR = ".";
  const POSITIVE_CLASS = "amount-positive";
  const NEGATIVE_CLASS = "amount-negative";
  const ZERO_CLASS = "";
  const DEFAULT_CLASS = "input";

  export let value: number = DEFAULT_VALUE;
  export let locale: string = DEFAULT_LOCALE;
  export let currency: string = DEFAULT_CURRENCY;
  export let name: string = DEFAULT_NAME;
  export let required: boolean = false;
  export let disabled: boolean = false;
  export let fractionDigits: number = DEFAULT_FRACTION_DIGITS;
  export let placeholder: string = formatCurrency(0, fractionDigits, fractionDigits);
  export let className = "";
  export let decimalSeparator: string = DECIMAL_SEPARATOR;
  export let thousandsSeparator: string = THOUSANDS_SEPARATOR;
  export let positiveClass = POSITIVE_CLASS;
  export let negativeClass = NEGATIVE_CLASS;
  export let zeroClass = ZERO_CLASS;

  export let internalValue = placeholder;

  function formatCurrency(value: number, maximumFractionDigits?: number, minimumFractionDigits?: number) {
    return new Intl.NumberFormat(locale, {
      currency: currency,
      style: "currency",
      maximumFractionDigits: maximumFractionDigits || 0,
      minimumFractionDigits: minimumFractionDigits || 0,
    }).format(value);
  }

  function input(valueNumber: number) {
    internalValue = formatCurrency(valueNumber, fractionDigits, fractionDigits);
  }

  function onBlur() {
    let valueToTransform = 0;
    if (isNullOrEmptyOrUndefined(internalValue)) {
      value = valueToTransform;
      return valueToTransform;
    }

    const tempValue = internalValue
      .replace(new RegExp("\\" + thousandsSeparator, "g"), "")
      .replace(new RegExp("\\" + decimalSeparator), ".")
      .replace(/[^\d\.]/g, "");

    valueToTransform = parseFloat(tempValue);
    if (isNaN(valueToTransform)) {
      valueToTransform = 0;
    }

    value = parseFloat(valueToTransform.toFixed(2));
    internalValue = formatCurrency(valueToTransform, fractionDigits, fractionDigits);
  }

  $: input(value);
</script>

<input
  type="text"
  class={`${DEFAULT_CLASS} ${className} ${value > 0 ? positiveClass : value < 0 ? negativeClass : zeroClass}`}
  {name}
  {disabled}
  {required}
  {placeholder}
  bind:value={internalValue}
  on:paste={onBlur}
  on:change={onBlur}
/>

<style>
  input {
    text-align: right;
  }
</style>
