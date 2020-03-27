
const triggerTimer = () => {
    const present = new Date();
    const end = new Date(2020, 3, 14, 23, 59, 59);
    const diffTime = Math.abs(end - present)/1000;
    const diffDays = Math.floor(diffTime / ( 36e2 * 24)); 
    const diffHours = Math.floor((diffTime / 36e2) % 24 ); 
    const diffMinute= Math.floor((diffTime / 60) % 60 ); 
    const diffSecond = Math.floor(diffTime % 60);
    const timerHtml = `${diffDays} days : ${diffHours} hrs : ${diffMinute} minutes : ${diffSecond} seconds`;
    document.getElementsByClassName('time-left')[0].innerHTML = timerHtml;  
    console.log(present, end)
}

const domLoaded = () => {
    setInterval(triggerTimer, 1000)
}

document.addEventListener('DOMContentLoaded', domLoaded, false);