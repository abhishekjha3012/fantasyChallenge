const tableUrl = 'https://api.covid19india.org/v3/min/data.min.json';
const newsUrl = ' https://api.covid19india.org/updatelog/log.json';

let rowData = [];
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
    {headerName: "State/UT", field: "state", width: '100'},
    {headerName: "Confirmed", field: "confirmed", sort:'desc'},
    {headerName: "Active (%) ", field: "active"},
    {headerName: "Recovered(%)", field: "recovered"},
    {headerName: "Deceased (%)", field: "deceased" },    
];

const onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
}

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

const paintDetail = () => {
    const detailData = rowData['TT'];
    const { confirmed=0, recovered=0, deceased=0, tested=0, migrated=0 } = detailData.total;
    const { confirmed: dconfirmed = 0, 
            recovered:drecovered = 0, 
            deceased: ddeceased = 0, 
            tested: dtested = 0, 
            migrated: dmigrated = 0 } = detailData.delta;
    const active = confirmed-recovered-deceased;
    const dactive = dconfirmed-drecovered-ddeceased;

    document.querySelector('.detail-confirmed .total-count').innerHTML = confirmed;
    document.querySelector('.detail-confirmed .today-count').innerHTML = dconfirmed;

    document.querySelector('.detail-active .total-count').innerHTML = active;
    document.querySelector('.detail-active .today-count').innerHTML = dactive;
    
    document.querySelector('.detail-recovered .total-count').innerHTML = recovered;
    document.querySelector('.detail-recovered .today-count').innerHTML = drecovered;

    document.querySelector('.detail-deceased .total-count').innerHTML = deceased;
    document.querySelector('.detail-deceased .today-count').innerHTML = ddeceased;

    document.querySelector('.detail-tested .total-count').innerHTML = tested;
    document.querySelector('.detail-tested .today-count').innerHTML = dtested;

    document.querySelector('.detail-migrated .total-count').innerHTML = migrated;
    document.querySelector('.detail-migrated .today-count').innerHTML = dmigrated;
}

const paintNews = async () => {
    let newsData = await fetchNewsData();
    const newsHtml = newsData.map((item, index) => (
        `<div class='news-box'>
            <p class='update'>${index+1}. ${item.update}</p>
            <p class='time'>${moment(item.timestamp).format('DD/MM/YYYY hh:mm a')}</p>
        </div>`
    ));
    document.querySelector('.news-body').innerHTML= newsHtml.join('');
};

const paintTable = async () => {
    rowData = await fetchTableData();
    const formattedRowData = formatTableData(rowData);   
    const gridDiv = document.querySelector('.data-table');
    const gridOptions = {
        columnDefs,
        defaultColDef,
        animateRows:true,
        postSort: postSort(),
        rowClass: 'custom-row-class',
        rowData: formattedRowData,
        onFirstDataRendered,
    };
    new agGrid.Grid(gridDiv, gridOptions);
};

const postSort = rowNodes => {
    console.log(rowNodes);
};
    
document.addEventListener('DOMContentLoaded', async () => {    
    await paintTable();  
    paintNews(); 
    paintDetail();
});