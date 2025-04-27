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
    { name: 'Nikhil', nickName:'Bhaukali Bhalu', id: 'NT', num: 7, color: '#330080', imageAddress: 'asset/NT.jpeg' },
    { name: 'Parinav', nickName:'Jumbo Haathi', id: 'PJ', num: 8, color: '#14AE80', imageAddress: '' },
    { name: 'Swati', nickName:'Chakri Bakri', id: 'SWJ', num: 9, color: '#03AA78', imageAddress: '' },
    { name: 'Neha', nickName:'Chanakya Cheetah', id: 'NPJ', num: 10, color: '#66EE51', imageAddress: '' },
    { name: 'Jaya', nickName:'Ponga Pandit', id: 'JJ', num: 11, color: '#7D8421', imageAddress: '' }
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

const ENTRY_FEE = 50; // 100

//Prize money array based on no:of players playing
const prizeMoney = {
    "1": [0, 50], //50
    "2": [0, 100, 0], //100
    "3": [0, 150, 0, 0], //150
    "4": [0, 150, 50, 0, 0], //200
    "5": [0, 150, 100, 0, 0, 0], //250
    "6": [0, 175, 125, 0, 0, 0, 0], //300
    "7": [0, 200, 150, 0, 0, 0, 0, 0], //350
    "8": [0, 200, 150, 50, 0, 0, 0, 0, 0], // 400
    "9": [0, 225, 175, 50, 0, 0, 0, 0, 0, 0], //450
    "10": [0, 250, 175, 75, 0, 0, 0, 0, 0, 0, 0], //500
    "11": [0, 275, 175, 100, 0, 0, 0, 0, 0, 0, 0, 0], //550
    "12": [0, 275, 175, 100, 50, 0, 0, 0, 0, 0, 0, 0, 0] //600
}

const getPlayerId = () => {
    const playerName = document.querySelector('.player-name').value.split('(')[0].trim();
    const playerId = playerArray.find(item => item?.nickName === playerName)?.id;
    return playerId || 'all'
}

const calculateNetTotal = playerName => {
    let resultArray = [];
    for (let i = 0; i < trackRecordMasterData.length; i++) {
        const prizeArray = prizeMoney[trackRecordMasterData[i].played.length.toString()];
        let winning = prizeArray[trackRecordMasterData[i].result[playerName]];
        if (trackRecordMasterData[i].number === 6){
            // SCORES TIED
            // Condition for specifci match where scores were tied
            if (playerName === 'AM') {
                winning = resultArray[i - 1] + 275;
            } else if (playerName === 'NPJ') {
                winning = resultArray[i - 1] + 175;
            } else if (playerName === 'SJ') {
                winning = resultArray[i - 1] + 50;
            } else if (playerName === 'KT') {
                winning = resultArray[i - 1] + 50;
            } else {
                winning = resultArray[i - 1]
            }
        } else if (trackRecordMasterData[i].number === 30){
            // SCORES TIED
            // Condition for specifci match where scores were tied
            if (playerName === 'SSJ') {
                winning = resultArray[i - 1] + 275;
            } else if (playerName === 'AM') {
                winning = resultArray[i - 1] + 175;
            } else if (playerName === 'SJ') {
                winning = resultArray[i - 1] + 50;
            } else if (playerName === 'KT') {
                winning = resultArray[i - 1] + 50;
            } else {
                winning = resultArray[i - 1]
            }
        } else if (Object.values(trackRecordMasterData[i].result).includes(-1)) {
            // Condition for winner takes all
            if (trackRecordMasterData[i].result[playerName] === -1) {
                winning = (resultArray[i - 1] || 0) + ((prizeArray.length-1) * ENTRY_FEE);
            } else {
                winning = resultArray[i - 1] || 0;
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

const populateWinningByTeamChart = () => {
    const playerId = getPlayerId();
    if(playerId !== 'all') {
        let winningObject = {
            rcb: 0,
            csk: 0,
            che: 0,
            kkr: 0,
            dc: 0,
            mi: 0,
            gt: 0,
            pbks: 0,
            lkn: 0,
            lsg: 0,
            srh: 0,
            rr: 0,
        }
        for (let i = 0; i < trackRecordMasterData.length; i++) {
            if(trackRecordMasterData[i].played.includes(playerId)){
                let winning = 0;
                const prizeArray = prizeMoney[trackRecordMasterData[i].played.length.toString()];
                if (trackRecordMasterData[i].number === 6){
                    // SCORES TIED
                    // Condition for specifci match where scores were tied
                    if (playerId === 'AM') {
                        winning = 275;
                    } else if (playerId === 'NPJ') {
                        winning = 175;
                    } else if (playerId === 'SJ') {
                        winning = 50;
                    } else if (playerId === 'KT') {
                        winning = 50;
                    } else {
                        winning = 0;
                    }
                } else if(trackRecordMasterData[i].result[playerId] === -1 ){
                    winning = trackRecordMasterData[i].played.length * ENTRY_FEE;
                } else {
                    winning = prizeArray[trackRecordMasterData[i].result[playerId]] || 0;
                }
                
                let [firstTeam, secondTeam] = trackRecordMasterData[i]?.match.split('vs').map(item => item.trim().toLowerCase());
                winningObject[firstTeam] = winningObject[firstTeam] + (winning/2) - (ENTRY_FEE/2);
                winningObject[secondTeam] = winningObject[secondTeam] + (winning/2) - (ENTRY_FEE/2);
            }
        }

        winningObject.lkn = winningObject.lkn + winningObject.lsg;
        winningObject.csk = winningObject.csk + winningObject.che;
        delete winningObject.lsg;
        delete winningObject.che;

        const options = {
            chart: {
                type: 'bar',
                width: "100%",
                height: 500,
                foreColor: '#ffffff',
                toolbar: {
                    show: false,
                }
            },
            tooltip: {
                enabled: true,
                theme: 'dark',
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
            series: [{
                name: 'Winning by team',
                data: Object.values(winningObject),
            }],
            xaxis: {
                categories: Object.keys(winningObject).map(item => item.toUpperCase()),
            }
        }
        document.querySelector('.d-none')?.classList.remove('d-none');
        const chart = new ApexCharts(document.querySelector(".team-record-chart"), options);
        chart.render();
    }
    
}

const showWinningChart = () => {
    document.querySelector(".track-record-chart").innerHTML = '';
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
            foreColor: '#ffffff',
            toolbar: {
                show: false,
            }
        },
        tooltip: {
            enabled: true,
            theme: 'dark',
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
            categories: trackRecordMasterData.map(item => item.match),
        }
    }
    document.querySelector('.d-none')?.classList.remove('d-none');
    const chart = new ApexCharts(document.querySelector(".track-record-chart"), options);
    chart.render();
    populateWinningByTeamChart();
};

const populateDropdown = () => {
    const team1Array = playerArray.map(item => `<option>${item.nickName}(${item.name})</option>`);
    team1Array.unshift(`<option>All</option>`)
    document.querySelector('.player-name').innerHTML = team1Array.join(',');
}

const domLoaded = async () => {
    fetch('https://api.npoint.io/9e9b4019fec4946a0f9a')
    .then(resp => resp.json())
    .then(response => {
        trackRecordMasterData = response;
    });
    populateDropdown();
}
document.addEventListener('DOMContentLoaded', domLoaded, false);