class IndecisionApp extends React.Component{
    constructor(props){
        super(props)
        this.state={
            options: []
        }
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
    handleRemoveAll(){
        this.setState(()=>({options: []}));
    }
    handleAddOption(option) {
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists';
        }
    
        this.setState((prevState) => ({
            options: prevState.options.concat(option)
        }));
    }
    handleAction(){
        let decision=this.state.options[Math.floor(this.state.options.length*Math.random())];
        alert(decision);
    }
    handleDeleteOption(optionToRemove){
        this.setState((preState)=>({
            options: preState.options.filter((option)=> option!==optionToRemove )
        }))
    }

    render(){
        const subtitle="Put your life in the hands of a computer";
        return (
            <div>
                <Header subtitle={subtitle} />
                <Action hasOptions={!!this.state.options.length} handleClick={this.handleAction.bind(this)}/>
                <Options options={this.state.options} handleRemoveAll={this.handleRemoveAll.bind(this)} handleDeleteOption={this.handleDeleteOption.bind(this)} />
                <AddOption handleAddOption={this.handleAddOption.bind(this)} />

            </div>
        )
    }
}

const Header=(props)=>{
    return(
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
        </div>
    );
}
Header.defaultProps={
    title: 'Indecision'
}
const Action=(props)=>{
    return (
        <div>
            <button disabled={!props.hasOptions} onClick={props.handleClick}>What should I do?</button>
        </div>
    );
}

const Options=(props)=>{
    return(
        <div>
            <button onClick={props.handleRemoveAll}>Remove All</button>
            {!props.options.length && <p>Please add something to get started</p>}
            {props.options.map((element)=><Option optionText={element} key={element} handleDeleteOption={props.handleDeleteOption}/>)}
        </div>
    )
}

const Option=(props)=>{
    return (
        <div>
            {props.optionText}
            <button 
            onClick={()=>{
                props.handleDeleteOption(props.optionText)
            }}
            >
                remove
            </button>
        </div>
    )
}

class AddOption extends React.Component{
    constructor(props){
        super(props);
        this.state={error: undefined}
    }
    onFormSubmit(e){
        e.preventDefault();
        const option=e.target.option.value.trim(); 
        const error=this.props.handleAddOption(option); 

        this.setState(()=>({ error }));

        if(!error){
            e.target.option.value='';
        }
    }
    render(){
        return(
            <div>
                <form onSubmit={this.onFormSubmit.bind(this)}>
                    <input type="text" name="option"/>
                    <button>Add Option</button>
                </form>
                <p>{this.state.error}</p>
            </div>
        )
    }
}


ReactDOM.render(<IndecisionApp />, document.getElementById('app'));