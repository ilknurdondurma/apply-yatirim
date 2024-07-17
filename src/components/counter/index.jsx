import React from 'react'
import {useDispatch , useSelector} from 'react-redux';
import Actions from '../../redux/actions/rootAction';
import { increment , decrement, carp } from '../../redux/actions/counterActions';
import { dark, light } from '../../redux/actions/themeActions';

function Counter() {
  const count=useSelector(state=>state.counter.count)
  const sayi=useSelector(state=>state.counter.sayi)
  const theme=useSelector(state=>state.theme.theme)


  const dispatch=useDispatch();
  return (
    <div style={theme} className='grid grid-cols-1 h-screen'>
      <button onClick={() => dispatch(Actions.counterActions.increment(2))} >ARTTIR</button>
      <button onClick={() => dispatch(decrement())}>AZALT</button>
      <button onClick={() => dispatch(carp())}>CARP</button>
      <button onClick={() => dispatch(dark({backgroundColor:"violet"}))}>dark</button>
      <button onClick={() => dispatch(light())}>light</button>
      <p >{count}</p>
      <p>{sayi}</p>
    </div>
  )
}

export default Counter

