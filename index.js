let masterData = [];
const playerArray = [
    {name: 'Abhishek', id: 'AJ', num: 0, color: '#B1FFAD', imageAddress: 'asset/AJ.png'}, 
    {name: 'Sonali', id: 'SJ', num: 1, color: '#FF9077', imageAddress: 'https://stickerly.pstatic.net/sticker_pack/JoOAsHhrZM342DXak4nYQ/HIZAPW/2/bea565ec-c108-4808-b041-6ebe2924b12c.png'},
    {name: 'Varsha', id: 'VJ', num: 2, color: '#8E9DFF', imageAddress: 'https://stickerly.pstatic.net/sticker_pack/CWqJyA7W1seavKQUFJ7A/3WATSW/16/5bade8dc-d62e-41d8-b0ee-358bde44a10e.png'},
    {name: 'Keshav', id: 'KT', num: 3, color: '#566573', imageAddress: 'asset/KT.png'},
    {name: 'Saurabh', id: 'SSJ', num: 4, color: '#F7FF8E', imageAddress: 'asset/SSJ.png'},
    {name: 'Parinav', id: 'PJ',  num: 5, color: '#8EFFF7', imageAddress: 'asset/PJ.png'},
    {name: 'Aishwarya', id: 'AM', num: 6, color: '#800080', imageAddress: 'https://c.tenor.com/1rHNsGnA4lwAAAAS/thalaivar-rajinikanth.gif'}
]
const prizeMoney = {
    "1": [0,100],
    "2": [0,200,0],
    "3": [0,300,0,0],
    "4": [0,300,100,0,0],
    "5": [0,300,200,0,0,0],
    "6": [0,350,250,0,0,0,0],
    "7": [0,400,300,0,0,0,0,0]
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
    for(let i=0; i < masterData.length; i++) {
        const prizeArray = prizeMoney[masterData[i].played.length.toString()];
        let winning = prizeArray[masterData[i].result[playerName]];
        if(Object.values(masterData[i].result).includes(-1)){
            if(masterData[i].result[playerName] === -1){
                winning = resultArray[i-1] + ((prizeArray.length - 1) * 100)
            } else {
                winning = resultArray[i-1]
            }
        } else if(winning === undefined){
            winning = resultArray[i-1] ? resultArray[i-1] : 0
        } else if(i !== 0){
            winning += resultArray[i-1];
        } 
        if(masterData[i].played.includes(playerName)){
            winning -= 100
        }
        resultArray.push(winning)
    }
    return resultArray;
}

const calculateWinning = playerName => {
    let resultArray = [];
    for(let i=0; i < masterData.length; i++) {
        const prizeArray = prizeMoney[masterData[i].played.length.toString()];
        let winning = prizeArray[masterData[i].result[playerName]];
        if(Object.values(masterData[i].result).includes(-1)){
            if(masterData[i].result[playerName] === -1){
                winning = resultArray[i-1] + ((prizeArray.length - 1) * 100)
            } else {
                winning = resultArray[i-1]
            }
        } else if(winning === undefined){
            winning = resultArray[i-1] ? resultArray[i-1] : 0
        } else if(i !== 0){
            winning += resultArray[i-1];
        } 
        resultArray.push(winning)
    }
    return resultArray;
}

const calculatePrize = playerName => {
    let resultArray = [];
    for(let i=0; i < masterData.length; i++) {
        const prizeArray = prizeMoney[masterData[i].played.length.toString()];
        let winning = prizeArray[masterData[i].result[playerName]];
        if(Object.values(masterData[i].result).includes(-1)){
            if(masterData[i].result[playerName] === -1){
                winning = (prizeArray.length - 1) * 100;
            } else {
                winning = 0
            }
        } else if(winning === undefined){
            winning = 0;
        }
        resultArray.push(winning)
    }
    return resultArray;
}

const populateRankTable = () => {
    const displayOrder = [];
    for(let i=0; i < playerArray.length; i++) {
        const { id: player } = playerArray[i];
        let matchesPlayed = 0;
        let rankSum = 0;
        let weightedSum = 0;
        let weightedMatchPlayed = 0;
        for(let i=0; i < masterData.length; i++) {
            if(masterData[i].played.includes(player)) {
                matchesPlayed++;
                weightedMatchPlayed += masterData[i].played.length; 
                rankSum += Math.abs(masterData[i].result[player]);
                weightedSum += (Math.abs(masterData[i].result[player]) * masterData[i].played.length);
            }
        }
        const avgRank = (rankSum/matchesPlayed).toFixed(2);
        const weightedRank = (weightedSum/weightedMatchPlayed).toFixed(2);
        displayOrder.push({
            player,
            avgRank,
            weightedRank,
            matchesPlayed
        })
        
        document.querySelector('.loading-msg').style.display = 'none';
        document.querySelector('.rank-table').style.display = 'block';
    }
    displayOrder.sort((a,b) => a.avgRank > b.avgRank ? -1 : 1)
    for(let i=0; i < displayOrder.length; i++) {
        const {player, avgRank, weightedRank,matchesPlayed} = displayOrder[i];
        setTimeout(()=>{
            switch(player){
                case 'AJ': 
                    document.querySelectorAll('#playerDetails .row')[0].querySelectorAll('p')[1].innerHTML = avgRank;
                    document.querySelectorAll('#playerDetails .row')[0].querySelectorAll('p')[2].innerHTML = weightedRank;
                    document.querySelectorAll('#playerDetails .row')[0].querySelectorAll('p')[3].innerHTML = matchesPlayed;
                    break;
                case 'SJ': 
                    document.querySelectorAll('#playerDetails .row')[1].querySelectorAll('p')[1].innerHTML = avgRank;
                    document.querySelectorAll('#playerDetails .row')[1].querySelectorAll('p')[2].innerHTML = weightedRank;
                    document.querySelectorAll('#playerDetails .row')[1].querySelectorAll('p')[3].innerHTML = matchesPlayed;
                    break;
                case 'VJ': 
                    document.querySelectorAll('#playerDetails .row')[2].querySelectorAll('p')[1].innerHTML = avgRank;
                    document.querySelectorAll('#playerDetails .row')[2].querySelectorAll('p')[2].innerHTML = weightedRank;
                    document.querySelectorAll('#playerDetails .row')[2].querySelectorAll('p')[3].innerHTML = matchesPlayed;
                    break;
                case 'KT': 
                    document.querySelectorAll('#playerDetails .row')[3].querySelectorAll('p')[1].innerHTML = avgRank;
                    document.querySelectorAll('#playerDetails .row')[3].querySelectorAll('p')[2].innerHTML = weightedRank;
                    document.querySelectorAll('#playerDetails .row')[3].querySelectorAll('p')[3].innerHTML = matchesPlayed;
                    break;
                case 'SSJ': 
                    document.querySelectorAll('#playerDetails .row')[4].querySelectorAll('p')[1].innerHTML = avgRank;
                    document.querySelectorAll('#playerDetails .row')[4].querySelectorAll('p')[2].innerHTML = weightedRank;
                    document.querySelectorAll('#playerDetails .row')[4].querySelectorAll('p')[3].innerHTML = matchesPlayed;
                    break;
                case 'PJ': 
                    document.querySelectorAll('#playerDetails .row')[5].querySelectorAll('p')[1].innerHTML = avgRank;
                    document.querySelectorAll('#playerDetails .row')[5].querySelectorAll('p')[2].innerHTML = weightedRank;
                    document.querySelectorAll('#playerDetails .row')[5].querySelectorAll('p')[3].innerHTML = matchesPlayed;
                    break;
                case 'AM': 
                    document.querySelectorAll('#playerDetails .row')[6].querySelectorAll('p')[1].innerHTML = avgRank;
                    document.querySelectorAll('#playerDetails .row')[6].querySelectorAll('p')[2].innerHTML = weightedRank;
                    document.querySelectorAll('#playerDetails .row')[6].querySelectorAll('p')[3].innerHTML = matchesPlayed;
                    break;
                default: 
                    //do nothing
            }
        },i*1000)
    }
    const lastMatchData = Object.fromEntries(Object.entries(masterData[masterData.length-1].result).map(a => {
            a[1] = Math.abs(a[1]);
            return a.reverse();
        }))
    document.querySelector('.hall-fame-name').innerHTML = lastMatchData[1];
    document.querySelector('.shout-out-audio').src = `asset/A${lastMatchData[1]}.mp3`;
}

const populateRankChart = () => {
    const seriesData = playerArray.map(item => ({
        name: item.name,
        color: item.color,
        data: [...masterData.map(data => Math.abs(data.result[item.id]?data.result[item.id]:0))],
    }))
    Highcharts.chart('rankChart', {
        ...commonChartObject,
        title: {
            text: 'RANK/MATCH'
        },
        yAxis: {
            title: {
                text: 'RANK'
            },
            reversed: true
        },
        xAxis: {
            categories:[...masterData.map(item => item.match)]
        },
        series: seriesData
    });
}

const populatePrizeChart = () => {
    const seriesData = playerArray.map(item => ({
        name: item.name,
        color: item.color,
        data: calculatePrize(item.id)
    }))
    Highcharts.chart('prizeChart', {
        ...commonChartObject,
        title: {
            text: 'PRIZE/MATCH'
        },
        yAxis: {
            title: {
                text: 'PRIZE'
            }
        },
        xAxis: {
            categories:[...masterData.map(item => item.match)]
        },
        series : seriesData
    })
}

const populateWinningChart = () => {
    const seriesData = playerArray.map(item => ({
        name: item.name,
        color: item.color,
        data: calculateWinning(item.id)
    }))
    Highcharts.chart('winningChart', {
        ...commonChartObject,
        title: {
            text: 'TOTAL WINNING'
        },
        yAxis: {
            title: {
                text: 'MONEY'
            }
        },
        xAxis: {
            categories:[...masterData.map(item => item.match)]
        },
        series :seriesData
    })
}

const populateNetChart = () => {
    const seriesData = playerArray.map(item => ({
        name: item.name,
        color: item.color,
        data: calculateNetTotal(item.id)
    }))
    Highcharts.chart('paymentChart', {
        ...commonChartObject,
        chart: {
            ...commonChartObject.chart,
            type: 'spline'
        },
        title: {
            text: 'NET WINNING'
        },
        yAxis: {
            title: {
                text: 'MONEY'
            }
        },
        xAxis: {
            categories:[...masterData.map(item => item.match)]
        },
        series : seriesData
    })
}

const populateNet2Chart = () => {
    const dataseries = [];
    for(let i=0; i < playerArray.length; i++) {
        const { id } = playerArray[i];
        const finalWinning = calculateNetTotal(id).pop();
        dataseries.push(finalWinning)
    }
    Highcharts.chart('paymentChart2', {
        ...commonChartObject,
        chart: {
            ...commonChartObject.chart,
            type: 'column'
        },
        title: {
            text: 'NET WINNING'
        },
        yAxis: {
            title: {
                text: 'MONEY'
            }
        },
        xAxis: {
            categories: [...playerArray.map(item => item.id)]
        },
        series :[
            {
                name: 'Winning',
                data: dataseries,
            }, 
        ]
    })
}

const populateMasterTable = () => {
    let tableHtml = ''
    for(let i=0; i < masterData.length; i++) {
        const rowData = masterData[i];
        const rankObject = Object.fromEntries(Object.entries(rowData.result).map(a => {
            a[1] = Math.abs(a[1]);
            return a.reverse();
        }))
        const rowHtml = `<div class="row"><p>Match No. ${rowData.number}</p><p>${rowData.match}</p>
        <p>${rowData.winner}</p>
        <p class=${rankObject[1] ? rankObject[1] : ''}>${rankObject[1] ? rankObject[1] : '--'}</p>
        <p class=${rankObject[2] ? rankObject[2] : ''}>${rankObject[2] ? rankObject[2] : '--'}</p>
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
                0:0,
                1:0,
                2:0,
                3:0,
                4:0,
                5:0,
                6:0,
                7:0
            }
        }
    });
    masterData.map(item => {
        playerArray.forEach(player => {
            const { id } = player
            recordObj[id] = {
                ...recordObj[id],
                [Math.abs(item.result[id])]: recordObj[id][Math.abs(item.result[id])]+1,
            }
        })
    });
    let recordHtml = '';
    playerArray.map(item => {
        const {id, imageAddress } = item;
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
    document.querySelector('.result-boxes').innerHTML = recordHtml
}

const triggerButtonSelection = node => {
    document.querySelector('.active').classList.remove('active');
    document.querySelector('.active-btn').classList.remove('active-btn');
    switch(node) {
        case 'avg': 
            document.querySelector('#playerDetails').classList.add('active');
            document.querySelectorAll('.btn')[0].classList.add('active-btn');
            populateRankTable();
            break;
        case 'rank': 
            document.querySelector('#rankChart').classList.add('active');
            document.querySelectorAll('.btn')[1].classList.add('active-btn');
            populateRankChart();
            break;
        case 'prize': 
            document.querySelector('#prizeChart').classList.add('active'); 
            document.querySelectorAll('.btn')[2].classList.add('active-btn');
            populatePrizeChart();
            break;
        case 'winning': 
            document.querySelector('#winningChart').classList.add('active'); 
            document.querySelectorAll('.btn')[3].classList.add('active-btn');
            populateWinningChart();
            break;
        case 'net': 
            document.querySelector('#paymentChart').classList.add('active'); 
            document.querySelectorAll('.btn')[4].classList.add('active-btn');
            populateNetChart();
            break;
        case 'net2': 
            document.querySelector('#paymentChart2').classList.add('active'); 
            document.querySelectorAll('.btn')[5].classList.add('active-btn');
            populateNet2Chart();
            break;
        case 'result': 
            document.querySelector('#resultTable').classList.add('active'); 
            document.querySelectorAll('.btn')[6].classList.add('active-btn');
            populateMasterTable();
            break;
        case 'record':
            document.querySelector('#recordtable').classList.add('active'); 
            document.querySelectorAll('.btn')[7].classList.add('active-btn');
            populateRecordTable();
            break;
        default: 
            document.querySelector('#rankChart').classList.add('active');
            document.querySelectorAll('.btn')[1].classList.add('active-btn');
            populateRankChart();
            break;
    }
}

const triggershoutOut = () => {
    document.querySelector('.shout-out-audio').play();
}
const domLoaded = () => {
    document.querySelector('.loading-msg').style.display = 'block';
    document.querySelector('.rank-table').style.display = 'none';
    fetch('https://api.npoint.io/551de43a8627ff944b27')
    .then(resp => resp.json())
    .then(response => {
        masterData = response
        triggerButtonSelection('avg');
    });
    
}

document.addEventListener('DOMContentLoaded', domLoaded, false);