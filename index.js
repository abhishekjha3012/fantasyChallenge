let masterData = [];

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
    "8": [0, 400, 300, 100, 0, 0, 0, 0, 0]
}

const conversionFactor = {
    "1": [0, 8],
    "2": [0, 1, 8], //done
    "3": [0, 1, 4.5, 8], // done
    "4": [0, 1, 3.35, 5.70, 8], // done
    "5": [0, 1, 2.75, 4.5, 6.25, 8], //done
    "6": [0, 1, 2.6, 3.2, 4.8, 6.4, 8], //done
    "7": [0, 1, 2.15, 3.20, 4.45, 5.6, 6.75, 8], //done
    "8": [0, 1, 2, 3, 4, 5, 6, 7, 8] // done
}

//This function generates the table with basic detail which can be seen on dashboard.
const populateRankTable = () => {
    const displayOrder = [];
    for (let i = 0; i < playerArray.length; i++) {
        const { id: player, nickName } = playerArray[i];
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
            nickName,
            avgRank,
            weightedRank,
            matchesPlayed,
        })
    } 
    displayOrder.sort((a, b) => a.avgRank > b.avgRank ? 1 : -1);
    const rowData = displayOrder.map(item => `<tr><td>${item.nickName}</td><td>${item.avgRank}</td><td>${item.weightedRank}</td><td>${item.matchesPlayed}</td></tr>`)
    document.querySelector('.rankTable tbody').innerHTML = rowData.join('');
   
    // const lastMatchData = Object.fromEntries(Object.entries(masterData[masterData.length - 1].result).map(a => {
    //     a[1] = Math.abs(a[1]);
    //     return a.reverse();
    // }))
    // document.querySelector('.hall-fame-name').textContent = lastMatchData[1];
    // document.querySelector('.shout-out-audio').src = `asset/A${lastMatchData[1]}.mp3`;
    
}

const calculateNetTotal = playerName => {
    let resultArray = [];
    for (let i = 0; i < masterData.length; i++) {
        const prizeArray = prizeMoney[masterData[i].played.length.toString()];
        let winning = prizeArray[masterData[i].result[playerName]];
        // if (masterData[i].number === 6){
            // SCORES TIED
            // Condition for specifci match where scores were tied
            // if (playerName === 'SJ' || playerName === 'SSJ') {
            //     winning = resultArray[i - 1] + 200;
            // } else {
            //     winning = resultArray[i - 1]
            // }
        //} else 
        if(masterData[i].number === 11){
            if (playerName === 'VJ' || playerName === 'SSJ') {
                winning = resultArray[i - 1] + 50;
            } else if(playerName === 'AM'){
                winning = resultArray[i - 1] + 400
            } else if(playerName === 'CJ'){
                winning = resultArray[i - 1] + 300
            } else {
                winning = resultArray[i - 1]
            }
        } else if(masterData[i].number === 29){
            // Condition for winner takes all and rank tied
            if(playerName === 'VJ' || playerName === 'AM' ){
                winning = resultArray[i - 1] + 400
            } else {
                winning = resultArray[i - 1]
            }
        } else if(masterData[i].number === 72) {
            // eliminator 2
            if(playerName === 'VJ' || playerName === 'AM'){
                winning = resultArray[i - 1] + 700;
            } else if(playerName === 'CJ'){
                winning = resultArray[i - 1] + 200;
            }else {
                winning = resultArray[i - 1];
            }
        } else if([71,73].includes(masterData[i].number)){
            // eliminator 1/3
            winning = resultArray[i - 1] + (winning * 2);
        } else if(masterData[i].number === 74){
            // final
            winning = resultArray[i - 1] + (winning * 4);
        } else if (Object.values(masterData[i].result).includes(-1)) {
            // Condition for winner takes all
            if (masterData[i].result[playerName] === -1) {
                winning = resultArray[i - 1] + ((prizeArray.length-1) * ENTRY_FEE);
            } else {
                winning = resultArray[i - 1]
            }
        } else if (winning === undefined) {
            winning = resultArray[i - 1] ? resultArray[i - 1] : 0
        } else if (i !== 0) {
            winning += resultArray[i - 1];
        }
        if (masterData[i].played.includes(playerName)) {
            if(masterData[i].number >= 71 && masterData[i].number <= 73){
                winning = winning - (ENTRY_FEE * 2);
            } else if(masterData[i].number === 74){
                winning = winning - (ENTRY_FEE * 4);
            } else {
                winning -= ENTRY_FEE
            }
        }
        resultArray.push(winning)
    }
    return resultArray;
}

//This function generates the chart with final winning amount till update date
const populateNetChart = () => {
    const dataseries = playerArray.map(item => calculateNetTotal(item.id).pop());
    const options = {
        chart: {
            type: 'bar',
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
            width: 1,
            colors: ["#fff"]
        },
        series: [{
            name: 'Win',
            data: dataseries
        }],
        xaxis: {
            categories: playerArray.map(item => item.nickName)
        }
    }

    const chart = new ApexCharts(document.querySelector("#paymentChart2"), options);
    chart.render();
}

//This function triggers play when audio is clicked.
const triggershoutOut = () => {
    document.querySelector('.shout-out-audio').play();
}

const populateLastMatchDetail = () => {
    document.querySelector('.last-match-detail').innerHTML = `
        Last match updated:  ${masterData[masterData.length - 1].number} : ${masterData[masterData.length - 1].match}
        <br>Last match absolute winning: ${populateAbsoluteWinningForLastMatch()}`
}

const populateAbsoluteWinningForLastMatch = () => {
    const winningArray = playerArray.map(item => calculateNetTotal(item.id));
    const lastMatchIndex = masterData.length - 1;
    let lastMatchSum = 0;
    for(let j=0; j<8; j++){
        lastMatchSum += winningArray[j][lastMatchIndex];
    }
    return lastMatchSum;
};

//This funcion is triggered on DOM load and loads default charts on dashbaord.
const domLoaded = () => {
    fetch('https://api.npoint.io/781b99ffafaead6f476f')
        .then(resp => resp.json())
        .then(response => {
            masterData = response;
            document.querySelector('.d-none')?.classList.remove('d-none');
            document.querySelector('.d-block')?.classList.replace('d-block', 'd-none');
            populateRankTable();
            populateNetChart();
            populateLastMatchDetail();
        });
}
document.addEventListener('DOMContentLoaded', domLoaded, false);