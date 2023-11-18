const formatters = {
  BRL: new Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    style: "currency",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }),
};

export class CurrencyFormatter {
  public static format(value: number): string {
    return formatters["BRL"].format(value);
  }
}
