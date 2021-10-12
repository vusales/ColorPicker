import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon  from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import {TextField} from '@material-ui/core/';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
// import ColorPicker from "./components/ColorPicker";   classbased component same with CP.js
import CP from "./components/CP";
import Alert from '@mui/material/Alert';
import {Link} from "react-router-dom" ; 


const drawerWidth = 340;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  saveDiv: {
    display:"flex" , 
    alignSelf:"flex-end" , 
    alignItems:"center" , 
    marginLeft: "auto" , 
    marginBottom: 10, 
  },
 
}));

  function App() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false); 
    const [colors, setColor] = React.useState(JSON.parse(localStorage.getItem("colors")) || []);
    const [cubnames, setName] = React.useState(JSON.parse(localStorage.getItem("cubnames")) || []);
    const [randomVal, setRandomVal] = React.useState(false); 
    const[saveInp , setSaveInp]= React.useState("");
    const[pallets , setPallets]= React.useState(JSON.parse(window.localStorage.getItem("pallets")) || []);

    React.useEffect(()=>{ 
      window.localStorage.setItem("colors" , JSON.stringify(colors));
      window.localStorage.setItem("cubnames" , JSON.stringify(cubnames));
      window.localStorage.setItem("pallets", JSON.stringify(pallets));
    }, [colors] , [pallets]); 

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };

    const addColorDiv = (color , cubname ) => {
      for(let i of colors){
          if(i=== color){
            return ; 
          }
      }

      setColor(colors.concat(color));
      setName(cubnames.concat(cubname));
      window.localStorage.setItem("colors" , JSON.stringify(colors));
      window.localStorage.setItem("cubnames" , JSON.stringify(cubnames));
    }

    const ClearePal = () => {
      setColor([]);
      setName([]);
      window.localStorage.removeItem("colors");
      window.localStorage.removeItem("cubnames");

    }

    const generateColor=()=>{
      if(randomVal){
        setColor(colors.splice(-28, 28));
        window.localStorage.setItem("colors" , JSON.stringify(colors));
        setRandomVal(false) ; 
      }
      var ColorArr = []; 
      for(let i=0 ; i<28 ; i++){
        var newColor = '#' +  Math.random().toString(16).substr(-6);
        ColorArr.push(newColor); 
      }
      setRandomVal(true) ;
      setColor(colors.concat(ColorArr));
      window.localStorage.setItem("colors" , JSON.stringify(colors));
    }


    const savePallete = (e)=> {
      var value = e.target.value ; 
      setSaveInp(value) ; 

    }

    const savePalleteButtonClick = ()=> {
      var colorsArray = JSON.parse(window.localStorage.getItem("colors"));
      var cubNamesArray =  JSON.parse(window.localStorage.getItem("cubnames"));
      var palleteName = saveInp ; 
      if(saveInp.trim() === ""){
        alert("Please, add pallete name!")
        return;
      }
      var pallete = {
        colorsArray , 
        cubNamesArray , 
        palleteName
      }
      var PalletsArray = pallets ;
      var result = PalletsArray.concat(pallete); 
      setPallets(result);

      window.localStorage.setItem("pallets", JSON.stringify(pallets));
      window.localStorage.removeItem("colors");
      window.localStorage.removeItem("cubnames");
      setColor([]); 
      setName([]);
      setSaveInp(""); 
    }

    var deleteCubes = (e) => {
      if(e.target.value === null ){
       return
      }
      var colorArr = colors; 
      var result = colorArr.filter((element)=> element !== e.target.value);
      setColor(result); 
    }

    var CopyColor = (e) => {
      navigator.clipboard.writeText(e.target.value).then(function(){
        // alert('Copying to clipboard was successful!');
       return(
        <Alert variant="outlined" severity="success">
          Color code has been copied!
        </Alert>); 

      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
    }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap display="flex">
            Color Picker
          </Typography>
          <div 
          className={classes.saveDiv}
          >
            <TextField 
              variant="outlined" 
              label="Enter a pallete name"
              size="small"
              value={saveInp}
              onChange={savePallete}
            />
            <Button 
              onClick={savePalleteButtonClick} 
              variant = "contained"
              color = "secondary" 
              size= "small"
              style={{marginLeft:10,padding:7.5}}
            >Save Pallete</Button>

            <Link to="/allPallets"> <Button 
              // onClick={savePalleteButtonClick} 
              variant = "contained"
              color = "primary" 
              size= "small"
              style={{marginLeft:10,padding:7.5}}
            >All Palletes</Button></Link>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
       
        <div 
        style={{
          "display":"flex" , 
          "alignItems":"center" , 
          "justifyContent":"center" , 
          "flexDirection":"column",
          "padding":10 , 
        }}>

          <h1>Design your Pallete</h1>

          <div style={{"padding":"5px 15px 15px"}}>
              <Button 
              variant = "contained"
              color = "secondary" 
              size= "small"
              onClick={ClearePal}
              >
              Clear Pallete 
              </Button>
              <Button
              variant="contained" 
              color="primary"
              size= "small"
              style={{"marginLeft":5}}
              onClick={generateColor}
              >
              Random Color
              </Button>
          </div>

          {/* <ColorPicker onclick={addColorDiv} />  */}
          <CP  onclick={addColorDiv} />
        </div>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
        style={{"paddingLeft":35}}
      >
            <div className={classes.drawerHeader} />
           <div
           style={{
             "display":"flex" ,
             "flexWrap": "wrap",
             "alignSelf": "center", 
           }}
           >
           {colors[0]? 
            colors.map( (color , index)=>{
              return(
                <div 
                  key={`${index}`} 
                  style={{"backgroundColor":`${color}` , 
                      "width":160 , 
                      "height":150 , 
                      "padding":10 , 
                      "fontSize":18 , 
                      "fontWeight":"bold" ,
                      display:"flex" , 
                      alignItems:"flex-start" , 
                      justifyContent:"space-between" , 
                  }}
                >
                  <div
                   style={{
                   "width":75, 
                   "height":133, 
                   display:"flex" , 
                   flexDirection:"column" , 
                   alignItems:"flex-start" , 
                   justifyContent:"space-between" , 
                  }}
                  >
                        <div >{color}</div>

                        <button
                        onClick={deleteCubes}
                        value={color}
                        style={{
                          fontSize:13,
                          backgroundColor:"transparent" , 
                          border:".1px solid black" , 
                          outline:"none",
                          borderRadius:3,
                          width:65,
                          height:33, 
                          cursor:"pointer",
                        }}
                        >
                        ⛌ 
                        </button>

                  </div>
                  <div
                   style={{
                   "width":75, 
                   "height":133, 
                   display:"flex" , 
                   flexDirection:"column" , 
                   alignItems:"flex-end" , 
                   justifyContent:"flex-end" , 
                  }}
                  >
                        <button
                        onClick={CopyColor}
                        value={color}
                        variant="outlined"
                        size="small"
                        style={{
                          fontSize:13,
                          backgroundColor:"transparent" , 
                          border:".1px solid black" , 
                          outline:"none",
                          borderRadius:3,
                          width:65,
                          height:33,
                          cursor:"pointer",
                        }}
                        >
                        copy
                        </button>
                  </div>
                </div>
              );
           }):
           <div  
              style={{
                "padding":10 , 
                "fontSize":25 , 
                "fontWeight":"bold" , 
                "color":"lightgray",
                "textAlign":"center",
              }}
            >Select Color</div>
          }
        </div>
      </main>
    </div>
  );
}

export default App;
