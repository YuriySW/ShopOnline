import {start, deadlineDate} from './modules/timer.js';

{
  const init = () => {
    start(deadlineDate);
  };

  window.timerInit = init;
}
