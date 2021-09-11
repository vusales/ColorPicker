import React from "react";
import { SketchPicker } from 'react-color';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';


function CP (props) {
    const [background , setBackground]= React.useState("#E01060") ; 
    const [error , setError]= React.useState(false) ; 
    const [cubName , setCubName]= React.useState("") ;
    const inpVal = React.useRef();
    
    const saveColor = () => {
        var color =  background; 
        var cubname = cubName; 
        return props.onclick(color , cubname);
    }

    const handleChangeComplete = (color) => {
        setBackground(color.hex) ; 
        setCubName(inpVal.current.value);
        inpVal.current.value = "" ; 
    };


    return(
        <React.Fragment>
            <SketchPicker   
            color={background}
            onChangeComplete={handleChangeComplete} 
            style={{ "margin":10 , }}
            />
            <Input  
            error={error} 
            inputRef={inpVal} 
            style={{
                "margin":10 , 
                "width":"90%" }}/>
            <Button 
                onClick={saveColor}  
                style={{
                    "background-color": background ,
                    "margin":10 , 
                    "width":"90%" ,
                    "padding":7 , 
                    "color": "white",
                    "font-weight": "bold" , 
                    "font-size": 15
            }}>ADD COLOR</Button>
        </React.Fragment>
    )
}


export default CP ;