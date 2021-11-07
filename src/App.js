import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {connect} from 'react-redux';
import { fetchBudget } from "data/actions/budgetActions";

import theme from "utils/theme";

import { Button, LoadingIndicator, Navigation, Wrapper } from "components";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

function App({ budget, fetchBudget }) {
  const { i18n } = useTranslation();
  useEffect(() => {
    fetchBudget(1);
  }, [])
  console.log('budget ', budget);
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

const ConnectedApp = connect(state => {
  return{
    budget: state.budget.budget,
  }
}, {
  fetchBudget,
})(App);

function RootApp() {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<LoadingIndicator />}>
        <ConnectedApp />
      </React.Suspense>
    </ThemeProvider>
  );
}

export default RootApp;
