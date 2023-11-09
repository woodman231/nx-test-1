import React, { useContext } from 'react';
import { SocketContext } from '../socket';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setBytesReceived, incrementBytesReceived } from '../store/reducer/slices/bytesReceivedReducer';
import { setBytesToReceive } from '../store/reducer/slices/bytesToReceiveReducer';
import { setDataReceived } from '../store/reducer/slices/dataReceivedReducer';
import * as bytes from 'bytes';
import { useStreamDataQuery } from "../store/reducer/api/index";

const { ss } = window;

export function App() {

  const socket = useContext(SocketContext);
  const { bytesReceived, bytesToReceive, dataReceived } = useSelector((state: RootState) => state);
  const dispatch = useDispatch<AppDispatch>();

  const { data, error } = useStreamDataQuery();

  React.useEffect(() => {
    console.log( "useeffect data or error changed", {data, error});
  }, [data, error])

  const handleClick = () => {
    let lengthReceived = false;
    let length = 0;
    let dataReceived = '';

    dispatch(setBytesToReceive(length));
    dispatch(setBytesReceived(dataReceived.length));
    dispatch(setDataReceived(dataReceived));

    const stream = ss.createStream();

    stream.on('data', (data: Uint8Array) => {
      if (!lengthReceived) {
        length += data[0] << 24;
        length += data[1] << 16;
        length += data[2] << 8;
        length += data[3];
        lengthReceived = true;
        dispatch(setBytesToReceive(length));
      } else {
        dataReceived += String.fromCharCode(data[0]);
        dispatch(incrementBytesReceived());
      }
    });

    stream.on('end', () => {
      console.log(`Received message of length ${length}: ${dataReceived}`);
      dispatch(setDataReceived(dataReceived));
    });

    ss(socket).emit('greetings', stream);
  }

  return (
    <div>
      <p>Hello World!</p>
      <button onClick={handleClick}>Request Greeting</button>
      <p>Bytes to receive: {bytes(bytesReceived.value)}</p>
      <p>Bytes received: {bytes(bytesToReceive.value)}</p>
      <p>Data received: {dataReceived.value}</p>
    </div>
  );
}

export default App;