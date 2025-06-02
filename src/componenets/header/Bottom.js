import { Close, ElectricBikeOutlined, KeyboardArrowRightOutlined, LaptopChromebookOutlined, MenuBookOutlined, MenuSharp, SportsEsportsOutlined, Window } from "@mui/icons-material";
import { Container, Button, Menu, MenuItem, Typography, Box, useTheme, IconButton, ListItemIcon, ListItemText, Drawer, useMediaQuery, Stack } from "@mui/material";
import { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Links from "./Links";



function Bottom() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const theme = useTheme()
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === 'keydown' &&
            ((event).key === 'Tab' ||
                (event).key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    return (
        <Container sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
            <Box>
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    sx={{ width: 222, bgcolor: theme.palette.myColor.main, color: theme.palette.text.secondary, height: 40 }}
                >
                    <Window />
                    <Typography
                        sx={{
                            padding: "0",
                            textTransform: "capitalize",
                            m: 1
                        }}
                    >
                        Categories
                    </Typography>
                    <Box flexGrow={1} />
                    <KeyboardArrowRightOutlined />
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    sx={{ ".MuiPaper-root": { width: 222, bgcolor: theme.palette.myColor.main } }}

                >
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <ElectricBikeOutlined />
                        </ListItemIcon>
                        <ListItemText>Bikes</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <LaptopChromebookOutlined />
                        </ListItemIcon>
                        <ListItemText>Electronics</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <MenuBookOutlined />
                        </ListItemIcon>
                        <ListItemText>Books</ListItemText>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <SportsEsportsOutlined />
                        </ListItemIcon>
                        <ListItemText>Games</ListItemText>
                    </MenuItem>


                </Menu>
            </Box>
 
            {useMediaQuery("(min-width:1200px)") && (
        <Stack gap={4} direction={"row"} alignItems={"center"}>
          <Links title={"Home"} />
          <Links title={"Mega Menu"} />
          <Links title={"Full Screen Menu"} />
          <Links title={"pages"} />
          <Links title={"User Account"} />
          <Links title={"Vendor Account"} />
        </Stack>
       
      )}



            { useMediaQuery('(max-width:1200px)') && (  <IconButton onClick={toggleDrawer("top", true)}>
                <MenuSharp />
            </IconButton> )}
           


            <Drawer
                anchor={"top"}
                open={state["top"]}
                onClose={toggleDrawer("top", false)}
                sx={{
                    ".css-k1yagv-MuiPaper-root-MuiDrawer-paper": { height: "100%" },
                    ".css-hmtqcd-MuiPaper-root-MuiDrawer-paper": { height: "100%" }
                }}
            >


                <Box
                    sx={{ width: 444, mx: "auto", mt: 6, position: "relative", pt: 10 }}
                >
                    <IconButton sx={{ ":hover": { color: "red", rotate: "180deg", transition: "0.3s" }, position: "absolute", top: 0, right: 0 }} onClick={toggleDrawer("top", false)}>
                        <Close />
                    </IconButton>
                    {[{ mainLink: "Home", subLink: ["Link1", "Link2", "Link3"] },
                    { mainLink: "Mega menu", subLink: ["Link1", "Link2", "Link3"] },
                    { mainLink: "full screen menu", subLink: ["Link1", "Link2", "Link3"] },
                    { mainLink: "pages", subLink: ["Link1", "Link2", "Link3"] },
                    { mainLink: "user account", subLink: ["Link1", "Link2", "Link3"] },
                    { mainLink: "vendor account", subLink: ["Link1", "Link2", "Link3"] },
                    ].map((item) => {
                        return (
                            <Accordion key={item.mainLink} elevation={0} sx={{ bgcolor: "initial" }}>
                                <AccordionSummary
                                    expandIcon={<ArrowDropDownIcon />}
                                    aria-controls="panel2-content"
                                    id="panel2-header"
                                >
                                    <Typography component="span">{item.mainLink}</Typography>
                                </AccordionSummary>

                                <List sx={{ py: 0, my: 0 }}>

                                    {item.subLink.map((link) => {
                                        return (
                                            <ListItem key={link} sx={{ py: 0, my: 0 }}>
                                                <ListItemButton component="a" href="#simple-list">
                                                    <ListItemText primary={link} />
                                                </ListItemButton>
                                            </ListItem>
                                        )
                                    })}

                                </List>

                            </Accordion>

                        )
                    })}

                </Box>
            </Drawer>


        </Container>
    )
}

export default Bottom;