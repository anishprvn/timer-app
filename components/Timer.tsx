// components/Timer.tsx
"use client";
import { Button, ButtonGroup, IconButton, TextField } from '@mui/material';
import { useState, useEffect, ChangeEvent } from 'react';

import AlarmIcon from '@mui/icons-material/Alarm';
import StopIcon from '@mui/icons-material/Stop';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface TimerProps {
  initialSeconds: number;
}

const Timer: React.FC<TimerProps> = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [customTime, setCustomTime] = useState<string>('');

  const formatTime = (seconds: number) => {
    const getHours = Math.floor(seconds / 3600);
    const getMinutes = Math.floor((seconds % 3600) / 60);
    const getSeconds = seconds % 60;
    return `${String(getHours).padStart(2, '0')}:${String(getMinutes).padStart(2, '0')}:${String(getSeconds).padStart(2, '0')}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    } else if (seconds === 0 && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, seconds]);

  const startTimer = () => {
    setIsActive(true);
  };

  const stopTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setSeconds(initialSeconds);
  };

  const setTimer = (minutes: number) => {
    setIsActive(false);
    setSeconds(minutes * 60);
  };

  const handleCustomTimeChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCustomTime(event.target.value);
  };

  const handleCustomTimeSet = () => {
    const totalSeconds = parseInt(customTime, 10) * 60;
    if (!isNaN(totalSeconds)) {
      setTimer(totalSeconds / 60);
    }
  };
  return (
    <div className="timer-container flex flex-col">
      <div className="timer flex">{formatTime(seconds)}</div>
      <ButtonGroup variant="contained" aria-label="Basic button group" className="buttons">
        <Button onClick={startTimer}>
          <IconButton color="error" aria-label="add an alarm">
            <PlayArrowIcon />
          </IconButton>
        </Button>
        <Button onClick={stopTimer}>
        <IconButton color="secondary" aria-label="add an alarm">
            <StopIcon />
          </IconButton>
        </Button>
        <Button onClick={resetTimer}>
        <IconButton color="secondary" aria-label="add an alarm">
            <RestartAltIcon />
          </IconButton></Button>
      </ButtonGroup>
      <ButtonGroup variant='contained' className='mt-1'>
        <Button onClick={() => setTimer(10)}>10 Min</Button>
        <Button onClick={() => setTimer(15)}>15 Min</Button>
      </ButtonGroup>
      <TextField id="standard-basic" label="Custom minutes" variant="filled" type="number"
        value={customTime}
        onChange={handleCustomTimeChange}
        placeholder="Custom minutes" />
      {/* <input
        type="number"
        value={customTime}
        onChange={handleCustomTimeChange}
        placeholder="Custom minutes"
      /> */}
      <Button onClick={handleCustomTimeSet}>Set Custom Time</Button>
      {/* <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button> */}

      <style jsx>{`
        .timer-container {
          justify-content: center;
          align-items: center;
          // height: 40vh;
          // background-color: #282c34;
          color: white;
          font-family: Arial, sans-serif;
        }
        .timer {
          font-size: 10rem;
          height: 30vh;
        }
        .buttons {
          display: flex;
          gap: 2rem;
          margin-top: 15rem;
        }
        .buttons button, .buttons input {
          padding: 1rem 2rem;
          font-size: 1.5rem;
          cursor: pointer;
          border: none;
          border-radius: 5px;
        }
        .buttons input {
          width: 200px;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Timer;
