import React from 'react'
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

function DataTable(props) {
    
  return (
    <div className='table-div'>
        <div
                className="ag-theme-balham"
                style={{ height: '300px' }}
            >
                <h2>Data</h2>
          <AgGridReact
          modules={AllCommunityModules}
          columnTypes={{
            numberColumn: {
              width: 130,
              filter: 'agNumberColumnFilter',
            },
            nonEditableColumn: { editable: false },
            dateColumn: {
              filter: 'agDateColumnFilter',
              filterParams: {
                comparator: function (filterLocalDateAtMidnight, cellValue) {
                  var dateParts = cellValue.split('/');
                  var day = Number(dateParts[0]);
                  var month = Number(dateParts[1]) - 1;
                  var year = Number(dateParts[2]);
                  var cellDate = new Date(year, month, day);
                  if (cellDate < filterLocalDateAtMidnight) {
                    return -1;
                  } else if (cellDate > filterLocalDateAtMidnight) {
                    return 1;
                  } else {
                    return 0;
                  }
                },
              },
            },
          }}
            columnDefs= {[
                {headerName: 'Service Type', field: 'sr_type',sortable:true, filter:true},
                {headerName: 'Wind name', field: 'windfarm_name',sortable:true},
                {headerName: 'Duration', field: 'duration_mins', sortable:true,type:'numberColumn'},
                {headerName: 'Extended Cost', field: 'extended_cost_$',sortable:true, type:'numberColumn'},
                {headerName: 'Labour Cost', field: 'labour_cost_$',sortable:true,type:'numberColumn'},
                {headerName: 'Service Description', field: 'service_req_description',sortable:true},
                {headerName: 'Extended Cost', field: 'extended_cost_$',sortable:true},
                {headerName: 'Turbine Name', field: 'turbine_name',sortable:true},
                {headerName: 'End Date', field: 'end_date',sortable:true, type:'dateColumn'},
            ]}
            rowData={props.rowData}
          >
          </AgGridReact>
    </div>
    </div>
  )
}

export default DataTable
