import { Button } from "antd";
import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";

function App() {
  const timerRef = useRef(null);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [running, setRunning] = useState(false);
  const [lab, setLab] = useState([]);

  const changeSecond = (previous) => {
    if (previous === 59) {
      setMinute(changeMinute);
      return 0;
    }

    return previous + 1;
  };

  const changeMinute = () => {
    if (previous === 59) {
      setHour((previous) => {
        return previous + 1;
      });
      return 0;
    }

    return previous + 1;
  };

  useEffect(() => {
    if (running)
      timerRef.current = setInterval(() => {
        setSecond(changeSecond);
      }, 1000);
    else clearInterval(timerRef.current);
  }, [running]);

  const reset = () => {
    setSecond(0);
    setMinute(0);
    setHour(0);
  };

  const onLab = () => {
    setLab((previous) => {
      return [
        ...previous,
        {
          hour,
          minute,
          second,
          id: v4(),
        },
      ];
    });
  };

  return (
    <div id="main" className="flex items-center justify-center">
      <div className="w-[500px] h-[500px] bg-orange-500 mt-52">
        <div className="flex justify-center gap-[10px] text-7xl w-full mt-[20px]">
          <h3> {hour}</h3>:<h3>{minute}</h3>:<h3>{second}</h3>
        </div>

        <div className="w-[80%] m-auto flex justify-between mt-[20px]">
          <Button type="primary" onClick={onLab}>
            Lab
          </Button>
          {running ? (
            <Button onClick={() => setRunning(false)}>Pause</Button>
          ) : (
            <Button onClick={() => setRunning(true)}>Start</Button>
          )}
          <Button onClick={reset} danger type="primary">
            Restart
          </Button>
        </div>

        <div className="w-full flex gap-4 flex-col items-center mt-3">
          {lab.map(({ id, hour, minute, second }) => {
            return (
              <div key={id} className="flex items-center">
                <h3>{hour}</h3>:<h3>{minute}</h3>:<h3>{second}</h3>
              </div>
            );
          })}
          {lab?.length && <Button>Resert</Button>}
        </div>
      </div>
    </div>
  );
}
export default App;
