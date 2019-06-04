import React from 'react';
import AddOption from './AddOption.js';
import Options from './Options.js';
import Action from './Action.js';
import Header from './Header.js';
import OptionModal from './OptionModal.js'

export default class IndecisionApp extends React.Component{
    state={
        options: [],
        selectedOption: undefined
    }
    componentDidMount(){
        try{
            const json=localStorage.getItem('options')
            const options=JSON.parse(json);
            if(options){
                this.setState(()=>({ options }))
            }
        }catch(e){
            //do nothing
        }
    }

    componentDidUpdate(prevProps,prevState){
        if(prevState.options.length !== this.state.options.length){
            const json=JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }
    clearDecidedOption=()=>{
        this.setState(()=>({selectedOption: undefined}));
    }
    handleRemoveAll=()=>{
        this.setState(()=>({options: []}));
    }
    handleAddOption=(option)=> {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }
    
        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }));
    }
    handleAction=()=>{
        let decision=this.state.options[Math.floor(this.state.options.length*Math.random())];
        this.setState(()=>({ selectedOption: decision })); 
    }
    handleDeleteOption=(optionToRemove)=>{
        this.setState((preState)=>({
            options: preState.options.filter((option)=> option!==optionToRemove )
        }))
    }

    render(){
        const subtitle="Put your life in the hands of a computer";
        return (
            <div className='body'>
                <Header subtitle={subtitle} />
                <div className='container'>
                    <div >
                        <Action hasOptions={!!this.state.options.length} handleClick={this.handleAction}/>
                        <div className='widget'>
                            <Options options={this.state.options} handleRemoveAll={this.handleRemoveAll} handleDeleteOption={this.handleDeleteOption} />
                            <AddOption handleAddOption={this.handleAddOption} />
                        </div>
                    </div>
                
                </div>
                
                <OptionModal selectedOption={this.state.selectedOption} clearDecidedOption={this.clearDecidedOption} />
            </div>
        )
    }
}