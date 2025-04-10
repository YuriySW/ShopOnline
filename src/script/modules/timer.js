if (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html')) {
  const timer = document.querySelector('.timer');
  if (timer) {
    const bannerText = document.querySelector('.banner-text');
    const endPromotion = document.querySelector('.end-promotion');
    const deadline = timer.getAttribute('data-timer-deadline');
    const deadlineDate = new Date(deadline);
    deadlineDate.setHours(deadlineDate.getHours() + 3);

    const getTimeRemaining = (endtime) => {
      const t = Date.parse(endtime) - Date.parse(new Date());
      const seconds = Math.floor((t / 1000) % 60);
      const minutes = Math.floor((t / 1000 / 60) % 60);
      const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      const days = Math.floor(t / (1000 * 60 * 60 * 24));

      return {
        total: t,
        days,
        hours,
        minutes,
        seconds,
      };
    };

    const getDeclension = (num, singular, few, many) => {
      if (num % 10 === 1 && num % 100 !== 11) {
        return singular;
      }
      if ([2, 3, 4].includes(num % 10) && ![12, 13, 14].includes(num % 100)) {
        return few;
      }
      return many;
    };

    const getDaysWord = (days) => getDeclension(days, 'день', 'дня', 'дней');
    const getHoursWord = (hours) => getDeclension(hours, 'час', 'часа', 'часов');
    const getMinutesWord = (minutes) => getDeclension(minutes, 'минута', 'минуты', 'минут');
    const getSecondsWord = (seconds) => getDeclension(seconds, 'секунда', 'секунды', 'секунд');

    const start = (endtime) => {
      timer.innerHTML = `
      <time class="timer" datetime="3d 8h 43m"
      ><span class="timer-num timer-num-days">3</span
      ><span class="timer-days-word">дня</span>
      <span class="timer-num timer-num-hours">8</span
      ><span class="timer-hours-word">часов</span>
      <span class="timer-num timer-num-minute">43</span
      ><span class="timer-minute-word">минуты</span></time
    >
           `;

      const timerNumDays = document.querySelector('.timer-num-days');
      const timerDaysWord = document.querySelector('.timer-days-word');
      const timerNumHours = document.querySelector('.timer-num-hours');
      const timerHoursWord = document.querySelector('.timer-hours-word');
      const timerNumMinute = document.querySelector('.timer-num-minute');
      const timerMinuteWord = document.querySelector('.timer-minute-word');
      let timeinterval;
      const updateTimer = () => {
        const t = getTimeRemaining(endtime);

        timerNumDays.textContent = t.days;
        timerNumHours.textContent = String(t.hours).padStart(2, '0');
        timerNumMinute.textContent = String(t.minutes).padStart(2, '0');

        timerDaysWord.textContent = getDaysWord(t.days);
        timerHoursWord.textContent = getHoursWord(t.hours);
        timerMinuteWord.textContent = getMinutesWord(t.minutes);

        if (t.days === 0) {
          timerNumDays.textContent = String(t.hours).padStart(2, '0');
          timerDaysWord.textContent = getHoursWord(t.hours);
          timerNumHours.textContent = String(t.minutes).padStart(2, '0');
          timerHoursWord.textContent = getMinutesWord(t.minutes);
          timerNumMinute.textContent = String(t.seconds).padStart(2, '0');
          timerMinuteWord.textContent = getSecondsWord(t.seconds);
        }
        if (t.total <= 0 || t.days < 0 || t.hours < 0 || t.minutes < 0 || t.seconds < 0) {
          clearInterval(timeinterval);
          bannerText.style.visibility = 'hidden';
          endPromotion.style.visibility = 'hidden';
          timerNumDays.style.visibility = 'hidden';
          timerDaysWord.style.visibility = 'hidden';
          timerNumHours.style.visibility = 'hidden';
          timerHoursWord.style.visibility = 'hidden';
          timerNumMinute.style.visibility = 'hidden';
          timerMinuteWord.style.visibility = 'hidden';
        }
      };

      updateTimer();
      timeinterval = setInterval(updateTimer, 1000);
    };
    start(deadlineDate);
  }
}
