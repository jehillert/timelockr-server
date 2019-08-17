# TimeLockr-Server

TimeLockr-Server is the backend of TimeLockr-Client. The project uses NodeJS to provide an Express server, which handles requests from TimeLockr-Client and manages a PostgreSQL database for storing user data.

The project also includes a "console" app, which logs actions taken by the server in response to user interactions with TimeLockr-Client. These actions are output to a popup window in real time using web socket listeners (socket.io), which are embedded at different points along routes of the Express server. When a route containing a listener is activated, the socket sends a message to a react app, which displays the message as a snackbar (Notistack) in the popup window.

__Please note, TimeLockr-Client must be opened on a desktop for the console to appear.__
 If the console does not appear, please check for messages from the browser requesting permission to open a popup window.

