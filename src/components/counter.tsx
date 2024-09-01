import Button from '@mui/joy/Button';
import { useAppDispatch, useAppSelector } from '../reduxHooks';
import { RootState } from '../state/store';
import {increment, decrement, incrementByAmount } from '../state/counter/counterSlice';


const Counter =()=>{
    const count = useAppSelector(state => state.counter.value)
    const dispatch = useAppDispatch()
    return(
        <div>
            <h2>{count}</h2>
            <div>
                <Button onClick={()=> dispatch(incrementByAmount(10))}>increment</Button>
                <Button onClick={()=> dispatch(decrement())}>decrement</Button>
            </div>
        </div>
    )
}

export default Counter