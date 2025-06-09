import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import StartIcon from '@mui/icons-material/Start';
import * as PropTypes from "prop-types";
import {useRef,useState} from "react";
import { useProfile } from './ProfileContext';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import {ListItem, TextField} from "@mui/material";
import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import WindowTwoToneIcon from '@mui/icons-material/WindowTwoTone';
import styles from './CategoriesColor.module.css';
import DownloadFile from "./DownloadFile.jsx";
import AddIcon from '@mui/icons-material/Add';
import {rgba} from "framer-motion";
import Button from "@mui/material/Button";





function ExpandableItem(props) {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState(props.options||[]);
    const [name, setName] = useState('');
    const [char, setChar] = useState('');

    const handleClick = () => {
        setOpen(!open);
    };

    const handleCharChange = (e) => {
        if(e.target.value.length<2){
            setChar(e.target.value);
        }

    }

    const handleAdd = () => {
        const newOption = {icon: "default", name: name, character: char};
        setOptions([...options, newOption]);
        props.setProfile(prev => {
            const updated = { ...prev };
            const opts = updated.categories[props.Category].options || [];
            updated.categories[props.Category].options = [...opts, newOption];
            return updated;
        });
        setName('');
        setChar('');
    }

    // Get color from CSS module or fallback to provided Color prop
    const color = props.Color;


    return <>
        <ListItem onClick={handleClick} className={styles.expandable} style={{
            backgroundColor: color,
            borderRadius: open ? '10px 10px 0 0' : 10,
            boxShadow: '0px 0px 33px rgba(0,0,0,0.75)',
            marginBottom: open ? 0 : '10px'
        }}>
            <img src={props.Icon==='default'?'../DefaultImg/'+props.Category+'.png':props.Icon} style={{width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px',  }} alt={props.Category} />
            <ListItemText primary={props.Category || "Default"}/>
            {open ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>
        <Collapse in={open} timeout='auto' unmountOnExit>
            <List component="div" disablePadding style={{
                backgroundColor: "rgba(122,122,122,0.5)",
                boxShadow: '0px 10px 33px rgba(0,0,0,0.75)',
                marginBottom: '10px',
                borderRadius: '0 0 10px 10px',
            }}>
                {Object.entries(options).map(([key, value]) => (

                    <ListItem sx={{pl: 4}}>
                        <ListItemIcon>
                            <StarBorder/>
                        </ListItemIcon>
                        <TextField id="outlined-disabled" label="Name" defaultValue={value.name} slotProps={{input: {readOnly:true,},}}/>
                        <TextField id="outlined-disabled" label="Character" defaultValue={value.character} slotProps={{input: {readOnly:true,},}} />

                    </ListItem>
                ))}
                <ListItem sx={{pl: 4}}>
                    <ListItemIcon>
                        <AddIcon/>
                    </ListItemIcon>
                    <TextField id="outlined-helperText" label="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                    <TextField id="outlined-helperText" label="Character" value={char} onChange={handleCharChange}/>
                    <Button style={{marginLeft:"10px"}} variant="contained" color="success" onClick={handleAdd} disabled={name.length === 0 && char.length!==1}>Add</Button>
                </ListItem>

            </List>
        </Collapse>

    </>;
}

ExpandableItem.propTypes = {
    onClick: PropTypes.func,
    open: PropTypes.bool,
    Category: PropTypes.string,
    Color: PropTypes.string,
    Icon: PropTypes.string,
    setProfile: PropTypes.func
};

function SimpleItem(props) {
    const inputFile = useRef(null);

    const onButtonClick = () => {
        inputFile.current.click();
    };

    const color = props.Color;
    return <ListItem className={styles.simple} style={{
        backgroundColor: color,
        borderRadius: 10,
        boxShadow: '0px 0px 33px rgba(0,0,0,0.75)',
        marginBottom: '10px'
    }}>
        <img src={props.Icon==='default'?'../DefaultImg/'+props.Category+'.png':props.Icon} style={{width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} alt={props.Category} />

        <button onClick={onButtonClick}><FileUploadIcon/></button>

        <ListItemText style={{textAlign:"center"}} primary={props.Category}/>
        <ListItemText style={{textAlign:"right", marginRight:"30px"}} primary={props.Character}/>
    </ListItem>;
}

SimpleItem.propTypes = {
    Category: PropTypes.string,
    Color: PropTypes.string,
    Icon: PropTypes.string
};


export default function NestedList() {
    const { profile, setProfile } = useProfile();
    return (
        <List
            sx={{width: '100%', bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"

        >
            {Object.entries(profile.categories).map(([key, value]) => (
                value.expandable?
                    <ExpandableItem Category={key} Color={styles.expandable.color} Icon={value.icon} options={value.options||[]} setProfile={setProfile} />:
                    <SimpleItem Category={key} Color={styles.simple.color} Icon={value.icon} Character={value.character}/>
            ))}

        </List>
    );
}


