import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { withSnackbar } from 'notistack';
import styled from 'styled-components';

const Area = styled.div`
  width: 100vw;
  height: 100vw;
`;

function NotificationArea(props) {
  const [data, updateData] = useState(false);
  const endpoint = 'http://127.0.0.1:5000';
  const { enqueueSnackbar } = props;

  useEffect(() => {
    // connect and listen...
    const socket = io(endpoint);
    socket.on('transmission', data => updateData(data));
    socket.on('server request', data => updateData(data));
    socket.on('database query', data => updateData(data));
    socket.on('database response', data => updateData(data));
    socket.on('server response', data => updateData(data));
    // socket.on('connection', data => updateData(data));
  }, []);

  useEffect(() => {
    // display data received
    if (data) {
      enqueueSnackbar(data, {
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
        },
        variant: 'default',
      })
    }
  }, [enqueueSnackbar, data]);

  return (
    <Area />
  );
}

// export default NotificationArea;
export default withSnackbar(NotificationArea);
