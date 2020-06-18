const tableUrl = 'https://api.covid19india.org/v3/min/data.min.json';

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
    width: 125,
    sortable: true,
};

const columnDefs = [
    {headerName: "State/UT", field: "state", width: '200'},
    {headerName: "Confirmed", field: "confirmed", sort:'desc'},
    {headerName: "Active", field: "active"},
    {headerName: "Active %", field: "activePercent"},
    {headerName: "Recovered", field: "recovered"},
    {headerName: "Recovered %", field: "recoveredPercent"},
    {headerName: "Deceased", field: "deceased" },
    {headerName: "Deceased %", field: "deceasedPercent"},
    
];

const fetchTableData = () => {
    return fetch(tableUrl)
    .then(resp => resp.json())
    .then(response => response);
};

const formatTableData = data => {
    let formattedRowData = [];
    for(const [key,{ total = {} } ] of Object.entries(data)){
        const { confirmed=0, recovered=0, deceased=0 } = total
        const active = confirmed-recovered-deceased;
        formattedRowData.push({
            state: STATE_NAMES[key],
            confirmed,
            active,
            recovered,
            deceased,
            activePercent: confirmed === 0 ? 0.00 : Math.round(active* 100 / confirmed),
            recoveredPercent: confirmed === 0? 0.00 : Math.round(recovered * 100 / confirmed),
            deceasedPercent: confirmed === 0 ? 0.00 : Math.round(deceased * 100 / confirmed),
        })
    };
    return formattedRowData;
}

const postSort = rowNodes => {
    console.log(rowNodes);
}
    
document.addEventListener('DOMContentLoaded', async function() {
    let rowData = await fetchTableData();
    let formattedRowData= formatTableData(rowData);   
    const gridDiv = document.querySelector('#myGrid');
    const gridOptions = {
        columnDefs,
        defaultColDef,
        animateRows:true,
        postSort: postSort(),
        rowData: formattedRowData
    };
    new agGrid.Grid(gridDiv, gridOptions);
});