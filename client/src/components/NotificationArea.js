import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { withSnackbar } from 'notistack';
import { endpoint } from '../config';
import styled from 'styled-components';

const Area = styled.div`
  width: 100vw;
  height: 100vw;
`;
  // overflow-y: scroll;
  // ::-webkit-scrollbar {
  //     display: none;
  //   }
  // -webkit-overflow-scrolling: touch;

function NotificationArea(props) {
  const [data, updateData] = useState(false);
  const [reqData, updateReqData] = useState(false);
  const [delData, updateDeleteData] = useState(false);
  const [putData, updatePutData] = useState(false);
  const [queryData, updateQueryData] = useState(false);
  const [connectionData, updateConnectionData] = useState(false);

  const { enqueueSnackbar } = props;

  useEffect(() => {
    // connect and listen...
    const socket = io(endpoint);
    socket.on('transmission', data => updateData(data));
    socket.on('DELETE', delData => updateDeleteData(delData));
    socket.on('GET', reqData => updateReqData(reqData));
    socket.on('POST', reqData => updateReqData(reqData));
    socket.on('PUT', putData => updatePutData(putData));
    socket.on('query', queryData => updateQueryData(queryData));
    socket.on('connection', connectionData => updateData(connectionData));
  }, []);

  useEffect(() => {
    if (data) {
      enqueueSnackbar(data, {
        variant: 'default',
      })
    }
  }, [enqueueSnackbar, data]);

  useEffect(() => {
    if (delData) {
      enqueueSnackbar(delData, {
        variant: 'error',
      })
    }
  }, [enqueueSnackbar, delData]);

  useEffect(() => {
    if (reqData) {
      enqueueSnackbar(reqData, {
        variant: 'info',
      })
    }
  }, [enqueueSnackbar, reqData]);

  useEffect(() => {
    if (putData) {
      enqueueSnackbar(putData, {
        variant: 'warning',
      })
    }
  }, [enqueueSnackbar, putData]);

  useEffect(() => {
    if (queryData) {
      enqueueSnackbar(queryData, {
        variant: 'error',
      })
    }
  }, [enqueueSnackbar, queryData]);

  return (
    <Area />
  );
}

// export default NotificationArea;
export default React.memo(withSnackbar(NotificationArea));
