import React  from "react";
import { makeStyles} from '@material-ui/core';
import {Input , Button , Container , Box  }  from '@material-ui/core/';
const useStyles = makeStyles({
    container: {
        width:"100%" , 
        display:"flex", 
        alignItems:"center", 
        justifyContent:"flex-start", 

    } , 
    outerContainer:{
        border:"1px solid #180773",
        padding:10 , 
        textAlign:"center" , 
        verticalAlign:"middle",
        "min-height":195,
        display:"flex" , 
        alignItems:"center", 
        justifyContent:"space-between" ,
        flexDirection:"column" , 
        marginRight:"3%",
    }, 
    smallContainer: {
        width:140,  
        display:"flex" , 
        flexWrap:"wrap" ,
        height:100, 
        border:"1px solid #180773",
        padding:5, 
        "overflow-y":"scroll" , 

    }, 
    btnContainer:{
        width:"100%" , 
        display:"flex", 
        alignItems:"center", 
        justifyContent:"flex-end", 
        "& button":{
            border:"none", 
            outline:"none" , 
            backgroundColor:"darkred",
            color:"#fff", 
            fontSize:13, 
            fontWeight:"bold", 
            padding:5,
            

       }
    }, 
    infoP:{
        color: "gray" , 
        fontWeight:"bold" , 
    }

}) ;

export default function Allpallets (props) {
    const styles = useStyles(props);
    const [allPallets , setAllPallets] = React.useState(JSON.parse(window.localStorage.getItem("pallets")) || []); 

    React.useEffect(()=>{
        window.localStorage.setItem("pallets" , JSON.stringify(allPallets));
    } , [allPallets]);

    const deletePallete = (e)=>{
        console.log("works");
        var arr = allPallets ; 
        for(let i in arr){
            if(i === e.target.value){
                arr.splice(i , 1);  
            }
        }
        setAllPallets(arr);
        window.localStorage.setItem("pallets" , JSON.stringify(allPallets));
    }

    return(
        <React.Fragment>
            <Container>

                {
                    allPallets[0]? 
                    <Box  sx={{ 
                        display: 'flex', 
                        alignItems:"center" , 
                        justifyContent:"space-around" , 
                        flexWrap:"wrap",
                        padding:20 ,  
                        width:"70%",
                        margin:"0 auto" ,
                        flexDirection:"column",
                    }}
                    >
                        <h1>All Color Palletes</h1>
                        <div className={styles.container}>
                            {allPallets.map((pallete , index)=>{
                            return(
                                <div className={styles.outerContainer}  key={`pallete${index}`}>
    
                                        <div className={styles.smallContainer} >
    
                                            {pallete.colorsArray.map(((color, index)=> <div 
                                            style={{backgroundColor: color , 
                                                height:20 , 
                                                width:20,
                                                display:"flex" , 
                                            }} 
                                            key={`palleteColor${index}`}></div>))}
    
                                        </div>
    
                                    <h2>{pallete.palleteName}</h2> 
                                    <div className={styles.btnContainer} >
                                        <button 
                                        value={index}
                                        onClick={deletePallete}
                                         >⛌</button>
                                    </div>
    
    
                                </div>
                            );
                            })} 
                        </div>
                    </Box>
                    :<Box  sx={{ 
                        display: 'flex', 
                        alignItems:"center" , 
                        justifyContent:"space-around" , 
                        flexWrap:"wrap",
                        padding:20 ,  
                        width:"70%",
                        margin:"0 auto" ,
                        flexDirection:"column",
                    }}
                    >
                        <h1>All Color Palletes</h1>
                        <p className={styles.infoP}>There is no saved color pallete</p>
                        
                    </Box>
                }
                


            </Container>
        </React.Fragment>
    );
}
