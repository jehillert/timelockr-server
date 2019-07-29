import React from 'react';
import GlobalStyle from './style/GlobalStyle.js'
import NotificationArea from './components/NotificationArea'
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { StylesProvider } from '@material-ui/styles';
import styled from 'styled-components';

const S = {};

S.AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #252525;
`;

S.SnackbarProvider = styled(SnackbarProvider)`
  white-space: pre-line;
`;

function App(props) {
  return (
    <S.AppContainer>
      <CssBaseline />
      <GlobalStyle />
        <StylesProvider injectFirst>
        <S.SnackbarProvider
          maxSnack={7}
          dense
          hideIconVariant={true}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <NotificationArea />
        </S.SnackbarProvider>
        </StylesProvider>
    </S.AppContainer>
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
