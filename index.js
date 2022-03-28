let masterData = [];
const prizeMoney = {
    "1": [0,100],
    "2": [0,200, 0],
    "3": [0,200,100,0],
    "4": [0,250,150,0,0],
    "5": [0,300,200,0,0,0],
    "6": [0,400,200,0,0,0,0]
}
//t/est
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
        title: {
            text: 'RANK-MATCH'
        },
        yAxis: {
            title: {
                text: 'RANK'
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
            }, 

        ]
    });
}

const populatePrizeChart = () => {
    Highcharts.chart('prizeChart', {
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
            }, 

        ]
    })
}

const populateWinningChart = () => {
    Highcharts.chart('winningChart', {
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
            }, 

        ]
    })
}

const populateNetChart = () => {
    Highcharts.chart('paymentChart', {
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
            }, 

        ]
    })
}

const showData = (node) => {
    document.querySelector('.active').classList.remove('active')
    switch(node) {
        case 'rank': document.querySelector('#matchChart').classList.add('active'); break;
        case 'prize': document.querySelector('#prizeChart').classList.add('active'); break;
        case 'winning': document.querySelector('#winningChart').classList.add('active'); break;
        case 'net': document.querySelector('#paymentChart').classList.add('active'); break;
        case 'result': document.querySelector('#resultTable').classList.add('active'); break;
        default: document.querySelector('#matchChart').classList.add('active'); break;
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
              "result": "KKR",
              "number": 1,
              "played": ["AJ", "SJ", "VJ", "KT"],
              "result": {
                "AJ": 1,
                "VJ": 2,
                "SJ": 3,
                "KT" : 4,
                "SSJ":0
              }
            },
            {
              "match": "DC vs MI",
              "result": "DC",
              "number": 2,
              "played": ["AJ", "SJ", "VJ", "KT"],
              "result": {
                "AJ": 4,
                "VJ": 3,
                "SJ": 1,
                "KT" : 2,
                "SSJ":0
              }
            },
            {
              "match": "PBKS vs BLR",
              "result": "PBK",
              "number": 3,
              "played": ["AJ", "SJ", "VJ", "KT"],
              "result": {
                "AJ": 4,
                "VJ": 1,
                "SJ": 3,
                "KT" : 1,
                "SSJ":0
              }
            }
        ]
        populateMatchChart();
        populatePrizeChart();
        populateWinningChart();
        populateNetChart();

     });
}

document.addEventListener('DOMContentLoaded', domLoaded, false);