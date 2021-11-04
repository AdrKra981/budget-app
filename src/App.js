import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import theme from "utils/theme";

import { Button, LoadingIndicator, Navigation, Wrapper } from "components";
import React from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();
  return (
    <>
      <GlobalStyles />
      <Router>
        <Navigation
          items={[
            { content: "Homepage", to: "/" },
            { content: "Budget page", to: "/budget" },
          ]}
          RightElement={
            <div>
              <Button onClick={() => i18n.changeLanguage("pl")}>pl</Button>
              <Button onClick={() => i18n.changeLanguage("en")}>en</Button>
            </div>
          }
        />

        <Wrapper>
          <Switch>
            <Route exact path="/">
              Homepage
            </Route>
            <Route path="/budget">Budget</Route>
          </Switch>
        </Wrapper>
      </Router>
    </>
  );
}

function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <App />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default RootApp;
