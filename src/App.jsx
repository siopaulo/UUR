import SplitButton from './SplitButton';
import { useState } from "react";
import BasicModal from "./BasicModal.jsx";
import NestedList from "./NestedList.jsx";
import Box from '@mui/material/Box';
import { useProfile } from "./ProfileContext.jsx";
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import GridSizeControls from './GridSizeControls';
import Typography from "@mui/material/Typography";

function App() {
    const [isOpen, setIsOpen] = useState(false);
    const [gridSize, setGridSize] = useState({ x: 3, y: 3 });
    const profile = useProfile();

    const handleSizeChange = (axis) => (event) => {
        const value = parseInt(event.target.value) || 3;
        setGridSize(prev => ({
            ...prev,
            [axis]: Math.min(Math.max(value, 3), 20)
        }));
    };

    const handleSliderChange = (axis) => (event, newValue) => {
        setGridSize(prev => ({
            ...prev,
            [axis]: newValue
        }));
    };

    return (
        <div style={{
            background: 'linear-gradient(to bottom, #31fabc, white)',
            height: '100%',
            width: '100%',
            overflow: 'hidden'
        }}>
            <Box sx={{position:'absolute', width:"100%",top:"0",left:"0", backgroundColor:"#31fabc"}}>
                <Typography variant="h2" component="h2" sx={{textAlign:'center'}}> Map Editor </Typography>
            </Box>
            <Box sx={{position:'absolute', right:'20px', top:'20px'}}>
                <SplitButton options={['new profile', 'profile','another profile']} onCreateMenu={setIsOpen}/>
            </Box>
            <Box sx={{
                position:'absolute',
                left:'0px',
                borderRadius:'0 20px 20px 0',
                top:'10%',
                backgroundColor:'#5a5a5a',
                width:'20%',
                height:'80%'
            }}>
            </Box>
            <Box sx={{
                position:'absolute',
                right:'0px',
                borderRadius:'20px 0 0 20px',
                top:'10%',
                backgroundColor:'#5a5a5a',
                width:'20%',
                height:'80%'
            }}>
                <GridSizeControls
                    gridSize={gridSize}
                    onSizeChange={handleSizeChange}
                    onSliderChange={handleSliderChange}
                />
            </Box>
            <Box sx={{
                position:'absolute',
                left:'30%',
                top:'10%',
                width:'40%',
                height:"80%",
                backgroundColor:'#6a6a6a',
                borderRadius: '20px',
                paddingLeft: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}>
                <Box sx={{
                    flex: 1,
                    overflow: 'auto',
                    padding: 2
                }}>
                    <Grid container spacing={1} justifyContent={'center'}  height={"100%"} alignItems={'stretch'} direction={'row'} columns={gridSize.x} rows={gridSize.y}>
                        {[...Array(gridSize.y)].map((_, rowIndex) => (
                            [...Array(gridSize.x)].map((_, colIndex) => (
                                <Grid size={1} item key={`${rowIndex}-${colIndex}`}>
                                    <Box
                                        sx={{
                                            height: '100%',
                                            width: '100%',
                                            backgroundColor: 'silver',
                                            borderRadius: '8px',
                                            '&:hover': {
                                                backgroundColor: '#b8b8b8',
                                                cursor: 'pointer'
                                            }
                                        }}
                                    />
                                </Grid>
                            ))
                        ))}
                    </Grid>
                </Box>
            </Box>
            {isOpen && <BasicModal title={profile.name} isOpen={isOpen} setIsOpen={setIsOpen}>
                <NestedList/>
            </BasicModal>}
        </div>
    );
}

export default App;