/* eslint-disable global-require */
/*
  Input:
    loggerId (string) -
    fg (hex string) (optional)
    bg (hex string) (optional)

  Output:
    An instance of debugger, formatted with chalk.  The
    namespace of the debugger ('logger') is specified
    by 'loggerId', and formatted according to the fg and bg
    specified by the user. Defaults are used where fg and bg
    are not specified, with different defaults corresponding
    to different loggerId's.

  Re DEBUG environment variable (.env file):
    The character '│' is not found on standard keyboards.
    Please copy/paste if necessary to reproduce elsewhare
    (e.g., the .env file)

  loggerIds:
    controllers, database, helpers, models, routes, server
*/

const chalk = require('chalk');

module.exports = (loggerId, fg, bg) => {
  const fgDefault = '#B2AF9D';
  const bgDefault = '#000000';

  const arrow = '>>>';
  const border = '│';
  const label = loggerId.toUpperCase();

  let fgfc;
  let bgfc;

  if (fg) {
    fgfc = fg;
  }

  if (bg) {
    bgfc = bg;
  }

  // assign default font color if user does not specify one
  if (!fg) {
    switch (loggerId) {
      case 'CONTROLLERS':
        fgfc = '#D0FF00';
        break;
      case 'DATABASE':
        fgfc = '#0a93ff';
        break;
      case 'HELPERS':
        fgfc = '#ff7643';
        break;
      case 'MODELS':
        fgfc = '#0a93ff';
        break;
      case 'SERVER':
        fgfc = '#D0FF00';
        break;
      case 'ROUTES':
        fgfc = '#FF00EE';
        break;
      default:
        fgfc = fgDefault;
    }
  }

  // assign background color if user does not specify one
  if (!bg) {
    bgfc = bgDefault;
  }

  const p = chalk.hex(fgfc).bgHex(bgfc);
  const s = chalk.white.bgHex(bgfc);
  // arrow = chalk.white.bgHex(bgfc)(' >>> ');
  // logger = chalk.hex(fgfc).bgHex(bgfc)(label) + arrow;
  const logger = p(`${border} ${label}`) + s(` ${arrow} `) + p(border);

  return require('debug')(logger);
};
