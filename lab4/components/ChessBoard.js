import React, {useEffect, useRef} from 'react';
import Chessboard from 'react-native-chessboard';
import {View} from 'react-native';
import { BACKEND_URL } from "../constants/constant";

function ChessBoard({}) {
  const ref = useRef();

  useEffect(() => {
    (async () => {
      // await ref.current?.move({from: 'e2', to: 'e4'});
      // await ref.current?.move({from: 'e7', to: 'e5'});
      // await ref.current?.move({from: 'd1', to: 'f3'});
      // await ref.current?.move({from: 'a7', to: 'a6'});
      // await ref.current?.move({from: 'f1', to: 'c4'});
      // await ref.current?.move({from: 'a6', to: 'a5'});
      // await ref.current?.move({ from: 'f3', to: 'f7' });
      await fetch(BACKEND_URL).then(res => res.json()).then(res => console.log(res));
    })();
  }, []);

  // setInterval( () => {
  //   if(ref.current){
  //     console.log(ref.current.getState());
  //   }
  // }, 5000);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Chessboard ref={ref} gestureEnabled={true} onMove={(state) => {
        console.log(state, 'move');
      }}/>
    </View>
  );
}

export default ChessBoard;
