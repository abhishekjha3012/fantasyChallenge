let trackRecordMasterData = [];

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

const ENTRY_FEE = 100;

//Prize money array based on no:of players playing
const prizeMoney = {
    "1": [0, 100],
    "2": [0, 200, 0],
    "3": [0, 300, 0, 0],
    "4": [0, 300, 100, 0, 0],
    "5": [0, 300, 200, 0, 0, 0],
    "6": [0, 350, 250, 0, 0, 0, 0],
    "7": [0, 400, 300, 0, 0, 0, 0, 0],
    "8": [0, 400, 300, 100, 0, 0, 0, 0]
}

const getPlayerId = () => {
    const playerName = document.querySelector('.player-name').value;
    const playerId = playerArray.find(item => item?.nickName === playerName)?.id;
    return playerId || 'all'
}

const calculateNetTotal = playerName => {
    let resultArray = [];
    for (let i = 0; i < trackRecordMasterData.length; i++) {
        const prizeArray = prizeMoney[trackRecordMasterData[i].played.length.toString()];
        let winning = prizeArray[trackRecordMasterData[i].result[playerName]];
        // if (masterData[i].number === 6){
            // SCORES TIED
            // Condition for specifci match where scores were tied
            // if (playerName === 'SJ' || playerName === 'SSJ') {
            //     winning = resultArray[i - 1] + 200;
            // } else {
            //     winning = resultArray[i - 1]
            // }
        //} else 
        if(trackRecordMasterData[i].number === 11){
            if (playerName === 'VJ' || playerName === 'SSJ') {
                winning = resultArray[i - 1] + 50;
            } else if(playerName === 'AM'){
                winning = resultArray[i - 1] + 400
            } else if(playerName === 'CJ'){
                winning = resultArray[i - 1] + 300
            } else {
                winning = resultArray[i - 1]
            }
        } else if (Object.values(trackRecordMasterData[i].result).includes(-1)) {
            // Condition for winner takes all
            if (trackRecordMasterData[i].result[playerName] === -1) {
                winning = resultArray[i - 1] + ((prizeArray.length - 1) * ENTRY_FEE)
            } else {
                winning = resultArray[i - 1]
            }
        } else if (winning === undefined) {
            winning = resultArray[i - 1] ? resultArray[i - 1] : 0
        } else if (i !== 0) {
            winning += resultArray[i - 1];
        }
        if (trackRecordMasterData[i].played.includes(playerName)) {
            winning -= ENTRY_FEE
        }
        resultArray.push(winning)
    }
    return resultArray;
}

const showWinningChart = () => {
    const selectedPlayerId = getPlayerId();
    let seriesData = [];
    if(selectedPlayerId == 'all') {
        seriesData = playerArray.map(item => ({
            name: item.nickName,
            data: calculateNetTotal(item.id)
        }));
    } else {
        seriesData = [{
            name: selectedPlayerId,
            data: calculateNetTotal(selectedPlayerId),
        }]
    }
    const options = {
        chart: {
            type: 'line',
            width: "100%",
            height: 500,
            toolbar: {
                show: false,
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            curve: 'smooth',
            lineCap: 'butt',
            colors: undefined,
            width: 2,
            dashArray: 0, 
        },
        series: [...seriesData],
        xaxis: {
            categories: trackRecordMasterData.map(item => item.nickName),
        }
    }
    document.querySelector('.card').classList.remove('d-none')
    const chart = new ApexCharts(document.querySelector(".track-record-chart"), options);
    chart.render();
};

const populateDropdown = () => {
    const team1Array = playerArray.map(item => `<option>${item.nickName}</option>`);
    team1Array.unshift(`<option>All</option>`)
    document.querySelector('.player-name').innerHTML = team1Array.join(',');
}

const domLoaded = async () => {
    fetch('https://api.npoint.io/781b99ffafaead6f476f')
    .then(resp => resp.json())
    .then(response => {
        trackRecordMasterData = response;
    });
    populateDropdown();
}
document.addEventListener('DOMContentLoaded', domLoaded, false);