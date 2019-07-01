import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #252525;
    color: #839496;
    font-family: [
      '-apple-system',
      BlinkMacSystemFont,
      'Segoe UI',
      Roboto,
      'Helvetica Neue',
      Arial,
      sans-serif,
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
    ];
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-size: 16px;
  }

  .grid-desktop {
    display: grid;
    grid-column-gap: 0;
    grid-template-areas:
      "gta-header gta-header gta-header"
      "gta-sidebar1 gta-notification-area gta-sidebar2"
      "gta-footer gta-footer gta-footer";
    grid-template-rows: auto auto 1fr;
    grid-template-columns: 1fr auto 1fr;
  }
`;
    // width: 100vw;
    // height: 100vh;

export default GlobalStyle;
