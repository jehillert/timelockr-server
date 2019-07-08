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

module.exports = function (loggerId, fg, bg) {
  let logger;

  let p; // primary coloring
  let s; // secondary coloring

  const fgDefault = '#B2AF9D';
  const bgDefault = '#000000';

  const arrow = '>>>';
  const border = '│'
  const label = loggerId.toUpperCase();

  // assign default font color if user does not specify one
  if (!fg) {
    switch (loggerId) {
      case 'controllers':
        fg = '#D0FF00';
        break;
      case 'database':
        fg = '#0a93ff';
        break;
      case 'helpers':
        fg = '#ff7643';
        break;
      case 'models':
        fg = '#0a93ff';
        break;
      case 'server':
        fg = '#D0FF00';
        break;
      case 'routes':
        fg = '#FF00EE';
        break;
      default:
        fg = fgDefault;
    }
  }

  // assign background color if user does not specify one
  if (!bg) {
    bg = bgDefault
  }

  p = chalk.hex(fg).bgHex(bg);
  s = chalk.white.bgHex(bg);
  // arrow = chalk.white.bgHex(bg)(' >>> ');
  // logger = chalk.hex(fg).bgHex(bg)(label) + arrow;
  logger = p(`${border} ${label}`) + s(` ${arrow} `) + p(border);

  return require('debug')(logger);

}
