//List of players who are playing
const playerArray = [
    { name: 'Abhishek', nickName:'Jehrilla Saanp', id: 'AJ', num: 0 },
    { name: 'Sonali', nickName:'Natkhat Khargosh', id: 'SJ', num: 1 },
    { name: 'Varsha', nickName:'Gogo Ghariyal', id: 'VJ', num: 2 },
    { name: 'Keshav', nickName:'Naughty Nevla', id: 'KT', num: 3 },
    { name: 'Saurabh', nickName:'Pankaj Panda', id: 'SSJ', num: 4 },
    { name: 'Aishwaryah', nickName:'Birpuria Bagh', id: 'AM', num: 5 },
    { name: 'Chanchal', nickName:'Rangeela Rohu', id: 'CJ', num: 6 },
    { name: 'Nikhil', nickName:'Bhaukali Bhalu', id: 'NT', num: 7 }
];

const populatePlayerList = () => {
    const html = playerArray.map(item => (
        `<div class="input-group mb-3">
            <span class="input-group-text"><input class="form-check-input" type="checkbox" value=${item.id} checked></span>
            <span class="input-group-text">${item.nickName}</span>
            <input type="text" class="form-control player-rank" placeholder="Enter player rank"/>
        </div>`
    ))
    document.querySelector('.update-player-list-group').innerHTML = html.join('');
}

const authenticateUser = () => {
    const userName = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    populatePlayerList();
    if(userName=== '' && password === '') {
        document.querySelector('.login-card').classList.add('d-none');
        document.querySelector('.match-detail-card').classList.remove('d-none');
        document.querySelector('.player-rank-card').classList.remove('d-none');
        populatePlayerList();
    } else {
        document.querySelector('.incorrect-detail').classList.remove('d-none');
        document.querySelector('.match-detail-card').classList.add('d-none');
        document.querySelector('.player-rank-card').classList.add('d-none');
    }
}