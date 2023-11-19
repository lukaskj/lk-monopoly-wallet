const formatters = {
  BRL: new Intl.DateTimeFormat("pt-BR", { dateStyle: "short" }),
  BRL_FULL: new Intl.DateTimeFormat("pt-BR", { dateStyle: "medium", timeStyle: "medium" }),
};

export class DateFormatter {
  public static format(value: Date): string {
    return formatters["BRL"].format(value);
  }

  public static formatFull(value: Date): string {
    return formatters["BRL_FULL"].format(value);
  }
}
