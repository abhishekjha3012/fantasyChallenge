const tableUrl = 'https://api.covid19india.org/v3/min/data.min.json';
const newsUrl = ' https://api.covid19india.org/updatelog/log.json';

const STATE_NAMES = {
    AP: 'Andhra Pradesh',
    AR: 'Arunachal Pradesh',
    AS: 'Assam',
    BR: 'Bihar',
    CT: 'Chhattisgarh',
    GA: 'Goa',
    GJ: 'Gujarat',
    HR: 'Haryana',
    HP: 'Himachal Pradesh',
    JH: 'Jharkhand',
    KA: 'Karnataka',
    KL: 'Kerala',
    MP: 'Madhya Pradesh',
    MH: 'Maharashtra',
    MN: 'Manipur',
    ML: 'Meghalaya',
    MZ: 'Mizoram',
    NL: 'Nagaland',
    OR: 'Odisha',
    PB: 'Punjab',
    RJ: 'Rajasthan',
    SK: 'Sikkim',
    TN: 'Tamil Nadu',
    TG: 'Telangana',
    TR: 'Tripura',
    UT: 'Uttarakhand',
    UP: 'Uttar Pradesh',
    WB: 'West Bengal',
    AN: 'Andaman and Nicobar Islands',
    CH: 'Chandigarh',
    DN: 'Dadra and Nagar Haveli and Daman and Diu',
    DL: 'Delhi',
    JK: 'Jammu and Kashmir',
    LA: 'Ladakh',
    LD: 'Lakshadweep',
    PY: 'Puducherry',
    TT: 'Total',
    UN: 'Unassigned',
};

const defaultColDef = {
    width: 140,
    sortable: true,
};

const columnDefs = [
    {headerName: "State/UT", field: "state", width: '180'},
    {headerName: "Confirmed", field: "confirmed", sort:'desc'},
    {headerName: "Active (%) ", field: "active"},
    {headerName: "Recovered(%)", field: "recovered"},
    {headerName: "Deceased (%)", field: "deceased" },
    
];

const fetchNewsData = () => {
    return fetch(newsUrl)
    .then(resp => resp.json())
    .then(response => response)
    .catch(error => console.log(error));
};

const fetchTableData = () => {
    return fetch(tableUrl)
    .then(resp => resp.json())
    .then(response => response)
    .catch(error => console.log(error));
};

const formatTableData = data => {
    let formattedRowData = [];
    for(const [key,{ total = {} } ] of Object.entries(data)){
        const { confirmed=0, recovered=0, deceased=0 } = total
        const active = confirmed-recovered-deceased;
        const activePercent = confirmed === 0 ? 0.00 : Math.round(active* 100 / confirmed);
        const recoveredPercent = confirmed === 0? 0.00 : Math.round(recovered * 100 / confirmed);
        const deceasedPercent =confirmed === 0 ? 0.00 : Math.round(deceased * 100 / confirmed);
        formattedRowData.push({
            state: STATE_NAMES[key],
            confirmed,
            active: `${active} (${activePercent}%)` ,
            recovered: `${recovered} (${recoveredPercent}%)`,
            deceased: `${deceased} (${deceasedPercent}%)`,
        })
    };
    return formattedRowData;
};

const paintNews = async () => {
    let newsData = await fetchNewsData();
    const newsHtml = newsData.map(item => (
        `<div class='news-box'>
            <p class='update'>${item.update}</p>
            <p class='time'>${moment(item.timestamp).format('DD/MM/YYYY hh:mm a')}</p>
        </div>`
    ));
    document.querySelector('#news .news-body').innerHTML= newsHtml.join(',');
};

const paintTable = async () => {
    const rowData = await fetchTableData();
    const formattedRowData= formatTableData(rowData);   
    const gridDiv = document.querySelector('#myGrid');
    const gridOptions = {
        columnDefs,
        defaultColDef,
        animateRows:true,
        postSort: postSort(),
        rowData: formattedRowData
    };
    new agGrid.Grid(gridDiv, gridOptions);
};

const postSort = rowNodes => {
    console.log(rowNodes);
};
    
document.addEventListener('DOMContentLoaded', function() {
    paintNews();
    paintTable();    
});