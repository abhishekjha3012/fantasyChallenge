let masterData = [];

//List of players who are playing
const playerArray = [
    { name: 'Abhishek', id: 'AJ', num: 0, color: '#B1FFAD', imageAddress: 'asset/AJ.png' },
    { name: 'Sonali', id: 'SJ', num: 1, color: '#FF9077', imageAddress: 'https://stickerly.pstatic.net/sticker_pack/JoOAsHhrZM342DXak4nYQ/HIZAPW/2/bea565ec-c108-4808-b041-6ebe2924b12c.png' },
    { name: 'Varsha', id: 'VJ', num: 2, color: '#8E9DFF', imageAddress: 'https://stickerly.pstatic.net/sticker_pack/CWqJyA7W1seavKQUFJ7A/3WATSW/16/5bade8dc-d62e-41d8-b0ee-358bde44a10e.png' },
    { name: 'Keshav', id: 'KT', num: 3, color: '#566573', imageAddress: 'asset/KT.png' },
    { name: 'Saurabh', id: 'SSJ', num: 4, color: '#F7FF8E', imageAddress: 'asset/SSJ.png' },
    //{ name: 'Parinav', id: 'PJ', num: 5, color: '#8EFFF7', imageAddress: 'asset/PJ.png' },
    { name: 'Chanchal', id: 'CJ', num: 6, color: '#800080', imageAddress: 'asset/CJ.jpeg' }
]

const ENTRY_FEE = 100;
//Prize money array based on no:of players playing
const prizeMoney = {
    "1": [0, 100],
    "2": [0, 200, 0],
    "3": [0, 300, 0, 0],
    "4": [0, 300, 100, 0, 0],
    "5": [0, 300, 200, 0, 0, 0],
    "6": [0, 350, 250, 0, 0, 0, 0],
    // "7": [0, 400, 300, 0, 0, 0, 0, 0]
}

const conversionFactor = {
    "1": [0, 6],
    "2": [0, 1, 6],
    "3": [0, 1, 3, 6],
    "4": [0, 1, 2, 4, 6],
    "5": [0, 1, 1.5, 3, 4.5, 6],
    "6": [0, 1, 2, 3, 4, 5, 6],
    // "7": [0, 1, 2, 3, 4, 5, 6, 0]
}

//This function returns the winning array minus match fees for individual player
const calculateNetTotal = playerName => {
    let resultArray = [];
    for (let i = 0; i < masterData.length; i++) {
        const prizeArray = prizeMoney[masterData[i].played.length.toString()];
        let winning = prizeArray[masterData[i].result[playerName]];
        //Condition for winner takes all
        if(masterData[i].number === 4){
            // SCORES TIED
            // Condition for specifci match where scores were tied
            if (playerName === 'VJ' || playerName === 'KT') {
                winning = resultArray[i - 1] + 300;
            } else {
                winning = resultArray[i - 1]
            }
        } if(masterData[i].number === 6){
            // SCORES TIED
            // Condition for specifci match where scores were tied
            if (playerName === 'SJ' || playerName === 'SSJ') {
                winning = resultArray[i - 1] + 200;
            } else {
                winning = resultArray[i - 1]
            }
        } else if (Object.values(masterData[i].result).includes(-1)) {
            // Condition for winner takes all
            if (masterData[i].result[playerName] === -1) {
                winning = resultArray[i - 1] + ((prizeArray.length - 1) * ENTRY_FEE)
            } else {
                winning = resultArray[i - 1]
            }
        } else if (winning === undefined) {
            winning = resultArray[i - 1] ? resultArray[i - 1] : 0
        } else if (i !== 0) {
            winning += resultArray[i - 1];
        }
        if (masterData[i].played.includes(playerName)) {
            winning -= ENTRY_FEE
        }
        resultArray.push(winning)
    }
    return resultArray;
}

//This function returns the winning array for individual player
const calculateWinning = playerName => {
    let resultArray = [];
    for (let i = 0; i < masterData.length; i++) {
        const prizeArray = prizeMoney[masterData[i].played.length.toString()];
        let winning = prizeArray[masterData[i].result[playerName]];
        if (Object.values(masterData[i].result).includes(-1)) {
            if (masterData[i].result[playerName] === -1) {
                //Condition for winner takes all
                winning = resultArray[i - 1] + ((prizeArray.length - 1) * ENTRY_FEE)
            } else {
                winning = resultArray[i - 1]
            }
        } else if (winning === undefined) {
            winning = resultArray[i - 1] ? resultArray[i - 1] : 0
        } else if (i !== 0) {
            winning += resultArray[i - 1];
        }
        resultArray.push(winning)
    }
    return resultArray;
}

//This function generates the table with basic detail which can be seen on dashboard.
const populateRankTable = () => {
    const displayOrder = [];
    for (let i = 0; i < playerArray.length; i++) {
        const { id: player } = playerArray[i];
        let matchesPlayed = 0;
        let rankSum = 0;
        let weightedSum = 0;
        for (let i = 0; i < masterData.length; i++) {
            if (masterData[i].played.includes(player)) {
                matchesPlayed++;
                rankSum += Math.abs(masterData[i].result[player]);
                weightedSum += conversionFactor[masterData[i].played.length][Math.abs([masterData[i].result[player]])];
            }
        }
        const avgRank = (rankSum / matchesPlayed).toFixed(2);
        const weightedRank = (weightedSum / matchesPlayed).toFixed(2);
        displayOrder.push({
            player,
            avgRank,
            weightedRank,
            matchesPlayed,
            rankSum
        })

        document.querySelector('.loading-msg').style.display = 'none';
        document.querySelector('#rankTable').style.display = 'block';
    }
    displayOrder.sort((a, b) => a.avgRank > b.avgRank ? -1 : 1)
    const gridOptions = {
        columnDefs: [
            { field: "player", headerName: 'Player' },
            { field: "weightedRank", headerName: 'Weighted Rank' },
            { field: "matchesPlayed", headerName: 'Matches Played' },
        ],
        defaultColDef: { sortable: true, filter: true },
        animateRows: true,
        domLayout: 'autoHeight'
    }
    const eGridDiv = document.getElementById("rankTable");
    eGridDiv.innerHTML = '';
    new agGrid.Grid(eGridDiv, gridOptions);
    gridOptions.api.setRowData(displayOrder);
    gridOptions.api.sizeColumnsToFit();

    const lastMatchData = Object.fromEntries(Object.entries(masterData[masterData.length - 1].result).map(a => {
        a[1] = Math.abs(a[1]);
        return a.reverse();
    }))
    document.querySelector('.hall-fame-name').textContent = lastMatchData[1];
    document.querySelector('.shout-out-audio').src = `asset/A${lastMatchData[1]}.mp3`;
    document.querySelector('.last-match-detail').innerHTML = `
        Last match updated:  ${masterData[masterData.length - 1].number} : ${masterData[masterData.length - 1].match}`
}

//This functions generates the chart with only winning data.
const populateWinningChart = () => {
    const seriesData = playerArray.map(item => ({
        label: item.name,
        borderColor: item.color,
        data: calculateWinning(item.id)
    }));
    const options = {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
        data: {
            labels: [...masterData.map(item => item.match)],
            datasets: seriesData
        },
    };
    const chartDom = document.getElementById('winningChart');
    new Chart(chartDom, options)
}

//This functions generates the chart with winning data minus match fees.
const populateNetChart = () => {
    const seriesData = playerArray.map(item => ({
        label: item.name,
        borderColor: item.color,
        data: calculateNetTotal(item.id)
    }))
    const options = {
        type: 'line',
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
        data: {
            labels: [...masterData.map(item => item.match)],
            datasets: seriesData
        },
    }
    const chartDom = document.getElementById('paymentChart');
    new Chart(chartDom, options)
}

//This function generates the chart with final winning amount till update date
const populateNet2Chart = () => {
    const dataseries = playerArray.map(item => calculateNetTotal(item.id).pop());
    const colorSeries = playerArray.map(item => item.color);
    const options = {
        type: 'bar',
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
        data: {
            labels: playerArray.map(item => item.name),
            datasets: [{
                label: 'NET WINNING',
                data: dataseries,
                backgroundColor: colorSeries
            }],
        },
    }
    const chartDom = document.getElementById('paymentChart2');
    new Chart(chartDom, options);
}

//This populates master table with each match data rank list.
const populateMasterTable = () => {
    const displayOrder = masterData.map(item => {
        const rankObject = Object.fromEntries(Object.entries(item.result).map(a => {
            a[1] = Math.abs(a[1]);
            return a.reverse();
        }))
        // SCORES TIED
        if(item.number === 4) {
            rankObject[1] = 'VJ/KT'
        } else if(item.number === 6) {
            rankObject[1] = 'SJ/SSJ'
        }
        return {
            matchNo: item.number,
            teams: item.match,
            winner: item.winner,
            rank1: rankObject[1] || '--',
            rank2: rankObject[2] || '--',
            rank3: rankObject[3] || '--',
            rank4: rankObject[4] || '--',
            rank5: rankObject[5] || '--',
            rank6: rankObject[6] || '--',
            rank7: rankObject[7] || '--',
        };
    });
    const gridOptions = {
        columnDefs: [
            { field: "matchNo", headerName: 'Match No' },
            { field: "teams", headerName: 'Teams' },
            { field: "winner", headerName: 'Winner' },
            { field: "rank1", headerName: "Rank 1" },
            { field: "rank2", headerName: "Rank 2" },
            { field: "rank3", headerName: "Rank 3" },
            { field: "rank4", headerName: "Rank 4" },
            { field: "rank5", headerName: "Rank 5" },
            { field: "rank6", headerName: "Rank 6" },
            { field: "rank7", headerName: "Rank 7" }
        ],
        defaultColDef: { sortable: false, filter: true },
        animateRows: true,
        domLayout: 'autoHeight'
    }
    const eGridDiv = document.getElementById("resultTable");
    eGridDiv.innerHTML = '';
    new agGrid.Grid(eGridDiv, gridOptions);
    gridOptions.api.setRowData(displayOrder);
    gridOptions.api.sizeColumnsToFit();
}

// This populates card with individual wins for all ranks.
const populateRecordTable = () => {
    let recordObj = {};
    playerArray.map(item => {
        recordObj = {
            ...recordObj,
            [item.id]: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0
            }
        }
    });
    masterData.map(item => {
        playerArray.forEach(player => {
            const { id } = player
            recordObj[id] = {
                ...recordObj[id],
                [Math.abs(item.result[id])]: recordObj[id][Math.abs(item.result[id])] + 1,
            }
        })
    });
    let recordHtml = '';
    playerArray.map(item => {
        const { id, imageAddress } = item;
        recordHtml += `<div class='player-card'>
            <div class='player-card-fix'><img src='${imageAddress}'></div>
            <div class='player-card-inner'>
                <div class='player-card-front'>
                    <p class='player-name'>${id}</p>
                </div>
                <div class='player-card-back'>
                    <p>Rank 1: <span>${recordObj[id][1]}</span></p><p>Rank 2: <span>${recordObj[id][2]}</span></p>
                    <p>Rank 3: <span>${recordObj[id][3]}</span></p><p>Rank 4: <span>${recordObj[id][4]}</span></p>
                    <p>Rank 5: <span>${recordObj[id][5]}</span></p><p>Rank 6: <span>${recordObj[id][6]}</span></p>
                    <p>Rank 7: <span>${recordObj[id][7]}</span></p><p>Not played: <span>${recordObj[id][0]}</span></p>
                </div>
            </div>
        </div>`

    })
    document.querySelector('#recordtable').innerHTML = recordHtml
}

//This function shows/hides chart based on user click on left menu nav.
const triggerButtonSelection = node => {
    document.querySelector('.active')?.classList.remove('active');
    switch (node) {
        case 'avg':
            document.querySelector('#playerDetails').parentElement.parentElement.classList.add('active');
            populateRankTable();
            populateNet2Chart();
            populateRecordTable();
            break;
        case 'winning':
            document.querySelector('#winningChart').parentElement.classList.add('active');
            populateWinningChart();
            break;
        case 'net':
            document.querySelector('#paymentChart').parentElement.classList.add('active');
            populateNetChart();
            break;
        case 'result':
            document.querySelector('#resultTable').parentElement.classList.add('active');
            populateMasterTable();
            break;
        default:
            break;
    }
}

//This function triggers play when audio is clicked.
const triggershoutOut = () => {
    document.querySelector('.shout-out-audio').play();
}

//This function opens the left nav when clicked.
const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
}

//This function closes the left nav when clicked.
const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
}

//This funcion is triggered on DOM load and loads default charts on dashbaord.
const domLoaded = () => {
    fetch('https://api.npoint.io/f8c5dbf9ae6decd43e32')
        .then(resp => resp.json())
        .then(response => {
            masterData = response
            triggerButtonSelection('avg');
            document.querySelector('.loading-msg').style.display = 'none';
        });
}
document.addEventListener('DOMContentLoaded', domLoaded, false);