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

const numberComparator = (num1 , num2 ) => {
    return num1 - num2;
};

const customConfirmedCellRenderer =  ({data}) => {
    return `${data.confirmed} <br/><span class='confirmed'>${data.dconfirmed}</span>`;
};

const customActiveCellRenderer =  ({data}) => {
    return `${data.active} (${data.activePercent}%) <br/><span class='active'><span class=${data.dactive>0?'arrow-up':'arrow-down'}></span>${data.dactive}</span>`;
};

const customRecoveredCellRenderer =  ({data}) => {
    return `${data.recovered} (${data.recoveredPercent}%) <br/><span class='recovered'>${data.drecovered}</span>`;
};

const customDeceasedCellRenderer =  ({data}) => {
    return `${data.deceased} (${data.deceasedPercent}%) <br/><span class='deceased'>${data.ddeceased}</span>`;
};

const columnDefs = [
    { headerName: "State/UT", field: "state", width: '100' },   
    { headerName: "Confirmed", field: "confirmed", sort:'desc', comparator: numberComparator, cellRenderer: customConfirmedCellRenderer },
    { headerName: "Active (%) ", field: "active" , comparator: numberComparator, cellRenderer: customActiveCellRenderer },
    { headerName: "Recovered(%)", field: "recovered", comparator: numberComparator, cellRenderer: customRecoveredCellRenderer },
    { headerName: "Deceased (%)", field: "deceased", comparator: numberComparator, cellRenderer: customDeceasedCellRenderer }
 
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
    for(const [key,{ total = {} , delta = {} }] of Object.entries(data)){
        const { confirmed=0, recovered=0, deceased=0 } = total
        const { confirmed: dconfirmed = 0, 
            recovered:drecovered = 0, 
            deceased: ddeceased = 0, 
            tested: dtested = 0, 
            migrated: dmigrated = 0 } = delta;
        const active = confirmed-recovered-deceased;
        const dactive = dconfirmed-drecovered-ddeceased;
        const activePercent = confirmed === 0 ? 0.00 : Math.round(active* 100 / confirmed);
        const recoveredPercent = confirmed === 0? 0.00 : Math.round(recovered * 100 / confirmed);
        const deceasedPercent =confirmed === 0 ? 0.00 : Math.round(deceased * 100 / confirmed);      
        formattedRowData.push({
            rowId: key,
            state: STATE_NAMES[key],
            confirmed,
            active ,
            activePercent,
            recovered,
            recoveredPercent,
            deceased,
            deceasedPercent,
            dactive,
            dconfirmed,
            drecovered,
            ddeceased,
            dtested
        })
    };
    return formattedRowData;
};

const paintNews = async () => {
    let newsData = await fetchNewsData();
    newsData = newsData.reverse();
    const newsHtml = newsData.map((item, index) => (
        `<div class='news-box'>
            <p class='update'>${index+1}. ${item.update}</p>
            <p class='time'>${moment(item.timestamp*1000).format('DD/MM/YYYY hh:mm a')}</p>
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
        rowHeight : 70,
        postSort,
        onRowClicked,
        rowClass: 'custom-row-class',
        rowData: formattedRowData,
        onFirstDataRendered,
    };
    new agGrid.Grid(gridDiv, gridOptions);
};

const postSort = rowNodes => {
    let nextInsertPos = 0;
    for (let i = 0; i < rowNodes.length; i++) {
        if (rowNodes[i].data.state === 'Total') {
            rowNodes.splice(nextInsertPos, 0, rowNodes.splice(i, 1)[0]);
            nextInsertPos++;
        }
    }
};

const onRowClicked = ({data}) => {
    paintDetail(data.rowId, data.state);
}
    
document.addEventListener('DOMContentLoaded', async () => {    
    await paintTable();  
    paintNews(); 
});