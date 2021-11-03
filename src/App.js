import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./index.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import theme from "utils/theme";

import { Navigation, Wrapper } from "components";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Navigation
          items={[
            { content: "Homepage", to: "/" },
            { content: "Budget", to: "/budget" },
          ]}
          RightElement={(
            <div>
              <button>pl</button>
              <button>el</button>
            </div>
          )}
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
    </ThemeProvider>
  );
}

export default App;
