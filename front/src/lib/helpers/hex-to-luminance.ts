export function hexToLuminance(hexColor: string): number {
  const hex = hexColor.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return [0.299 * r, 0.587 * g, 0.114 * b].reduce((a, b) => a + b) / 255;
}

export function fontColorFromBgColor(hexColor: string): string {
  return hexToLuminance(hexColor) < 0.5 ? "#F0F0F0" : "#0d0d0d";
}
