/* eslint-disable perfectionist/sort-imports */
import { useScrollToTop } from "../src/backoffice/hooks/use-scroll-to-top";
import axios from "axios";

import Router from "../src/routes/sections";
import ThemeProvider from "../src/theme";

// ----------------------------------------------------------------------

export default function App() {
  axios.defaults.withCredentials = true;
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
