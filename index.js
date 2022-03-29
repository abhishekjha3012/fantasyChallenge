let masterData = [];
const playerList = ["AJ", "SJ", "VJ", "KT", "SJ", "PJ"];
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
        if(i !== 0){
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
        if(i !== 0){
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
        resultArray.push(winning)
    }
    return resultArray;
}

const populateMatchChart = () => {
    Highcharts.chart('matchChart', {
        credits: {
            enabled: false
        },
        title: {
            text: 'RANK-MATCH'
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
                data: [...masterData.map(item => item.result.AJ)],
            }, {
                name: 'Sonali',
                data: [...masterData.map(item => item.result.SJ)],
            }, {
                name: 'Varsha',
                data: [...masterData.map(item => item.result.VJ)],
            }, {
                name: 'Keshav',
                data: [...masterData.map(item => item.result.KT)],
            }, {
                name: 'Saurabh',
                data: [...masterData.map(item => item.result.SSJ)],
            }, {
                name: 'Parinav',
                data: [...masterData.map(item => item.result.PJ)],
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
            text: 'RANK-PRIZE'
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
            type: 'line'
        },
        title: {
            text: 'NET VALUE'
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

const populateMasterTable = () => {
    let tableHtml = ''
    for(let i=0; i < masterData.length; i++) {
        const rowData = masterData[i];
        const rankObject = Object.fromEntries(Object.entries(rowData.result).map(a => a.reverse()))
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

const showData = node => {
    document.querySelector('.active').classList.remove('active');
    document.querySelector('.active-btn').classList.remove('active-btn');
    switch(node) {
        case 'avg': 
            document.querySelector('#playerDetails').classList.add('active');
            document.querySelectorAll('.btn')[0].classList.add('active-btn');
            populateRankTable();
            break;
        case 'rank': 
            document.querySelector('#matchChart').classList.add('active');
            document.querySelectorAll('.btn')[1].classList.add('active-btn');
            populateMatchChart();
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
        case 'result': 
            document.querySelector('#resultTable').classList.add('active'); 
            document.querySelectorAll('.btn')[5].classList.add('active-btn');
            populateMasterTable();
            break;
        default: 
            document.querySelector('#matchChart').classList.add('active');
            document.querySelectorAll('.btn')[1].classList.add('active-btn');
            populateMatchChart();
            break;
    }
}

const populateRankTable = () => {
    for(let i=0; i < playerList.length; i++) {
        const player = playerList[i];
        let matchesPlayed = 0;
        let rankSum = 0;
        for(let i=0; i < masterData.length; i++) {
            if(masterData[i].played.includes(player)) {
                matchesPlayed++;
                rankSum += masterData[i].result[player];
            }
        }
        const avgRank = rankSum/matchesPlayed;
        switch(player){
            case 'AJ': 
                document.querySelectorAll('#playerDetails .row')[0].querySelectorAll('p')[1].innerHTML = avgRank;
                break;
            case 'SJ': 
                document.querySelectorAll('#playerDetails .row')[1].querySelectorAll('p')[1].innerHTML = avgRank;
                break;
            case 'VJ': 
                document.querySelectorAll('#playerDetails .row')[2].querySelectorAll('p')[1].innerHTML = avgRank;
                break;
            case 'KT': 
                document.querySelectorAll('#playerDetails .row')[3].querySelectorAll('p')[1].innerHTML = avgRank;
                break;
            case 'SSJ': 
                document.querySelectorAll('#playerDetails .row')[4].querySelectorAll('p')[1].innerHTML = avgRank;
                break;
            case 'PJ': 
                document.querySelectorAll('#playerDetails .row')[5].querySelectorAll('p')[1].innerHTML = avgRank;
                break;
            default: 
                //do nothing

        }
    }
}

const domLoaded = () => {
    fetch('https://api.npoint.io/fafef1fd28b751041f0f')
    .then(resp => resp.json())
    .then(response => {
        //masterData = response
        masterData = [
            {
              "match": "CSK vs KKR",
              "winner": "KKR",
              "number": 1,
              "played": ["AJ", "SJ", "VJ", "KT"],
              "result": {
                "AJ": 1,
                "VJ": 2,
                "SJ": 3,
                "KT": 4,
                "SSJ":0,
                "PJ": 0,
              }
            },
            {
              "match": "DC vs MI",
              "winner": "DC",
              "number": 2,
              "played": ["AJ", "SJ", "VJ", "KT"],
              "result": {
                "AJ": 4,
                "VJ": 3,
                "SJ": 1,
                "KT" : 2,
                "SSJ":0,
                "PJ": 0,
              }
            },  {
              "match": "PBKS vs BLR",
              "winner": "PBK",
              "number": 3,
              "played": ["AJ", "SJ", "VJ", "KT"],
              "result": {
                "AJ": 4,
                "VJ": 2,
                "SJ": 3,
                "KT" : 1,
                "SSJ": 0,
                "PJ": 0,
              }
            },{
                "match": "GT vs LKN",
                "winner": "GT",
                "number": 3,
                "played": ["AJ", "SJ", "VJ", "KT", "PJ"],
                "result": {
                  "AJ": 2,
                  "VJ": 5,
                  "SJ": 4,
                  "KT" : 1,
                  "SSJ":0,
                  "PJ": 3
                }
              }
        ]
        showData('avg');
    });
}

document.addEventListener('DOMContentLoaded', domLoaded, false);