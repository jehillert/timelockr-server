import React from 'react';
import GlobalStyle from './style/GlobalStyle.js'
import NotificationArea from './components/NotificationArea'
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #252525;
`;

function App(props) {
  return (
    <AppContainer>
      <SnackbarProvider dense css='white-space: pre-line;'>
      <CssBaseline />
      <GlobalStyle />
      <NotificationArea />
      </SnackbarProvider>
    </AppContainer>
  );
}

export default App;

/*
  enqueueSnackbar(data, {
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'center',
    },
    variant: 'default',
    variant: 'success',
    variant: 'error',
    variant: 'warning',
    variant: 'info',
  });
*/
