import React, { useContext, useState } from "react";
import { ColorModeContext } from "../../theme";
import { Box, Container, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { DarkModeOutlined, ExpandMore, Facebook, Instagram, LightModeOutlined, Twitter } from "@mui/icons-material";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


const options = [
    'AR',
    'EN',

];


function Top() {
    const colorMode = useContext(ColorModeContext);
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(1);
    const open = Boolean(anchorEl);
    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box sx={{
            bgcolor: "#2B3445",
            py:"4px",
            borderBottomLeftRadius:4,
            borderBottomRightRadius:4,
        }}>
           <Container>
            <Stack direction={"row"} alignItems={"center"}>


                <Typography
                    sx={{
                        mr: 2,
                        p: "3px 10px",
                        bgcolor: "#D23F57",
                        borderRadius: "12px",
                        fontSize: "10px",
                        fontWeight: "bold",
                        color: "#fff",
                    }}
                    veriant="body2"
                >
                    HOT
                </Typography>

                <Typography
                    sx={{
                        fontSize: "12px",
                        fontWeight: 300,
                        color: "#fff",
                    }}
                    veriant="body2"
                >
                    Free Express Shipping
                </Typography>


                <Box flexGrow={1} />



                <div>
                    {theme.palette.mode === "light" ? (
                        <IconButton
                            onClick={() => {
                                localStorage.setItem(
                                    "mode",
                                    theme.palette.mode === "dark" ? "light" : "dark"
                                );
                                colorMode.toggleColorMode();
                            }}
                            color="inherit"
                        >
                            <LightModeOutlined
                                sx={{ color: "#fff" }}
                            />
                        </IconButton>
                    ) : (
                        <IconButton
                            onClick={() => {
                                localStorage.setItem(
                                    "mode",
                                    theme.palette.mode === "dark" ? "light" : "dark"
                                );
                                colorMode.toggleColorMode();
                            }}
                            color="inherit"
                        >
                            <DarkModeOutlined />
                        </IconButton>
                    )}
                </div>







                <List
                    component="nav"
                    aria-label="Device settings"
                    sx={{ p: 0, m: 0 }}
                >
                    <ListItemButton
                        sx={{ '&:hover': { bgcolor: '#2B3445' }, px: 1 }}
                        id="lock-button"
                        aria-haspopup="listbox"
                        aria-controls="lock-menu"
                        aria-label="when device is locked"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClickListItem}
                    >
                        <ListItemText
                            sx={{ ".MuiTypography-root": { fontSize: "14px", color: "#fff" } }}
                            secondary={options[selectedIndex]}
                        />
                        <ExpandMore sx={{ fontSize: "18px", color: "#fff" }} />
                    </ListItemButton>
                </List>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'lock-button',
                        role: 'listbox',
                    }}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            sx={{ fontSize: "14px", p: "3px 10px", minHeight: "10px" }}
                            selected={index === selectedIndex}
                            onClick={(event) => handleMenuItemClick(event, index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>



                <Twitter
                    sx={{
                        fontSize: "20px",
                        color: "#fff",
                    }}
                />
                <Facebook
                    sx={{
                        fontSize: "20px",
                        mx: 1,
                        color: "#fff",
                    }}
                />
                <Instagram
                    sx={{
                        fontSize: "20px",
                        color: "#fff",
                    }}
                />

            </Stack>
           </Container>
        </Box>
    )
}

export default Top;