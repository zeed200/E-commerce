import Bottom from './componenets/header/Bottom';
import Middle from './componenets/header/Middle';
import Top from './componenets/header/Top';
import Hero from "./componenets/hero/Hero";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import ScrollToTop from "./componenets/scroll/ScrollToTop";
import Main from "./componenets/main/Main";
import Footer from "./componenets/footer/footer";



function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Top />
        <Middle />
        <Bottom />

        <Box bgcolor={theme.palette.bg.main}>
          <Hero />
          <Main />
        </Box>

       <Footer />
      <ScrollToTop />
      </ThemeProvider>
    </ColorModeContext.Provider>

  )
}

export default App;