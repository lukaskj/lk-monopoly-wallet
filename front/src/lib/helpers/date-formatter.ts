const formatters = {
  BRL: new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }),
};

export class DateFormatter {
  public static format(value: Date): string {
    return formatters["BRL"].format(value);
  }
}
