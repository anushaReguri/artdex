import React,{useState} from 'react';
import {data} from './responseData.jsx'
import BarChart from '../components/BarChart.jsx';
import PieChart from '../components/PieChart.jsx';
import DataTable from '../components/DataTable.jsx';
import { Dropdown } from 'primereact/dropdown';

function Home() {
  const [state, setState] = useState({selTurbine:'',...setData(),filteredData:data})

    function groupBy(sortedData=data,key) {
          return sortedData.reduce((acc, obj) => {
            const property = obj[key];
            acc[property] = acc[property] || [];
            acc[property].push(obj);
            return acc;
          }, {});
      }

      const turbinesObj = groupBy(data,'turbine_name');
      let turbines= Object.keys(turbinesObj).map(turbine=> turbine     )   

      const setTurbine=(e)=>{
  setState({...state,...setData(turbinesObj[e.value]),selTurbine:e.value,filteredData:turbinesObj[e.value]})
      }

function setData(sortedData=data){
  const groupBySrType = groupBy(sortedData,"sr_type");
        let costByServiceType= [];
        Object.keys(groupBySrType).forEach(key=>{
        costByServiceType.push({sr_type:key, extended_cost:groupBySrType[key].reduce((prev, next) => prev + next.extended_cost_$, 0),labour_cost:groupBySrType[key].reduce((prev, next) => prev + next.labour_cost_$, 0) })
        })
    
        const cumServiceDate = groupBy(sortedData,"service_date");
        let cumCostByServiceDate= [];
        Object.keys(cumServiceDate).forEach(key=>{
            cumCostByServiceDate.push({service_date:key,extended_cost:cumServiceDate[key].reduce((prev, next) => prev + next.extended_cost_$, 0),labour_cost:cumServiceDate[key].reduce((prev, next) => prev + next.labour_cost_$, 0) })
        })
        const sortedActivities = cumCostByServiceDate.sort((a, b) => new Date(a.service_date) - new Date(b.service_date))
        let extended_cost=0;
        let labour_cost=0;
        sortedActivities.forEach(item=>{
          extended_cost+=item.extended_cost;
          labour_cost+=item.labour_cost;
        item.extended_cost =extended_cost;
        item.labour_cost =labour_cost;
         })
    
         const groupByDesc=groupBy(sortedData,'service_req_description');
         let repairsByCost= [];
         Object.keys(groupByDesc).forEach(key=>{
             repairsByCost.push({service_req_description:key, cost:groupByDesc[key].reduce((prev, next) => prev + next.extended_cost_$+next.labour_cost_$, 0) })
         })
    
         let repairsByTime= [];
         Object.keys(groupByDesc).forEach(key=>{
             repairsByTime.push({service_req_description:key, time:groupByDesc[key].reduce((prev, next) => prev + next.duration_mins, 0) })
         })
return {costByServiceType:costByServiceType,repairsByCost:repairsByCost,repairsByTime:repairsByTime,sortedActivities:sortedActivities}}


      


  return (
    <div className='home'>
<Dropdown value={state.selTurbine} options={turbines}
  placeholder="Select a Turbine" 
  onChange={setTurbine }
  />
      <BarChart options={{
    title: { text: "Cost by Service Type" },
    data: state.costByServiceType,
    series: [
      {
        type: 'column',
        xKey: 'sr_type',
        yKeys: ['extended_cost','labour_cost'],
        yNames: ['Extended Cost','Labour Cost'],
        grouped: true,
      }
    ],
  }} />
  <BarChart options={{
    title: { text: "Cumulative Cost" },
    data: state.sortedActivities,
    series: [
      {
        type: 'column',
        xKey: 'service_date',
        yKeys: ['extended_cost','labour_cost'],
        yNames: ['Extended Cost','Labour Cost'],
        grouped: true,
      }
    ],
  }} />
      <PieChart options={{data:state.repairsByCost.sort((a,b)=> b.cost-a.cost).slice(0,10), series: [
          {
            type: 'pie',
            angleKey: 'cost',
            labelKey: 'service_req_description',
          },
        ],
        title: { text: "Top 10 Repairs By Time" }}}/>
        <PieChart options={{data:state.repairsByTime.sort((a,b)=> b.time-a.time).slice(0,10), series: [
          {
            type: 'pie',
            angleKey: 'time',
            labelKey: 'service_req_description',
          },
        ],
        title: { text: "Top 10 Repairs By Cost" }}}/>
    <DataTable rowData={state.filteredData} />
    </div>
  )
}

export default Home
