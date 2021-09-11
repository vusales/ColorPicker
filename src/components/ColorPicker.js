// class version of CP component
import React from "react"; 
import { SketchPicker } from 'react-color';
import Input from '@material-ui/core/Input';

class ColorPicker extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            background: "#E01060",
            error: false ,
            cubName: "" , 
        }
        this.saveColor=this.saveColor.bind(this);
        this.handleChangeComplete=this.handleChangeComplete.bind(this);

        this.inpVal = React.createRef(); 
    }
    saveColor(){
      
        console.log("cubname" , this.state.cubName) ; 
        
        var color =  this.state.background ; 
        var cubname = this.state.cubName; 
        return this.props.onclick(color , cubname);
    }
    handleChangeComplete = (color) => {
        this.setState({ 
            background: color.hex , 
            cubName: this.inpVal.current.value , 
         });

         this.inpVal.current.value = "" ; 
      };

    render(){
        return(
            <React.Fragment>
                <SketchPicker   
                color={ this.state.background }
                onChangeComplete={ this.handleChangeComplete } 
                style={{ "margin":10 }}
                />
                <Input  
                error={this.state.error} 
                inputRef={this.inpVal} 
                style={{
                    "margin":10 , 
                    "width":"90%" }}/>
                <button 
                onClick={this.saveColor}  
                style={{
                    "background-color":this.state.background ,
                    "margin":10 , 
                    "width":"90%" 
                }}>ADD</button>
            </React.Fragment>
        )
    }
}

export default ColorPicker;