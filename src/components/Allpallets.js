import React  from "react";
import { makeStyles} from '@material-ui/core';
import { Container , Box  }  from '@material-ui/core/';
import {  NavLink } from "react-router-dom";
const useStyles = makeStyles({
    container: {
        width:"100%" , 
        display:"flex", 
        alignItems:"center", 
        justifyContent:"center", 
        flexWrap:"wrap",
    } , 
    outerContainer:{
        border:"2px solid #180773",
        padding:10, 
        textAlign:"center" , 
        height:"250px",
        width:"190px",
        display:"flex" , 
        alignItems:"center", 
        justifyContent:"center" ,
        flexDirection:"column" , 
        margin:"1%", 
        "& h3":{
            wordBreak:"break-word",
        }
    }, 
    smallContainer: {
        // width:"90%",  
        display:"flex" , 
        flexWrap:"wrap" ,
        height:140, 
        // border:"1.5px solid #180773",
        // padding:5, 
        "overflow-y":"scroll" ,   
    }, 
    btnContainer:{
        width:"100%" , 
        display:"flex", 
        alignItems:"center", 
        justifyContent:"space-between", 
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
    }, 
    moreP: {
        color: "black", 
        fontSize: 30, 
        textDecoration:"none",
        paddingBottom:14, 
    }

});

export default function Allpallets (props) {
    const styles = useStyles(props);
    const [allPallets , setAllPallets] = React.useState(JSON.parse(window.localStorage.getItem("pallets")) || []); 

    React.useEffect(()=>{
        var val = JSON.parse(window.localStorage.getItem("pallets"))
        setAllPallets(val); 
    }, [allPallets]);

    const deletePallete = (e)=>{
        console.log("works");
        var arr = allPallets ; 
        for(let i in arr){
            if(i === e.target.value){
                arr.splice(i , 1);  
            }
        }
        setAllPallets(arr);
        window.localStorage.setItem("pallets", JSON.stringify(arr));
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
    
                                    <h3>{pallete.palleteName}</h3> 
                                    <div className={styles.btnContainer} >
                                        <NavLink className={styles.moreP} to={`/Pallets/${index}`}>⢰</NavLink>
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
