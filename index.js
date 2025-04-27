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
    { name: 'Nikhil', nickName:'Bhaukali Bhalu', id: 'NT', num: 7, color: '#330080', imageAddress: 'asset/NT.jpeg' },
    { name: 'Parinav', nickName:'Jumbo Haathi', id: 'PJ', num: 8, color: '#14AE80', imageAddress: '' },
    { name: 'Swati', nickName:'Chakri Bakri', id: 'SWJ', num: 9, color: '#03AA78', imageAddress: '' },
    { name: 'Neha', nickName:'Chanakya Cheetah', id: 'NPJ', num: 10, color: '#66EE51', imageAddress: '' },
    { name: 'Jaya', nickName:'Ponga Pandit', id: 'JJ', num: 11, color: '#7D8421', imageAddress: '' }
];

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

const conversionFactor = {
    "1": [0, 11],
    "2": [0, 1, 11], //done
    "3": [0, 1, 6, 11], // done
    "4": [0, 1, 4.3, 7.6, 11], // done
    "5": [0, 1, 3.5, 6, 8.5, 11], //done 
    "6": [0, 1, 3, 5, 7, 9, 11], //done 
    "7": [0, 1, 2.6, 4.2, 6, 7.6, 9.2, 11], // done
    "8": [0, 1, 2.4, 3.8, 5.2, 6.6, 8, 9.4, 11], //done
    "9": [0, 1, 2.25, 3.5, 4.75, 6, 7.25, 8.5, 9.75, 11], //done
    "10": [0, 1, 2.1, 3.2, 4.3, 5.4, 6.5, 7.6, 8.9, 9.8, 11], //done
    "11": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], //done
    "12": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], //done
}

//This function generates the table with basic detail which can be seen on dashboard.
const populateRankTable = () => {
    const displayOrder = [];
    for (let i = 0; i < playerArray.length; i++) {
        const { id: player, nickName, name } = playerArray[i];
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
        let avgRank = (rankSum / matchesPlayed).toFixed(2);
        let weightedRank = (weightedSum / matchesPlayed).toFixed(2);

        avgRank = isNaN(avgRank) ? 'N/A' : avgRank;
        weightedRank = isNaN(weightedRank) ? 'N/A' : weightedRank;
        displayOrder.push({
            player,
            name,
            nickName,
            avgRank,
            weightedRank,
            matchesPlayed,
        })
    } 
    displayOrder.sort((a, b) => a.avgRank > b.avgRank ? 1 : -1);
    const rowData = displayOrder.map(item => `<tr><td><b>${item.nickName}</b>(${item.name})</td><td>${item.avgRank}</td><td>${item.weightedRank}</td><td>${item.matchesPlayed}</td></tr>`)
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
        // } else if(masterData[i].number === 29){
        //     // Condition for winner takes all and rank tied
        //     if(playerName === 'VJ' || playerName === 'AM' ){
        //         winning = resultArray[i - 1] + 400
        //     } else {
        //         winning = resultArray[i - 1]
        //     }
        // } else if([71,73].includes(masterData[i].number)){
        //     // eliminator 1/3
        //     winning = resultArray[i - 1] + (winning * 2);
        // } else if(masterData[i].number === 74){
        //     // final
        //     winning = resultArray[i - 1] + (winning * 4);
        // } else 

        if (masterData[i].number === 6){
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
        } else if (masterData[i].number === 30){
            // SCORES TIED
            // Condition for specifci match where scores were tied
            if (playerName === 'SSJ') {
                winning = resultArray[i - 1] + 275;
            } else if (playerName === 'AM') {
                winning = resultArray[i - 1] + 175;
            } else if (playerName === 'SJ') {
                winning = resultArray[i - 1] + 50;
            } else if (playerName === 'CJ') {
                winning = resultArray[i - 1] + 50;
            } else {
                winning = resultArray[i - 1]
            }
        } else if (Object.values(masterData[i].result).includes(-1)) {
            // Condition for winner takes all
            if (masterData[i].result[playerName] === -1) {
                winning = (resultArray[i - 1] || 0) + ((prizeArray.length-1) * ENTRY_FEE);
            } else {
                winning = resultArray[i - 1] || 0;
            }
        } else if (winning === undefined) {
            winning = resultArray[i - 1] ? resultArray[i - 1] : 0
        } else if (i !== 0) {
            winning += resultArray[i - 1];
        }
        if (masterData[i].played.includes(playerName)) {
            // if(masterData[i].number >= 71 && masterData[i].number <= 73){
            //     winning = winning - (ENTRY_FEE * 2);
            // } else if(masterData[i].number === 74){
            //     winning = winning - (ENTRY_FEE * 4);
            // } else {
                winning -= ENTRY_FEE
            // }
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
            foreColor: '#ffffff',
            toolbar: {
                show: false,
            }
        },
        tooltip: {
            enabled: false,
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
    for(let j=0; j<12; j++){
        lastMatchSum += winningArray[j][lastMatchIndex];
    }
    return lastMatchSum;
};

//This funcion is triggered on DOM load and loads default charts on dashbaord.
const domLoaded = () => {
    fetch('https://api.npoint.io/9e9b4019fec4946a0f9a')
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