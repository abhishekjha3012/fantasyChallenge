let masterData = [];
const playerArray = [
    { name: 'Abhishek', id: 'AJ', num: 0, color: '#B1FFAD', imageAddress: 'asset/AJ.png' },
    { name: 'Sonali', id: 'SJ', num: 1, color: '#FF9077', imageAddress: 'https://stickerly.pstatic.net/sticker_pack/JoOAsHhrZM342DXak4nYQ/HIZAPW/2/bea565ec-c108-4808-b041-6ebe2924b12c.png' },
    { name: 'Varsha', id: 'VJ', num: 2, color: '#8E9DFF', imageAddress: 'https://stickerly.pstatic.net/sticker_pack/CWqJyA7W1seavKQUFJ7A/3WATSW/16/5bade8dc-d62e-41d8-b0ee-358bde44a10e.png' },
    { name: 'Keshav', id: 'KT', num: 3, color: '#566573', imageAddress: 'asset/KT.png' },
    { name: 'Saurabh', id: 'SSJ', num: 4, color: '#F7FF8E', imageAddress: 'asset/SSJ.png' },
    { name: 'Parinav', id: 'PJ', num: 5, color: '#8EFFF7', imageAddress: 'asset/PJ.png' },
    { name: 'Chanchal', id: 'CJ', num: 6, color: '#800080', imageAddress: 'https://m.media-amazon.com/images/M/MV5BMmI0NjA5YmYtNjU5OC00ZDFlLWE5MmEtZmE5YjUxNWY1ZDYxXkEyXkFqcGdeQXVyNzM4MjU3NzY@._V1_FMjpg_UX1000_.jpg' }
]
const prizeMoney = {
    "1": [0, 50],
    "2": [0, 100, 0],
    "3": [0, 150, 0, 0],
    "4": [0, 150, 50, 0, 0],
    "5": [0, 150, 100, 0, 0, 0],
    "6": [0, 175, 125, 0, 0, 0, 0],
    "7": [0, 200, 150, 0, 0, 0, 0, 0]
}
const commonChartObject = {
    credits: {
        enabled: false
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            marker: {
                enabled: false
            }
        }
    },
    chart: {
        type: 'line',
        backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
                [0, '#D3D3D3'],
                [1, '#D3D3D3']
            ]
        },
        style: {
            fontFamily: '\'Unica One\', sans-serif'
        },
    },
}

const calculateNetTotal = playerName => {
    let resultArray = [];
    for (let i = 0; i < masterData.length; i++) {
        const prizeArray = prizeMoney[masterData[i].played.length.toString()];
        let winning = prizeArray[masterData[i].result[playerName]];
        if (Object.values(masterData[i].result).includes(-1)) {
            //Condition for winner takes all
            if (masterData[i].result[playerName] === -1) {
                winning = resultArray[i - 1] + ((prizeArray.length - 1) * 50)
            } else {
                winning = resultArray[i - 1]
            }
        } else if (winning === undefined) {
            winning = resultArray[i - 1] ? resultArray[i - 1] : 0
        } else if (i !== 0) {
            winning += resultArray[i - 1];
        }
        if (masterData[i].played.includes(playerName)) {
            winning -= 50
        }
        resultArray.push(winning)
    }
    return resultArray;
}

const calculateWinning = playerName => {
    let resultArray = [];
    for (let i = 0; i < masterData.length; i++) {
        const prizeArray = prizeMoney[masterData[i].played.length.toString()];
        let winning = prizeArray[masterData[i].result[playerName]];
        if (Object.values(masterData[i].result).includes(-1)) {
            if (masterData[i].result[playerName] === -1) {
                //Condition for winner takes all
                winning = resultArray[i - 1] + ((prizeArray.length - 1) * 50)
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

const calculatePrize = playerName => {
    let resultArray = [];
    for (let i = 0; i < masterData.length; i++) {
        const prizeArray = prizeMoney[masterData[i].played.length.toString()];
        let winning = prizeArray[masterData[i].result[playerName]];
        if (Object.values(masterData[i].result).includes(-1)) {
            //Condition for winner takes all
            if (masterData[i].result[playerName] === -1) {
                winning = (prizeArray.length - 1) * 50;
            } else {
                winning = 0
            }
        } else if (winning === undefined) {
            winning = 0;
        }
        resultArray.push(winning)
    }
    return resultArray;
}

const populateRankTable = () => {
    const displayOrder = [];
    for (let i = 0; i < playerArray.length; i++) {
        const { id: player } = playerArray[i];
        let matchesPlayed = 0;
        let rankSum = 0;
        let weightedSum = 0;
        let weightedMatchPlayed = 0;
        for (let i = 0; i < masterData.length; i++) {
            if (masterData[i].played.includes(player)) {
                matchesPlayed++;
                weightedMatchPlayed += masterData[i].played.length;
                rankSum += Math.abs(masterData[i].result[player]);
                weightedSum += (Math.abs(masterData[i].result[player]) * masterData[i].played.length);
            }
        }
        const avgRank = (rankSum / matchesPlayed).toFixed(2);
        const weightedRank = (weightedSum / weightedMatchPlayed).toFixed(2);
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
            { field: "player" },
            { field: "avgRank" },
            { field: "weightedRank" },
            { field: "matchesPlayed" },
            { field: "rankSum" },
        ],
        defaultColDef: { sortable: true, filter: true },
        animateRows: true,
        domLayout: 'autoHeight'
    }
    const eGridDiv = document.getElementById("rankTable");
    new agGrid.Grid(eGridDiv, gridOptions);
    gridOptions.api.setRowData(displayOrder);
    gridOptions.api.sizeColumnsToFit();

    const lastMatchData = Object.fromEntries(Object.entries(masterData[masterData.length - 1].result).map(a => {
        a[1] = Math.abs(a[1]);
        return a.reverse();
    }))
    document.querySelector('.hall-fame-name').textContent = lastMatchData[1];
    document.querySelector('.shout-out-audio').src = `asset/A${lastMatchData[1]}.mp3`;
}

const populateRankChart = () => {
    const seriesData = playerArray.map(item => ({
        label: item.name,
        borderColor: item.color,
        data: [...masterData.map(data => Math.abs(data.result[item.id] ? data.result[item.id] : 0))],
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
    }
    const chartDom = document.getElementById('rankChart');
    new Chart(chartDom, options)
}

const populatePrizeChart = () => {
    const seriesData = playerArray.map(item => ({
        label: item.name,
        borderColor: item.color,
        data: calculatePrize(item.id)
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
    const chartDom = document.getElementById('prizeChart');
    new Chart(chartDom, options)
}

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

const populateMasterTable = () => {
    let tableHtml = ''
    for (let i = 0; i < masterData.length; i++) {
        const rowData = masterData[i];
        const rankObject = Object.fromEntries(Object.entries(rowData.result).map(a => {
            a[1] = Math.abs(a[1]);
            return a.reverse();
        }))
        const rowHtml = `<div class="row"><p>Match No. ${rowData.number}</p><p>${rowData.match}</p>
        <p>${rowData.winner}</p>
        <p class=${rankObject[1] ? rankObject[1] : ''}>${rankObject[1] ? rankObject[1] : '--'}</p>
        <p class=${rowData.number===47 ? 'same-rank' : rankObject[2] ? rankObject[2] : ''}>
            ${rowData.number===47 ?'SJ/VJ':rankObject[2] ? rankObject[2] : '--'}
        </p>
        <p class=${rankObject[3] ? rankObject[3] : ''}>${rankObject[3] ? rankObject[3] : '--'}</p>
        <p class=${rankObject[4] ? rankObject[4] : ''}>${rankObject[4] ? rankObject[4] : '--'}</p>
        <p class=${rankObject[5] ? rankObject[5] : ''}>${rankObject[5] ? rankObject[5] : '--'}</p>
        <p class=${rankObject[6] ? rankObject[6] : ''}>${rankObject[6] ? rankObject[6] : '--'}</p>
        <p class=${rankObject[7] ? rankObject[7] : ''}>${rankObject[7] ? rankObject[7] : '--'}</p>
        </div>`
        tableHtml += rowHtml;
    }
    document.querySelector('.row-body').innerHTML = tableHtml;
}

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

const triggerButtonSelection = node => {
    switch (node) {
        case 'avg':
            document.querySelector('#playerDetails').parentElement.parentElement.classList.add('active');
            populateRankTable();
            populateNet2Chart();
            populateRecordTable();
            break;
        case 'rank':
            document.querySelector('#rankChart').parentElement.classList.add('active');
            populateRankChart();
            break;
        case 'prize':
            document.querySelector('#prizeChart').parentElement.classList.add('active');
            populatePrizeChart();
            break;
        case 'winning':
            document.querySelector('#winningChart').parentElement.classList.add('active');
            populateWinningChart();
            break;
            // case 'net':
            //     document.querySelector('#paymentChart').parentElement.classList.add('active');
            //     populateNetChart();
            //     break;
        case 'net2':
            document.querySelector('#paymentChart2').parentElement.classList.add('active');
            populateNet2Chart();
            break;
        case 'result':
            document.querySelector('#resultTable').classList.add('active');
            populateMasterTable();
            break;
            // case 'record':
            //     document.querySelector('#recordtable').classList.add('active');
            //     populateRecordTable();
            //     break;
        default:
            document.querySelector('#rankChart').classList.add('active');
            populateRankChart();
            break;
    }
}

const triggershoutOut = () => {
    document.querySelector('.shout-out-audio').play();
}

const openNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
}

const closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
}

const domLoaded = () => {


    fetch('https://api.npoint.io/6854bcef08ac2ebec1ce')
        .then(resp => resp.json())
        .then(response => {
            masterData = response
            triggerButtonSelection('avg');
            document.querySelector('.loading-msg').style.display = 'none';
            document.querySelector('.dashboard').style.display = 'block';

        });

}

document.addEventListener('DOMContentLoaded', domLoaded, false);