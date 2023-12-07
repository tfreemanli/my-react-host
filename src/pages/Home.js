import { useState, useEffect } from "react";


function Timer() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    return ()=> clearTimeout(setTimeout(()=>setCount((count) => count + 1), 2000)
	)
  }, []);

  return <h1>I've rendered {count} times!</h1>;
}

export default Timer;