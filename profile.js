let profilePageMasterData = [];

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
    { name: 'Swati', nickName:'Chakri Bakri', id: 'SWJ', num: 9, color: '#03AA78', imageAddress: 'asset/SWJ.png' },
    { name: 'Neha', nickName:'Chanakya Cheetah', id: 'NPJ', num: 10, color: '#66EE51', imageAddress: '' }
];

const getPlayerId = () => {
    const playerName = document.querySelector('.profile-player-select').value;
    const playerId = playerArray.find(item => item?.nickName === playerName).id;
    return playerId;
}

const populateDropdown = () => {
    const team1Array = playerArray.map(item => `<option>${item.nickName}</option>`);
    document.querySelector('.profile-player-select').innerHTML = team1Array.join(',');
}

//This populates card with individual wins for all ranks.
const populateRecordTable = () => {
    const playerId = getPlayerId();
    let rankArray = Array(playerArray.length+1).fill(0);
    profilePageMasterData.forEach(item => {
        const rankToUpdate = Math.abs(item.result[playerId]) || 0;
        rankArray[rankToUpdate] += 1 ;
    });
    return rankArray;
}

const populateDonutChart = () => {
    const options = {
        chart: {
            type: 'donut',
            width: "100%",
            height: 800,
            toolbar: {
                show: false,
            }
        },
        series: populateRecordTable(),
        labels:['Not played', 'Rank 1', 'Rank 2', 'Rank 3', 'Rank 4', 'Rank 5', 'Rank 6','Rank 7', 'Rank 8', 'Rank 9', 'Rank 10', 'Rank 11'],
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return parseInt(val) + "%"
            },
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '22px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            color: undefined,
                            offsetY: -10,
                            formatter: function (val) {
                              return val
                            }
                        },
                        value: {
                        show: true,
                        fontSize: '16px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 400,
                        color: undefined,
                        offsetY: 16,
                        formatter: function (val) {
                            return val
                        }
                        },
                        total: {
                        show: false,
                        showAlways: false,
                        label: 'Total',
                        fontSize: '22px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                        color: '#373d3f',
                        formatter: function (w) {
                            return w.globals.seriesTotals.reduce((a, b) => {
                            return a + b
                            }, 0)
                        }
                        }
                    }
                }
            }
        }
    }
    const chart = new ApexCharts(document.querySelector(".rank-donut-chart"), options);
    chart.render();
}

const showProfileData = () => {
    const hiddenNodes = document.querySelectorAll('.d-none');
    hiddenNodes.forEach(item => item.classList.remove('d-none'));
    const id = getPlayerId();
    const playerData = playerArray.find(item => item?.id === id);
    document.querySelector('.profile-photo').setAttribute('src', playerData.imageAddress)
    document.querySelector('.profile-name').innerHTML = playerData.name;
    document.querySelector('.profile-nick-name').innerHTML = playerData.nickName;
    populateDonutChart();
}

const domLoaded = () => {
    fetch('https://api.npoint.io/9e9b4019fec4946a0f9a')
        .then(resp => resp.json())
        .then(response => {
            profilePageMasterData = response;
            populateDropdown();
        });
}
document.addEventListener('DOMContentLoaded', domLoaded, false);