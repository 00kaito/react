import React, {Component} from "react";
import Countdown from "./Countdown";
import EditEvent from "./EditEvent";
import "./App.css";
import uniqid from "uniqid";

class App extends Component{
constructor(){
    super();
    this.state = {
        events: [
            {id: 0, name: "śniadanie", hour: "07", minute: "00"},
            {id: 1, name: "drugie śniadanie", hour: "11", minute: "00"}
        ],
        editedEvent:{
            id: uniqid(),
            name: "",
            hour: "",
            minute: ""
        }
    };
    
    this.handleEditEvent = this.handleEditEvent.bind(this);
    this.handleSaveEvent = this.handleSaveEvent.bind(this);
    this.handleRemoveEvent = this.handleRemoveEvent.bind(this);
    this.handleEditInit = this.handleEditInit.bind(this);
    };

    handleEditEvent(val){
        // this.setState({ editedEvent: val });
        this.setState(prevState =>{
            return{
                editedEvent: Object.assign(prevState.editedEvent, val)
            }
        })
        }

    handleSaveEvent(){
        // this.setState(prevState =>{
        //     return{
        //         events: [...prevState.events, prevState.editedEvent],
        //         editedEvent:{
        //             id: uniqid(),
        //             name: "",
        //             hour: "",
        //             minute: ""
        //         }
        //     }
        // })

        this.setState(prevState =>{
            const editedEventExists = prevState.events.find(
                el => el.id === prevState.editedEvent.id
                );

                let updatedEvents;
                if(editedEventExists){
                    updatedEvents = prevState.events.map(el => {
                        if (el.id === prevState.editedEvent.id) return prevState.editedEvent;
                        else return el;
                    });
                }
                else{
                    updatedEvents = [...prevState.events, prevState.editedEvent];
                }

                return{
                    events: updatedEvents,
                    editedEvent:{
                        id: uniqid(),
                        name: "",
                        hour: "",
                        minute: ""
                        }
                }
        })
    }

    handleRemoveEvent(id){
        this.setState(prevState =>({
            events: prevState.events.filter(el => el.id !==id)
        }))
    }

    handleEditInit(id){
        this.setState(prevState =>({
            //editedEvent: { ...prevState.events[id] } //spread w celu utworzenia nowego obiektu, a nie rerefencji
            editedEvent: { ...prevState.events.find(el => el.id === id)}

        }))
    }


        render(){
        const events = this.state.events.map(el => {
            return <Countdown 
            key={el.id}
            id={el.id} 
            name={el.name} 
            hour={el.hour} 
            minute={el.minute} 
            onRemove={id => this.handleRemoveEvent(id)} 
            onEditInit={id => this.handleEditInit(id)} />
        });
        return(
            <div className="app">
                {events}
                <EditEvent 
                name={this.state.editedEvent.name}
                hour={this.state.editedEvent.hour}
                minute={this.state.editedEvent.minute}
                onInputChange={val => this.handleEditEvent(val)} 
                onSave={() => this.handleSaveEvent()} />
            </div>
        );
    }
}

export default App;