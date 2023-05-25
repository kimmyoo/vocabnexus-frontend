import React from 'react'
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useState } from 'react';


const SatNexus = ({ nexus }) => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const content = (
        <div className="node-nexus">
            <div>
                <div
                    aria-describedby={id}
                    className="satelliteNexus"
                    variant="contained"
                    onClick={handleClick}
                >
                    {nexus?.nexusType}
                    {nexus?.explanation && "📃"}
                </div>
                {
                    nexus?.explanation &&
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Typography sx={{ p: 2 }}>{nexus?.explanation}</Typography>
                    </Popover>
                }
            </div>
        </div>
    )
    return (
        content
    )
}

export default SatNexus