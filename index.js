
const triggerTimer = () => {
    const present = new Date();
    const end = new Date(2020, 3, 14, 23, 59, 59);
    const diffTime = Math.abs(end - present)/1000;
    const diffDays = Math.floor(diffTime / ( 36e2 * 24)); 
    const diffHours = Math.floor((diffTime / 36e2) % 24 ); 
    const diffMinute= Math.floor((diffTime / 60) % 60 ); 
    const diffSecond = Math.floor(diffTime % 60);
    const timerHtml = `<div><span class='t-value'>${diffDays}</span><br/> days</div>
        <div><span class='t-value'>${diffHours}</span><br/> hrs</div>
        <div><span class='t-value'>${diffMinute}</span><br/> mins</div>
        <div><span class='t-value'>${diffSecond}</span><br/> secs</div>`;
    document.getElementsByClassName('time-left')[0].innerHTML = timerHtml;  
}

const triggerBar = () => {
    const start = new Date(2020, 2, 25, 00, 00, 00);
    const end = new Date(2020, 3, 14, 23, 59, 59);
    const present = new Date();
    const totalDiff =  Math.abs(end - start);
    const presentDiff = Math.abs(present - start);
    document.getElementsByClassName('percent-value')[0].innerHTML = `${(presentDiff/totalDiff * 100).toFixed(4)} %`;
    document.getElementsByClassName('child-bar')[0].style.width = `${(presentDiff/totalDiff * 100).toFixed(0)}%`;
}

const domLoaded = () => {
    setInterval(triggerTimer, 1000)
    setInterval(triggerBar, 1000)
}

document.addEventListener('DOMContentLoaded', domLoaded, false);