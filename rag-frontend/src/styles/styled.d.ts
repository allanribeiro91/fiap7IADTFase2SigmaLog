import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string;
      surface: string;
      surfaceLight: string;
      primary: string;
      text: string;
      muted: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    radius: {
      sm: string;
      md: string;
      lg: string;
    };
  }
}
