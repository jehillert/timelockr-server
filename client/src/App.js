import React from 'react';
import GlobalStyle from './style/GlobalStyle.js'
import NotificationArea from './components/NotificationArea'
import CssBaseline from '@material-ui/core/CssBaseline';
import styled from 'styled-components';
import { SnackbarProvider } from 'notistack';

const S = {};

S.Header = styled.div`
background-color: red;
  grid-area: gta-header;
  height: 2rem;
`;

S.Sidebar1 = styled.div`
  background-color: #75C4FF;
  grid-area: gta-sidebar1;
  height: 5rem;
`;

S.NotificationArea = styled(NotificationArea)`
  background-color: yellow;
  grid-area: gta-notification-area;
  height: 5rem;
  min-width: 5rem;
`;

S.Sidebar2 = styled.div`
  background-color: #B1FCD9;
  grid-area: gta-sidebar2;
  height: 5rem;
`;

S.Footer = styled.div`
  background-color: #FFD19B;
  grid-area: gta-footer;
  height: 5rem;
`;

function App(props) {
  return (
    <div className={'grid-desktop'}>
      <SnackbarProvider dense>
      <CssBaseline />
      <GlobalStyle />
      <S.Header />
      <S.Sidebar1 />
      <S.NotificationArea />
      <S.Sidebar2 />
      <S.Footer />
      </SnackbarProvider>
    </div>
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
