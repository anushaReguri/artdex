import React from 'react'
import { AgChartsReact } from 'ag-charts-react';


function PieChart(props) {
  return (
    <div>
      <AgChartsReact options={props.options} />
    </div>
  )
}

export default PieChart
