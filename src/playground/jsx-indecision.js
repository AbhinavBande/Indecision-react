class Counter extends React.Component{
    constructor(props){
        super(props);
        this.state={
            counter: 0
        };
    }
    componentDidMount(){
        const json=JSON.parse(localStorage.getItem('count'))
        if(!isNaN(json)){
            this.setState(()=>({counter: json}))
        }
    }
    componentDidUpdate(preProps,preState){
            if(preState.counter!==this.state.counter){
            const count=JSON.stringify(this.state.counter)
            localStorage.setItem('count',count)
        }
    }
    addOne(){
        this.setState((prevState)=>{
            return {
                counter: prevState.counter + 1
            };
        });
    }
    minusOne(){
        this.setState((prevState)=>{
            return {
                counter: prevState.counter - 1
            };
        });
    }
    reset(){
        this.setState(()=>{
            return {
                counter: 0
            };
        });
    }
    render(){
        return(
            <div>
                <h1>Counter: {this.state.counter}</h1>
                <button onClick={this.addOne.bind(this)}>+1</button>
                <button onClick={this.minusOne.bind(this)}>-1</button>
                <button onClick={this.reset.bind(this)}>reset</button>
            </div>
        );
    }
}

const appRoot=document.getElementById('app');
ReactDOM.render(<Counter />,appRoot);


// let count=0;
// const addOne=()=>{
//     count+=1;
//     renderCounterApp();
// }
// const minusOne=()=>{
//     count-=1;
//     renderCounterApp();
// }
// const reset=()=>{
//     count=0;
//     renderCounterApp();
// }
// const template2= (
//     <div>
//         <h1>Count: {count}</h1>
//         <button onClick={addOne}>+1</button>
//         <button onClick={minusOne}>-1</button>
//         <button onClick={reset}>reset</button>
//     </div>
// );

// const appRoot=document.getElementById('app');

// const renderCounterApp=()=>{
//     const template2= (
//         <div>
//             <h1>Count: {count}</h1>
//             <button onClick={addOne}>+1</button>
//             <button onClick={minusOne}>-1</button>
//             <button onClick={reset}>reset</button>
//         </div>
//     );
//     ReactDOM.render(template2, appRoot);
// }

// renderCounterApp();