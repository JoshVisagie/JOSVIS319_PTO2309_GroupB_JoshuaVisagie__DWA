import {
  Button,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Grid,
  Grommet,
  Header,
  Heading,
  Page,
  Paragraph,
  PageContent,
  PageHeader,
  Text,
  ResponsiveContext,
} from "grommet";

import { Moon, Sun } from "grommet-icons";

import "./App.css";
import theme from "./theme.tsx";
import React, { useContext, useState } from "react";

const AppBar = (props) => (
  <Header
    background='brand'
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation='small'
    {...props}
  />
);
const CardTemplate = ({ title }) => {
  const size = useContext(ResponsiveContext)
  return (
    <Card>
      <CardHeader pad='medium'>
        <Heading level={2} margin='none'>
          {title}
        </Heading>
      </CardHeader>
      <CardBody pad='medium'>
        <Paragraph maxLines={size==="small"? 3: undefined}>
         {size}
        </Paragraph>
      </CardBody>
      <CardFooter pad='medium' background='background-contrast'>
        Footer
      </CardFooter>
    </Card>
  );
};

function App() {
  const [dark, setDark] = useState(false);

  return (
    <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
      <Page>
        <AppBar>
          <Text size='large'>My App</Text>
        </AppBar>
        <Button
          a11yTitle={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          icon={dark ? <Moon /> : <Sun />}
          onClick={() => setDark(!dark)}
          tip={{
            content: (
              <Box
                pad='small'
                round='small'
                background={dark ? "dark-1" : "light-3"}
              >
                {dark ? "switch to dark mode" : "switch to light mode"}
              </Box>
            ),
          }}
        />
        <Grid columns="medium"  gap="large" pad={{bottom:"large"}}>
          <CardTemplate title={"Card 1"} />
          <CardTemplate title={"Card 2"} />
          <CardTemplate title={"Card 3"} />
        </Grid>
      </Page>
    </Grommet>
  );
}

export default App;
