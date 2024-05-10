import { Button, Modal, Input } from "antd";
import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
// import Appp from "./Modal";

function App() {
  const timerRef = useRef(null);
  const [millisecond, setMillisecond] = useState(0);
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [running, setRunning] = useState(false);
  const [lab, setLab] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const changeMillisecond = (oldMillisecond) => {
    if (oldMillisecond === 999) {
      setMillisecond(0);
      setSecond((oldSecond) => changeSecond(oldSecond));
      return 0;
    }

    return oldMillisecond + 1;
  };

  const changeSecond = (oldSecond) => {
    if (oldSecond === 59) {
      setMinute((oldMinute) => changeMinute(oldMinute));
      return 0;
    }

    return oldSecond + 1;
  };

  const changeMinute = (oldMinute) => {
    if (oldMinute === 59) {
      setHour((oldHour) => oldHour + 1);
      return 0;
    }

    return oldMinute + 1;
  };

  // const worker = new Worker("worker.js");
  // worker.postMessage({ interval: 0.001 });

  // self.onmessage = function (e) {
  //   setInterval(() => {}, e.data.interval);
  // };

  useEffect(() => {
    if (running)
      timerRef.current = setInterval(() => {
        setMillisecond((oldMillisecond) => changeMillisecond(oldMillisecond));
      }, 1);
    else clearInterval(timerRef.current);
  }, [running]);

  const reset = () => {
    setMillisecond(0);
    setSecond(0);
    setMinute(0);
    setHour(0);
  };

  const resetLabs = () => {
    setLab([]);
  };

  // const onLab = () => {
  //   setLab((oldLab) => [
  //     ...oldLab,
  //     {
  //       hour,
  //       minute,
  //       second,
  //       millisecond,
  //       id: v4(),
  //     },
  //   ]);
  // };

  const onLab = () => {
    setShowInput(true);
  };

  const addLab = () => {
    if (userName.trim() !== "") {
      setLab((oldLab) => [
        ...oldLab,
        {
          hour,
          minute,
          second,
          millisecond,
          userName,
          id: v4(),
        },
      ]);
      setShowInput(false);
      setUserName("");
    }
  };

  return (
    <>
      <div id="main" className="flex items-center justify-center">
        <div className="w-[500px] h-[500px] bg-blue-800 mt-52">
          <div className="flex justify-center gap-[10px] text-7xl w-full mt-[20px]">
            <h3>
              {hour < 10 ? `0${hour}` : hour}:
              {minute < 10 ? `0${minute}` : minute}:
              {second < 10 ? `0${second}` : second}.
              {millisecond < 10
                ? `00${millisecond}`
                : millisecond < 100
                ? `0${millisecond}`
                : millisecond}
            </h3>
          </div>

          <div className="w-[80%] m-auto flex justify-between mt-[20px]">
            {/* <Button type="primary" onClick={onLab}>
              Lab
            </Button> */}
            {showInput ? (
              <Input
                placeholder="Ismingizni kiriting"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            ) : (
              <Button type="primary" onClick={onLab}>
                Lab
              </Button>
            )}
            {showInput && (
              <Button type="primary" onClick={addLab}>
                Add
              </Button>
            )}

            {running ? (
              <Button onClick={() => setRunning(false)}>Pause</Button>
            ) : (
              <Button onClick={() => setRunning(true)}>Start</Button>
            )}
            <Button onClick={showModal} danger type="primary">
              Restart
            </Button>
            <Modal
              title="Time Modal"
              open={isModalOpen}
              onOk={reset}
              onCancel={handleCancel}
            >
              <p>Foydalanuvci...Rostan ham vaqtingiz yangilansinmi?...</p>
            </Modal>
          </div>

          <div className="w-full flex gap-4 flex-col items-center mt-3">
            {/* {lab.map(({ id, hour, minute, second, millisecond }) => {
              return (
                <div key={id} className="flex items-center">
                  <h3>
                    {hour < 10 ? `0${hour}` : hour}:
                    {minute < 10 ? `0${minute}` : minute}:
                    {second < 10 ? `0${second}` : second}.
                    {millisecond < 10
                      ? `00${millisecond}`
                      : millisecond < 100
                      ? `0${millisecond}`
                      : millisecond}
                  </h3> */}
            {lab.map(({ id, hour, minute, second, millisecond, userName }) => {
              return (
                <div key={id} className="flex items-center">
                  <h3>
                    {hour < 10 ? `0${hour}` : hour}:
                    {minute < 10 ? `0${minute}` : minute}:
                    {second < 10 ? `0${second}` : second}.
                    {millisecond < 10
                      ? `00${millisecond}`
                      : millisecond < 100
                      ? `0${millisecond}`
                      : millisecond}{" "}
                    - {userName}
                  </h3>
                </div>
              );
            })}
            {lab.length > 0 && (
              <Button
                onClick={() => {
                  resetLabs();
                }}
              >
                Reset
              </Button>
            )}
          </div>
        </div>
      </div>
      {/* <Appp></Appp> */}
    </>
  );
}
export default App;
