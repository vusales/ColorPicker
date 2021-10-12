import React from "react";
import {useParams} from "react-router-dom"; 
import { Container, Box } from "@material-ui/core";
 
export default function SinglePallete(params){
    const {value} = useParams(); 
    const [allPallets , setAllPallets] = React.useState(JSON.parse(window.localStorage.getItem("pallets")) || []); 

    { 
        // console.log("value" , value); 
        // console.log("allpa" , allPallets ); 

    }

    var CopyColor = (e) => {
        navigator.clipboard.writeText(e.target.innerText).then(function(){
            alert('Copying to clipboard was successful!');
        }, function(err) {
          console.error('Async: Could not copy text: ', err);
        });
      }


    return(
        <React.Fragment>
                <Box
                sx={{ p: 2,  width: "95%", margin:"0 auto"}}
                >
                        {allPallets.map((pallete, index)=>{
                            // console.log( "value index" , value , index); 
                           
                                return (
                                    index==value?
                                    <div key={`big${index}`}>
                                        {pallete.colorsArray.map((color,index)=>{ 
                                            return(<div
                                                style={{
                                                    backgroundColor:color ,
                                                    width: "100%", 
                                                    height:100 , 
                                                    padding:10 , 
                                                    fontSize:25 ,
                                                    fontWeight:"bold", 
                                                }}
                                                key={`singlepallte${index}`}
                                                onClick={CopyColor}
                                                >{color}</div>)
                                        })}
                                    </div>
                                    : console.log(index)
                                )
                        
                        })}
            
                </Box>
        </React.Fragment>
    )
}