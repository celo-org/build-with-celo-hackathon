import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import React, { PropsWithChildren, useContext, useEffect } from "react";

const FontUrl = "/fonts/euclid-circular-a-cufonfonts/Euclid Circular A";
const FontFormat = "truetype";

export const CustomThemeContext = React.createContext<{
  theme?: boolean;
  setTheme: (active?: boolean) => void;
}>({
  theme: undefined,
  setTheme: () => {},
});
export const CustomThemeProvider = (props: PropsWithChildren<{}>) => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [theme, setTheme] = React.useState(prefersDarkMode);
  const themeString = (b: boolean) => (b ? "dark" : "light");
  const switchTheme = (checked: boolean) => {
    console.log(checked);
    if (checked === null) setTheme(theme);
    else setTheme(checked);
  };
  const { children } = props;
  const mTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeString(theme),
        },
        typography: {
          fontFamily: "Euclid Circular A",
        },
        components: {
          MuiCssBaseline: {
            styleOverrides: `
              @font-face {
                font-family: 'Euclid Circular A';
                font-style: normal;
                font-display: swap;
                font-weight: 400,500;
                src: url("${FontUrl} Regular.ttf"), 
                url("${FontUrl} Regular.ttf") format(${FontFormat}),
                url("${FontUrl} Bold.ttf") format(${FontFormat}),
                url("${FontUrl} Bold Italic.ttf") format(${FontFormat}),
                url("${FontUrl} Italic.ttf") format(${FontFormat}),
                url("${FontUrl} Light Italic.ttf") format(${FontFormat}),
                url("${FontUrl} Light.ttf") format(${FontFormat}),
                url("${FontUrl} Medium Italic.ttf") format(${FontFormat}),
                url("${FontUrl} Medium.ttf") format(${FontFormat}),
                url("${FontUrl} SemiBold Italic.ttf") format(${FontFormat}),
                url("${FontUrl} SemiBold.ttf") format(${FontFormat}), ;
                unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
              }
            `,
          },
        },
      }),
    [theme]
  );
  useEffect(() => {
    theme ? document.body.classList.add("tw-dark") : document.body.classList.remove("tw-dark");
  }, [theme]);
  return (
    <CustomThemeContext.Provider
      value={{
        theme,
        setTheme: switchTheme,
      }}
    >
      <ThemeProvider theme={mTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CustomThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(CustomThemeContext);
