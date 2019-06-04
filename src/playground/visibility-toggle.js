class VisiTog extends React.Component{
    constructor(props){
        super(props);
        this.state={visibility: false};
    }
    toggleVisibility(){
        this.setState((prevState)=>{
            return {visibility: !prevState.visibility}
        });
    }
    render(){
        return(
            <div>
                <h1>Visibility Toggle</h1>
                <button onClick={this.toggleVisibility.bind(this)}>{this.state.visibility ? 'Hide Details' : 'Show Details'}</button>
                <p>{this.state.visibility && 'Details'}</p>
            </div>
        );    
    }
}

ReactDOM.render(<VisiTog/> ,document.getElementById('app'));

// const appRoot=document.getElementById('app');
// let isVisible=false;

// const toggle=()=>{
//     isVisible=!isVisible;
//     render();
// }


// const render=()=>{
//     const template=(
//         <div id="main">
//             <h1>Visibility Toggle</h1>
//             <button onClick={toggle}>{isVisible ? 'Show Details':'Hide Details'}</button>
//             {isVisible && <p>Details</p>}
//         </div>
//     )
//     ReactDOM.render(template,appRoot);
// }

// render();