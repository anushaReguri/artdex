import React,{useState} from 'react';
import { InputText } from 'primereact/inputtext';


function DiffChecker() {
    const [state, setState] = useState({firstVal:'', secondVal:''})

const onChangeInput=(e,key)=>{
    let matched= '';
    let firstValUnMatched='';
    let secondValUnMatched='';
    let secondStr= key==='firstVal'?  state.secondVal: state.firstVal;
    let str=e.target.value;
 for (var i = 0; i < (str.length> secondStr.length? str.length: secondStr.length); i++) {         
    if(secondStr.charAt(i)===str.charAt(i) ) matched+= str.charAt(i);
    else {
       firstValUnMatched+= key==='firstVal'? str.slice(i, str.length) :secondStr.slice(i,secondStr.length);
       secondValUnMatched+= key==='firstVal'? secondStr.slice(i,secondStr.length): str.slice(i, str.length);
       break;
    }   
}

  setState({...state, [key]: str,
     matchedVal:matched,
     firstValUnMatched,
     secondValUnMatched
    })
}    

  return (
    <div>
      <InputText value={state.firstVal} className='m-r-10' onChange={(e) => onChangeInput(e,'firstVal')} />
      <InputText value={state.secondVal} onChange={(e) => onChangeInput(e,'secondVal')} />
      <div>
  <span className='m-r-10'> { state.matchedVal} <span className='apply-color'>{state.firstValUnMatched}</span></span>
  <span className='m-r-10'> { state.matchedVal} <span className='apply-color'>{state.secondValUnMatched}</span></span>
      </div>
    </div>
  )
}

export default DiffChecker
