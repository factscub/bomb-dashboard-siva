import React from 'react';
import useBombFinance from './useBombFinance';

const useBoardroomTVL=()=>{

    const [boardroomTVL,setBoardroomTVL]=React.useState<Number>(0);
    const bombFinance =useBombFinance();

    React.useEffect(()=>{

        async function fetchTVL() {
            try {
              setBoardroomTVL(await bombFinance.getboardroomTVL());
            } catch (err) {
              console.error(err);
            }
          }
          fetchTVL();
    },[boardroomTVL,bombFinance]);

return boardroomTVL;
}

export default useBoardroomTVL;