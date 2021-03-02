import React from 'react';
import {data} from './responseData.jsx'
import BarChart from '../components/BarChart.jsx';
import PieChart from '../components/PieChart.jsx';
import DataTable from '../components/DataTable.jsx';


function Home() {

    function groupBy(key) {
          return data.reduce((acc, obj) => {
            const property = obj[key];
            acc[property] = acc[property] || [];
            acc[property].push(obj);
            return acc;
          }, {});
      }
      
    const groupBySrType = groupBy("sr_type");
    let costByServiceType= [];
    Object.keys(groupBySrType).forEach(key=>{
    costByServiceType.push({sr_type:key, cost:groupBySrType[key].reduce((prev, next) => prev + next.extended_cost_$+next.labour_cost_$, 0) })
    })

    const cumServiceDate = groupBy("service_date");
    let cumCostByServiceDate= [];
    Object.keys(cumServiceDate).forEach(key=>{
        cumCostByServiceDate.push({service_date:key, cost:cumServiceDate[key].reduce((prev, next) => prev + next.extended_cost_$+next.labour_cost_$, 0) })
    })
    const sortedActivities = cumCostByServiceDate.sort((a, b) => new Date(a.service_date) - new Date(b.service_date))
    let cost=0;
    sortedActivities.forEach(item=>{
    cost+=item.cost;
    item.cost=cost;
     })

     const groupByDesc=groupBy('service_req_description');
     let repairsByCost= [];
     Object.keys(groupByDesc).forEach(key=>{
         repairsByCost.push({service_req_description:key, cost:groupByDesc[key].reduce((prev, next) => prev + next.extended_cost_$+next.labour_cost_$, 0) })
     })

     let repairsByTime= [];
     Object.keys(groupByDesc).forEach(key=>{
         repairsByTime.push({service_req_description:key, time:groupByDesc[key].reduce((prev, next) => prev + next.duration_mins, 0) })
     })

  return (
    <div className='home'>
      <BarChart options={{
    title: { text: "Cost by Service Type" },
    data: costByServiceType,
    series: [
      {
        type: 'column',
        xKey: 'sr_type',
        yKeys: ['cost'],
      },
    ],
  }} />
  <BarChart options={{
    title: { text: "Cumulative Cost" },
    data: sortedActivities,
    series: [
      {
        type: 'column',
        xKey: 'service_date',
        yKeys: ['cost'],
      },
    ],
  }} />
      <PieChart options={{data:repairsByCost.sort((a,b)=> b.cost-a.cost).slice(0,10), series: [
          {
            type: 'pie',
            angleKey: 'cost',
            labelKey: 'service_req_description',
          },
        ],
        title: { text: "Top 10 Repairs By Time" }}}/>
        <PieChart options={{data:repairsByTime.sort((a,b)=> b.time-a.time).slice(0,10), series: [
          {
            type: 'pie',
            angleKey: 'time',
            labelKey: 'service_req_description',
          },
        ],
        title: { text: "Top 10 Repairs By Cost" }}}/>
    <DataTable rowData={data} />
    </div>
  )
}

export default Home
