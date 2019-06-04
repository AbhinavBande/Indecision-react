import React from 'react';
import Option from './Option.js';


const Options=(props)=>(
    <div>
        <div className='widget-header'>
            <h3 className='widget-header__title'>Your Options</h3>
            <button className='button button--link' onClick={props.handleRemoveAll}>Remove All</button>
        </div>
        {!props.options.length && <p className='widget-message'>Please add something to get started</p>}
        {props.options.map((element,index)=><Option optionText={element} key={element} handleDeleteOption={props.handleDeleteOption} count={index+1}/>)}
    </div>
);

export default Options;