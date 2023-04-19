import React from 'react'
import Image from 'next/image'
import { AppBar, Toolbar, Typography } from '@mui/material';


const drawerWidth = 240;

export default function HeaderBar(props) {
  return (
    <div>
      <AppBar  position="fixed" sx={{backgroundColor:"transparent" ,zIndex: (theme) => theme.zIndex.drawer + 1,backdropFilter:"blur(20px)" }}>
        {/* <Grid p={1}> */}
        <Toolbar>
          <Image src={"/samartcorp.png"} width={150} height={50} />
          &nbsp;
          &nbsp;
          &nbsp;
          &nbsp;
          <Image src={"/logoLOD.png"} width={150} height={50} />
          <Typography color={"black"} variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          {/* <Button sx={{ ...(props.openSideBar && { display: 'none' }) }} onClick={props.onClickOpen}>Login</Button> */}
        </Toolbar>
        {/* </Grid> */}
      </AppBar>
    </div>
  )
}
