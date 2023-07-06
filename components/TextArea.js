"use client"
import React, {useRef} from 'react'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import { setProductPrice } from '@/redux/productSlice';
import { useDispatch } from 'react-redux';

const TextArea = ({id, price, getTrueValue, category}) => {
    const dispatch = useDispatch();
    const inputRef = useRef();
    const changeFocus = () => {
        inputRef.current.disabled = false;
        inputRef.current.focus();
      };
      const update = () => {
        dispatch(setProductPrice({id:id, category:category, newPrice:Number(inputRef.current.value)}))
          inputRef.current.disabled = true;
      };
    const handleReset = () => {
        const val = getTrueValue(id, category);
        inputRef.current.value = val;
        dispatch(setProductPrice({id:id, category:category, newPrice:val}))
    }
  return (
    <div>
        <textarea className='bg-transparent' rows={1} cols={8} ref={inputRef} disabled={inputRef} defaultValue={price}/>
        <div className='flex flex-row-reverse gap-1 mt-1'>
        <SaveIcon onClick={update} style={{color:"green", fontSize:"25px"}}/>
            <RestartAltIcon onClick={handleReset} style={{color:"red", fontSize:"25px"}}/>
            <EditIcon onClick={() => changeFocus()} style={{color:"blue", fontSize:"25px"}}/>
        </div>
    </div>
  )
}

export default TextArea