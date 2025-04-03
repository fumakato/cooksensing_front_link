// // utils.ts
// export const VwToPx = (): number => {
//   const windowHeight = window.innerHeight;
//   const vhValue = 0.01 * windowHeight;
//   return vhValue;
// };

// hooks/useWindowVw.ts
import { useState, useEffect } from "react";

export const VwToPx = (): number => {
  const [vw, setVw] = useState<number>(0);

  useEffect(() => {
    const updateVwInPx = () => {
      const windowWidth = window.innerWidth;
      const vwValue = 0.01 * windowWidth;
      setVw(vwValue);
    };

    // 初回実行
    updateVwInPx();

    // リサイズ時にも更新する
    window.addEventListener("resize", updateVwInPx);

    // クリーンアップ関数
    return () => {
      window.removeEventListener("resize", updateVwInPx);
    };
  }, []);

  return vw;
};

//
// 以下使用例
//
// import React, { useState, useEffect } from 'react';
// import { getVhInPx } from "./../components";

// const VhToPxComponent: React.FC = () => {
//   const [vhInPx, setVhInPx] = useState<number>(0);

//   useEffect(() => {
//     const updateVhInPx = () => {
//       const vhValue = getVhInPx();
//       const pxValue = 50 * vhValue; // 例えば50vhをpxに変換
//       setVhInPx(pxValue);
//     };

//     // 初回実行
//     updateVhInPx();

//     // リサイズ時にも更新する
//     window.addEventListener('resize', updateVhInPx);

//     // クリーンアップ関数
//     return () => {
//       window.removeEventListener('resize', updateVhInPx);
//     };
//   }, []);

//   return (
//     <div>
//       <p>50vh is approximately {vhInPx}px</p>
//       <div style={{ height: vhInPx, backgroundColor: 'lightblue' }}>
//         This div is 50vh tall.
//       </div>
//     </div>
//   );
// };

// export default VhToPxComponent;
