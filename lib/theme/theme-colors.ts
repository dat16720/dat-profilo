export const themeColors = {
  cyan: {
    name: "Cyan",
    light: {
      primary: "6 182 212",
      accent: "168 85 247",
    },
    dark: {
      primary: "34 211 238",
      accent: "192 132 252",
    },
  },
  blue: {
    name: "Blue",
    light: {
      primary: "59 130 246",
      accent: "139 92 246",
    },
    dark: {
      primary: "96 165 250",
      accent: "167 139 250",
    },
  },
  green: {
    name: "Green",
    light: {
      primary: "16 185 129",
      accent: "168 85 247",
    },
    dark: {
      primary: "52 211 153",
      accent: "192 132 252",
    },
  },
  orange: {
    name: "Orange",
    light: {
      primary: "249 115 22",
      accent: "236 72 153",
    },
    dark: {
      primary: "251 146 60",
      accent: "244 114 182",
    },
  },
  pink: {
    name: "Pink",
    light: {
      primary: "236 72 153",
      accent: "168 85 247",
    },
    dark: {
      primary: "244 114 182",
      accent: "192 132 252",
    },
  },
}

export type ThemeColor = keyof typeof themeColors

