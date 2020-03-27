
const triggerTimer = () => {
    const present = new Date();
    const end = new Date(2020, 3, 14, 23, 59, 59);
    const diffTime = Math.abs(end - present);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); 
    const diffHours = Math.floor((diffTime / (1000 * 60 * 60 )) % 60); 
    const diffMinute= Math.floor((diffTime / (1000 * 60)) % 60 ); 
    const diffSecond = Math.floor((diffTime / 1000 ) % 60)
    const timerHtml = `${diffDays} days : ${diffHours} hrs : ${diffMinute} minutes : ${diffSecond} seconds`;
    document.getElementsByClassName('time-left')[0].innerHTML = timerHtml;  
}

const domLoaded = () => {
    setInterval(triggerTimer, 1000)
}

document.addEventListener('DOMContentLoaded', domLoaded, false);