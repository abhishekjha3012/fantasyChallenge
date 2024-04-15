//This funcion is triggered on DOM load and loads default charts on dashbaord.
let allYearMatchData= [];

//List of players who are playing
const playerArray = [
    { name: 'Abhishek', nickName:'Jehrilla Saanp', id: 'AJ', num: 0, color: '#B1FFAD', imageAddress: 'asset/AJ.jpeg' },
    { name: 'Sonali', nickName:'Natkhat Khargosh', id: 'SJ', num: 1, color: '#FF9077', imageAddress: 'https://stickerly.pstatic.net/sticker_pack/JoOAsHhrZM342DXak4nYQ/HIZAPW/2/bea565ec-c108-4808-b041-6ebe2924b12c.png' },
    { name: 'Varsha', nickName:'Gogo Ghariyal', id: 'VJ', num: 2, color: '#8E9DFF', imageAddress: 'https://stickerly.pstatic.net/sticker_pack/CWqJyA7W1seavKQUFJ7A/3WATSW/16/5bade8dc-d62e-41d8-b0ee-358bde44a10e.png' },
    { name: 'Keshav', nickName:'Naughty Nevla', id: 'KT', num: 3, color: '#566573', imageAddress: 'asset/KT.gif' },
    { name: 'Saurabh', nickName:'Pankaj Panda', id: 'SSJ', num: 4, color: '#F7FF8E', imageAddress: 'asset/SSJ.png' },
    { name: 'Aishwaryah', nickName:'Birpuria Bagh', id: 'AM', num: 5, color: '#8EFFF7', imageAddress: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-gfQe8gjby3PROpW_GW0K2-3OjoVXYM_EvA&usqp=CAU' },
    { name: 'Chanchal', nickName:'Rangeela Rohu', id: 'CJ', num: 6, color: '#800080', imageAddress: 'asset/CJ.jpeg' },
    { name: 'Nikhil', nickName:'Bhaukali Bhalu', id: 'NT', num: 7, color: '#330080', imageAddress: 'asset/NT.jpeg' }
];

const teamArray = [
    {name: 'RCB', id:'rcb'},
    {name: 'CSK', id:'csk'},
    {name: 'KKR', id:'kkr'},
    {name: 'DC', id:'dc'},
    {name: 'MI', id:'mi'},
    {name: 'GT', id:'gt'},
    {name: 'PBKS', id:'pbks'},
    {name: 'LKN', id:'lkn'},
    {name: 'SRH', id:'srh'},
    {name: 'RR', id:'rr'},
]

const triggerPersonalDataView = () => {
    const playerOptions = playerArray.map(item => `<option>${item.nickName}</option>`);
    document.querySelector('.player-name').innerHTML = playerOptions.join(',');

    const team1Array = teamArray.map(item => `<option>${item.name}</option>`);
    team1Array.unshift(`<option>All</option>`)
    document.querySelector('.first-team').innerHTML = team1Array.join(',');

    const team2Array = teamArray.map(item => `<option>${item.name}</option>`);
    team2Array.unshift(`<option>All</option>`)
    document.querySelector('.second-team').innerHTML = team2Array.join(',');
}

const playerId = () => {
    const playerName = document.querySelector('.player-name').value;
    const playerId = playerArray.find(item => item?.nickName === playerName)?.id;
    return playerId
};

const getPlayerRank = (matchResult) => {
    const id = playerId();
    const playerRank = matchResult[id];
    return playerRank;
};

const getPastResult = (matchList) => {
    let rowData = [];
    matchList.forEach(data => {
        rowData += `<tr><td>${data?.match}</td><td>${getPlayerRank(data?.result)}</td><td>${data?.winner}</td></tr>`;
    });
    return rowData;
};

const filteredResult = allData => {
    const id = playerId();
    const firstTeam = document.querySelector('.first-team').value.toLowerCase();
    const secondTeam = document.querySelector('.second-team').value.toLowerCase();
    const filterByName = allData.filter(item => item?.played?.includes(id))

    const filterbyTeam = filterByName.filter(item => {
        let playedTeamArray = item?.match.split('vs').map(item => item.trim().toLowerCase());
        playedTeamArray = playedTeamArray.map(item => item === 'blr' ? 'rcb' : item)
        if(firstTeam === 'all' && secondTeam === 'all'){
            return true;
        } else if(firstTeam !== 'all' && secondTeam !== 'all') {
            if (playedTeamArray.includes(firstTeam) && playedTeamArray.includes(secondTeam)) {
                return true
            } else {
                return false
            } 
        } else if(playedTeamArray.includes(firstTeam) || playedTeamArray.includes(secondTeam)){
            return true;
        }
        return false
    });

    return filterbyTeam;
};

const generatePredictionCard = data => {
    let rankSum = 0;
    let matchesPlayed = data?.length;
    data?.forEach(data => {
        rankSum += getPlayerRank(data?.result);
    });
    const avgRank = rankSum/matchesPlayed;
    document.querySelector('.prediction-card').classList.remove('d-none');
    document.querySelector('.text-bg-success')?.classList.remove('text-bg-success');
    document.querySelector('.text-bg-info')?.classList.remove('text-bg-info');
    document.querySelector('.text-bg-danger')?.classList.remove('text-bg-danger');
    if(avgRank <= 3){
        document.querySelector('.prediction-text').innerHTML = `Popcorn? Check. Drinks? Check. Let the comedic gaming commence!`;
        document.querySelector('.prediction-card').classList.add('text-bg-success');
    } else  if(avgRank > 3 && avgRank < 4) {
        document.querySelector('.prediction-text').innerHTML = `Take a chance, it's all in good fun!`;
        document.querySelector('.prediction-card').classList.add('text-bg-info');
    } else {
        document.querySelector('.prediction-text').innerHTML = `If boredom were a game, this would be it -- skip!`;
        document.querySelector('.prediction-card').classList.add('text-bg-danger');
    }
};

const generatePastResult = () => {
    const data = filteredResult(allYearMatchData);
    generatePredictionCard(data);
    document.querySelector('.d-none')?.classList.remove('d-none');
    document.querySelector('.past-results').innerHTML = 
    `<table class="table" data-sticky-header=true>
        <thead> 
            <th scope="col">Match details</th>
            <th scope="col">Rank</th>
            <th scope="col">Match winner</th>
        </thead>
        <tbody class="table-group-divider">${getPastResult(data)}</tbody>
    </table>`;
}

const domLoaded = async () => {
    const allSeasonURL = [
        'https://api.npoint.io/781b99ffafaead6f476f',
        'https://api.npoint.io/551de43a8627ff944b27',
    ];
    for (const url of allSeasonURL) {
        await fetch(url)
        .then(resp => resp.json())
        .then(response => {
            allYearMatchData = [...allYearMatchData, ...response];
        });
      }
    triggerPersonalDataView();
}

document.addEventListener('DOMContentLoaded', domLoaded, false);