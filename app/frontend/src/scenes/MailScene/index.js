import React, { useState, useContext } from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { CssBaseline, Grid, Paper } from '@material-ui/core';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { AuthContext } from '../../hooks/AuthContext';
import { PresentationContext, PresentationContextProvider } from './hooks/PresentationContext';

import AppBarContainer from './containers/AppBarContainer';
import DrawerContainer from './containers/DrawerContainer';

import EmailListingContainer from './containers/EmailListingContainer';
import EmailViewerContainer from './containers/EmailViewerContainer';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  paper: {
    height: '100vh',
  },
}));

const MAILBOX_QUERY = gql`
{
  mailbox {
    email
    labels {
      id
      name
      type
      slug
    }
    threads {
      id
      snippet
    }
  }
}
`;

const MainContainer = ({ match }) => {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  return (
    <Query query={MAILBOX_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>{error.message}</div>;
        if (data.mailbox.threads.length === 0) return <Redirect from='/' to={`/${match.params.mailbox}/sync`} />;

        return (
          <PresentationContextProvider labelSlug={match.params.label} threadId={match.params.id} mailbox={data.mailbox}>
            <div className={classes.root}>

              <CssBaseline />

              <AppBarContainer
                drawerOpen={drawerOpen}
                drawerWidth={240}
                onOpenDrawer={() => setDrawerOpen(true)} onLogout={logout}
              />

              <DrawerContainer
                drawerOpen={drawerOpen}
                drawerWidth={240}
                onCloseDrawer={() => setDrawerOpen(false)}
                labels={data.mailbox.labels}
              />

              <main className={classes.content}>
                <PresentationContext.Consumer>
                  {({ selectedLabel, selectedThread }) => (
                    <React.Fragment>
                      <div className={classes.toolbar} />

                      <Grid container spacing={0} direction="row">
                        <Grid item xs={3}>
                          <Paper square={true} className={classes.paper}>
                            <EmailListingContainer labelId={selectedLabel.id} />
                          </Paper>
                        </Grid>

                        <Grid item xs>
                          {selectedThread && <EmailViewerContainer threadId={selectedThread.id} />}
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  )}
                </PresentationContext.Consumer>
              </main>

            </div>
          </PresentationContextProvider>
        );
      }}
    </Query>
  );
};

const MailScene = () => (
  <Switch>
    <Route exact path="/:mailbox/:label" component={MainContainer} />
    <Route exact path="/:mailbox/:label/:id" component={MainContainer} />
    <Redirect from='/:mailbox' to='/:mailbox/all' />
  </Switch>
);

export default MailScene;
