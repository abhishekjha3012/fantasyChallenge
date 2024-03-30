let masterData = [];

//List of players who are playing
const playerArray = [
    { name: 'Abhishek', id: 'AJ', num: 0, color: '#B1FFAD', imageAddress: 'asset/AJ.jpeg' },
    { name: 'Sonali', id: 'SJ', num: 1, color: '#FF9077', imageAddress: 'https://stickerly.pstatic.net/sticker_pack/JoOAsHhrZM342DXak4nYQ/HIZAPW/2/bea565ec-c108-4808-b041-6ebe2924b12c.png' },
    { name: 'Varsha', id: 'VJ', num: 2, color: '#8E9DFF', imageAddress: 'https://stickerly.pstatic.net/sticker_pack/CWqJyA7W1seavKQUFJ7A/3WATSW/16/5bade8dc-d62e-41d8-b0ee-358bde44a10e.png' },
    { name: 'Keshav', id: 'KT', num: 3, color: '#566573', imageAddress: 'asset/KT.gif' },
    { name: 'Saurabh', id: 'SSJ', num: 4, color: '#F7FF8E', imageAddress: 'asset/SSJ.png' },
    { name: 'Aishwaryah', id: 'AM', num: 5, color: '#8EFFF7', imageAddress: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-gfQe8gjby3PROpW_GW0K2-3OjoVXYM_EvA&usqp=CAU' },
    { name: 'Chanchal', id: 'CJ', num: 6, color: '#800080', imageAddress: 'asset/CJ.jpeg' },
    { name: 'Nikhil', id: 'NT', num: 7, color: '#330080', imageAddress: 'asset/NT.jpeg' }
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
    "7": [0, 400, 300, 0, 0, 0, 0, 0],
    "8": [0, 400, 300, 100, 0, 0, 0, 0]
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
        })
    } 
    document.querySelector('.loading-msg').style.display = 'none';
    document.querySelector('#rankTable').style.display = 'block';
    displayOrder.sort((a, b) => a.avgRank > b.avgRank ? 1 : -1);
    const rowData = displayOrder.map(item => `<tr><td>${item.player}</td><td>${item.avgRank}</td><td>${item.weightedRank}</td><td>${item.matchesPlayed}</td></tr>`)
    document.querySelector('#rankTable tbody').innerHTML = rowData.join('');
   
    // const lastMatchData = Object.fromEntries(Object.entries(masterData[masterData.length - 1].result).map(a => {
    //     a[1] = Math.abs(a[1]);
    //     return a.reverse();
    // }))
    // document.querySelector('.hall-fame-name').textContent = lastMatchData[1];
    // document.querySelector('.shout-out-audio').src = `asset/A${lastMatchData[1]}.mp3`;
    // document.querySelector('.last-match-detail').innerHTML = `
    //     Last match updated:  ${masterData[masterData.length - 1].number} : ${masterData[masterData.length - 1].match}`
}

//This function generates the chart with final winning amount till update date
// const populateNet2Chart = () => {
//     const dataseries = playerArray.map(item => calculateNetTotal(item.id).pop());
//     const options = {
//         chart: {
//             type: 'bar',
//             width: "100%",
//             height: 500,
//             toolbar: {
//                 show: false,
//             }
//         },
//         dataLabels: {
//             enabled: false
//         },
//         stroke: {
//             width: 1,
//             colors: ["#fff"]
//         },
//         series: [{
//             name: 'Win',
//             data: dataseries
//         }],
//         xaxis: {
//             categories: playerArray.map(item => item.id)
//         }
//     }

//     const chart = new ApexCharts(document.querySelector("#paymentChart2"), options);
//     chart.render();
// }

//This populates master table with each match data rank list.
const populateMasterTable = () => {
    const displayOrder = masterData.map(item => {
        const rankObject = Object.fromEntries(Object.entries(item.result).map(a => {
            a[1] = Math.abs(a[1]);
            return a.reverse();
        }))
        // SCORES TIED
        // if(item.number === 4) {
        //     rankObject[1] = 'VJ/KT'
        // } else if(item.number === 6) {
        //     rankObject[1] = 'SJ/SSJ'
        // }
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
            rank8: rankObject[8] || '--',
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
            { field: "rank7", headerName: "Rank 7" }, 
            { field: "rank8", headerName: "Rank 8" }
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
                7: 0,
                8: 0
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
                    <p>Rank 7: <span>${recordObj[id][7]}</span></p><p>Rank 8: <span>${recordObj[id][8]}</span></p>
                    <p>Not played: <span>${recordObj[id][0]}</span></p>
                </div>
            </div>
        </div>`

    })
    document.querySelector('#recordtable').innerHTML = recordHtml
}

//This function shows/hides chart based on user click on left menu nav.

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
    fetch('https://api.npoint.io/781b99ffafaead6f476f')
        .then(resp => resp.json())
        .then(response => {
            masterData = response
            document.querySelector('.loading-msg').style.display = 'none';
        });
}
document.addEventListener('DOMContentLoaded', domLoaded, false);