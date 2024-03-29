//This funcion is triggered on DOM load and loads default charts on dashbaord.
let allYearMatchData= [];
//List of players who are playing
const playerArray = [
    { name: 'Abhishek', id: 'AJ', num: 0, color: '#B1FFAD', imageAddress: 'asset/AJ.jpeg' },
    { name: 'Sonali', id: 'SJ', num: 1, color: '#FF9077', imageAddress: 'https://stickerly.pstatic.net/sticker_pack/JoOAsHhrZM342DXak4nYQ/HIZAPW/2/bea565ec-c108-4808-b041-6ebe2924b12c.png' },
    { name: 'Varsha', id: 'VJ', num: 2, color: '#8E9DFF', imageAddress: 'https://stickerly.pstatic.net/sticker_pack/CWqJyA7W1seavKQUFJ7A/3WATSW/16/5bade8dc-d62e-41d8-b0ee-358bde44a10e.png' },
    { name: 'Keshav', id: 'KT', num: 3, color: '#566573', imageAddress: 'asset/KT.png' },
    { name: 'Saurabh', id: 'SSJ', num: 4, color: '#F7FF8E', imageAddress: 'asset/SSJ.png' },
    { name: 'Aishwaryah', id: 'AM', num: 5, color: '#8EFFF7', imageAddress: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-gfQe8gjby3PROpW_GW0K2-3OjoVXYM_EvA&usqp=CAU' },
    { name: 'Chanchal', id: 'CJ', num: 6, color: '#800080', imageAddress: 'asset/CJ.jpeg' },
    { name: 'Nikhil', id: 'NT', num: 7, color: '#330080', imageAddress: 'asset/NT.jpeg' }
]

const teamArray = [
    {name: 'RCB', id:'rcb', values:['rcb','blr']},
    {name: 'CSK', id:'csk', values:['csk']},
    {name: 'KKR', id:'kkr', values:['kkr']},
    {name: 'DC', id:'dc', values:['dc']},
    {name: 'MI', id:'mi', values:['mi']},
    {name: 'GT', id:'gt', values:['gt']},
    {name: 'PBKS', id:'pbks', values:['pbks']},
    {name: 'LKN', id:'lkn', values:['lkn']},
    {name: 'SRH', id:'srh', values:['srh']},
]


const triggerPersonalDataView = () => {
    const playerOptions = playerArray.map(item => `<option>${item.name}</option>`);
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
    const playerId = playerArray.find(item => item?.name === playerName)?.id;
    return playerId
}

const getPlayerRank = (matchResult) => {
    const id = playerId();
    const playerRank = matchResult[id];
    return playerRank;
}

const getPastResult = (matchList) => {
    let rowData = [];
    matchList.forEach(data => {
        rowData += `<tr><td>${data?.match}</td><td>${getPlayerRank(data?.result)}</td><td>${data?.winner}</td></tr>`;
    });
    return rowData;
}

const filteredResult = allData => {
    const id = playerId();
    const firstTeam = document.querySelector('.first-team').value.toLowerCase();
    const secondTeam = document.querySelector('.second-team').value.toLowerCase();
    const filterByName = allData.filter(item => item?.played?.includes(id))

    const filterbyTeam = filterByName.filter(item => {
        const playedTeamArray = item?.match.split('vs').map(item => item.trim().toLowerCase());
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
}

const generatePastResult = () => {
    const data = filteredResult(allYearMatchData);
    document.querySelector('.past-results').innerHTML = 
    `<table class="table">
        <thead> 
            <th scope="col">Match details</th>
            <th scope="col">Rank</th>
            <th scope="col">Match winner</th>
        </thead>
        <tbody>${getPastResult(data)}</tbody>
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