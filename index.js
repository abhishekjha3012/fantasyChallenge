let masterData = [];
const playerList = ["AJ", "SJ", "VJ", "KT", "SSJ", "PJ"];
const prizeMoney = {
    "1": [0,100],
    "2": [0,200, 0],
    "3": [0,200,100,0],
    "4": [0,250,150,0,0],
    "5": [0,300,200,0,0,0],
    "6": [0,400,200,0,0,0,0]
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
        }
        resultArray.push(winning)
    }
    return resultArray;
}

const populateRankTable = () => {
    for(let i=0; i < playerList.length; i++) {
        const player = playerList[i];
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
            default: 
                //do nothing

        }
    }
}

const populateRankChart = () => {
    Highcharts.chart('rankChart', {
        credits: {
            enabled: false
        },
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
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series :[
            {
                name: 'Abhishek',
                data: [...masterData.map(item => Math.abs(item.result.AJ))],
            }, {
                name: 'Sonali',
                data: [...masterData.map(item => Math.abs(item.result.SJ))],
            }, {
                name: 'Varsha',
                data: [...masterData.map(item => Math.abs(item.result.VJ))],
            }, {
                name: 'Keshav',
                data: [...masterData.map(item => Math.abs(item.result.KT))],
            }, {
                name: 'Saurabh',
                data: [...masterData.map(item => Math.abs(item.result.SSJ))],
            }, {
                name: 'Parinav',
                data: [...masterData.map(item => Math.abs(item.result.PJ))],
            }

        ]
    });
}

const populatePrizeChart = () => {
    Highcharts.chart('prizeChart', {
        credits: {
            enabled: false
        },
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
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series :[
            {
                name: 'Abhishek',
                data: calculatePrize('AJ'),
            }, {
                name: 'Sonali',
                data: calculatePrize('SJ'),
            }, {
                name: 'Varsha',
                data: calculatePrize('VJ'),
            }, {
                name: 'Keshav',
                data: calculatePrize('KT'),
            }, {
                name: 'Saurabh',
                data: calculatePrize('SSJ'),
            }, {
                name: 'Parinav',
                data: calculatePrize('PJ'),
            }
        ]
    })
}

const populateWinningChart = () => {
    Highcharts.chart('winningChart', {
        credits: {
            enabled: false
        },
          chart: {
            type: 'line'
        },
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
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series :[
            {
                name: 'Abhishek',
                data: calculateWinning('AJ'),
            }, {
                name: 'Sonali',
                data: calculateWinning('SJ'),
            }, {
                name: 'Varsha',
                data: calculateWinning('VJ'),
            }, {
                name: 'Keshav',
                data: calculateWinning('KT'),
            }, {
                name: 'Saurabh',
                data: calculateWinning('SSJ'),
            }, {
                name: 'Parinav',
                data: calculateWinning('PJ'),
            }
        ]
    })
}

const populateNetChart = () => {
    Highcharts.chart('paymentChart', {
        credits: {
            enabled: false
        },
          chart: {
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
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series :[
            {
                name: 'Abhishek',
                data: calculateNetTotal('AJ'),
            }, {
                name: 'Sonali',
                data: calculateNetTotal('SJ'),
            }, {
                name: 'Varsha',
                data: calculateNetTotal('VJ'),
            }, {
                name: 'Keshav',
                data: calculateNetTotal('KT'),
            }, {
                name: 'Saurabh',
                data: calculateNetTotal('SSJ'),
            }, {
                name: 'Parinav',
                data: calculateNetTotal('PJ'),
            }
        ]
    })
}
const populateNet2Chart = () => {
    const dataseries = [];
    for(let i=0; i < playerList.length; i++) {
        const player = playerList[i];
        const finalWinning = calculateNetTotal(player).pop();
        dataseries.push(finalWinning)
    }
    Highcharts.chart('paymentChart2', {
        credits: {
            enabled: false
        },
        chart: {
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
            categories: playerList
        },
        legend: {
            enabled: false
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
        <p>${rankObject[1] ? rankObject[1] : '--'}</p>
        <p>${rankObject[2] ? rankObject[2] : '--'}</p>
        <p>${rankObject[3] ? rankObject[3] : '--'}</p>
        <p>${rankObject[4] ? rankObject[4] : '--'}</p>
        <p>${rankObject[5] ? rankObject[5] : '--'}</p>
        <p>${rankObject[6] ? rankObject[6] : '--'}</p>
        </div>`
        tableHtml += rowHtml;
    }
    document.querySelector('.row-body').innerHTML = tableHtml;
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
        default: 
            document.querySelector('#rankChart').classList.add('active');
            document.querySelectorAll('.btn')[1].classList.add('active-btn');
            populateRankChart();
            break;
    }
}

const domLoaded = () => {
    fetch('https://api.npoint.io/551de43a8627ff944b27')
    .then(resp => resp.json())
    .then(response => {
        masterData = response
        triggerButtonSelection('avg');
        triggerButtonSelection('rank');
        triggerButtonSelection('prize');
        triggerButtonSelection('winning');
        triggerButtonSelection('net');
        triggerButtonSelection('net2');
        triggerButtonSelection('result');
    });
}

document.addEventListener('DOMContentLoaded', domLoaded, false);