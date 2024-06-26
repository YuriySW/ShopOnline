import {start, deadlineDate} from './modules/timer.js';
import './modules/data.js';

{
  const init = () => {
    start(deadlineDate);
  };

  window.timerInit = init;
}
