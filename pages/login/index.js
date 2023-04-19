import { LoadingButton } from '@mui/lab';
import { Button, Grid, TextField, Fade, Typography, Divider, Box, Link, Paper, Alert, Snackbar } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress';
import LoginIcon from '@mui/icons-material/Login';
import Image from "next/image"
import React from 'react'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { loginByUsername } from '@/service/adm/login';
import MD5 from '@/lib/md5';
import { _createToken, getCookie, setCookie } from '@/lib/datacontrol';
import * as UserStore from '@/store/feature/userid'
import jwt from 'jsonwebtoken';
import { decode, encode } from 'next-base64';
import { useSession, getSession, getProviders, signIn, getCsrfToken } from "next-auth/react"

export default function SignIn({ providers, csrfToken }) {
  const [userName, setuserName] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [login_token, setLogin_Token] = React.useState(null)
  const [isErrorLogin, setIserrorLogin] = React.useState(false)
  const [isErrorLoginMsg, setIserrorLoginMsg] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [userMsg, setUserMsg] = React.useState("กำลังเข้าสู่ระบบกรุณารอสักครู่...")
  const [userMsgStatus, setUserMsgStatus] = React.useState(true)
  const containerRef = React.useRef(null)
  const disPacth = useDispatch()
  const router = useRouter()
  const linkParams = router.query
  let {data} = useSession()
  console.log(data,"data");
  console.log(linkParams, "linkParams session");
  // console.log(providers, "getProviders session");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = await signIn("credentials", {
      redirect: false,
      USER_LIST_PID: userName,
      USER_LIST_PASS: password
    }).then(async ({ ok, error }) => {
      if (ok) {
        console.log(ok);
        if(data?.user?.USER_LIST_TYPE == 8){
          router.push("/checkImage?PROCESS_SEQ=MTA2");
        }else{
          router.push("/accountControl?PROCESS_SEQ=MTAx");
        }

      } else {
        console.log(error)
        await setIserrorLogin(true)
        await setIserrorLoginMsg("กรุณาตรวจสอบชื่อผู้ใช้งานและรหัสผ่าน !!")
      }
    });
    console.log(res,"res");
  }

  return (
    <Grid container justifyContent={"center"} alignItems={"center"} sx={{ height: "100vh" }}>
      <Grid container justifyContent={"center"} spacing={2} px={5} style={{ maxWidth: "500px" }}>
        <Grid item p={5}>
          {linkParams?.message &&
            <Snackbar
              open
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Alert severity="error">{linkParams.message}</Alert>
            </Snackbar>
          }
        </Grid>
        <Fade in={true} timeout={5000}>
          <Grid container justifyContent={"center"} spacing={2} px={5} style={{ maxWidth: "500px" }} component={Paper} sx={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '10px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.2)',
          }}>
            <Grid item xs={12}>
              <Grid container justifyContent={"center"}>
                <Grid item>
                  <Image src={"/dollogo.png"} width={150} height={150} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent={"center"} >
                <Grid item ref={containerRef}>
                  <Fade in={true} timeout={4000}>
                    <Typography variant="h4" fontSize={24} align="center">โครงการจ้างนำเข้าข้อมูลเพื่อการจดทะเบียนออนไลน์ทั่วประเทศ</Typography>
                  </Fade>
                  <Fade in={true} timeout={1000} container={containerRef.current} style={{ transitionDelay: 50 }} >
                    <Divider />
                  </Fade>
                  <Fade in={true} timeout={4000} style={{ transitionDelay: 150 }}>
                    <Typography align="center">ปีงบประมาณ พ.ศ. 2566</Typography>
                  </Fade>
                </Grid>
              </Grid>
            </Grid>
            {
              login_token == null ? (
                <Grid item xs={12}>
                  <form >
                    <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                    <Fade in={true} timeout={4000} style={{ transitionDelay: 150 }}>
                      <Grid container justifyContent={"center"} spacing={2} >
                        <Grid item>
                          <Grid container justifyContent={"center"} spacing={2} py={2}>
                            <Grid item xs={12}>
                              <Grid item>
                                <TextField fullWidth
                                  label="ชื่อผู้ใช้งาน"
                                  error={isErrorLogin && userName == ""}
                                  inputProps={{
                                    maxLength: 20,
                                  }}
                                  name='USER_LIST_PID'
                                  InputProps={{
                                    disableUnderline: true,
                                  }}
                                  size='small'
                                  type='text'
                                  onChange={(e) => { setIserrorLogin(false); setuserName(e.target.value) }}
                                />
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid item>
                                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                  <TextField fullWidth
                                    type="password"
                                    label="รหัสผ่าน"
                                    error={isErrorLogin && password == ""}
                                    name='USER_LIST_PASS'
                                    inputProps={{
                                      maxLength: 20,
                                    }}
                                    InputProps={{
                                      disableUnderline: true,
                                    }}
                                    size='small'
                                    value={password}
                                    onChange={(e) => { setIserrorLogin(false); setPassword(e.target.value) }}
                                  />
                                </Box>
                              </Grid>
                            </Grid>
                            <Grid item xs={12}>
                              <Grid container justifyContent={"center"} alignItems="center">
                                <Grid item>
                                  {isErrorLogin &&
                                    <Typography color={"error"} variant="body1">
                                      {isErrorLoginMsg}
                                    </Typography>
                                  }

                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={6} md={6}>
                              <Grid item>
                                <LoadingButton
                                  // onClick={_onClickLogin}
                                  onClick={handleSubmit}
                                  type='submit'
                                  startIcon={<LoginIcon />}
                                  loading={isLoading}
                                  // loadingIndicator={"กำลังเข้าสู่ระบบ"}
                                  variant='contained'
                                  disabled={isLoading} >
                                  เข้าสู่ระบบ
                                </LoadingButton>
                              </Grid>
                            </Grid>
                            {/* <Grid item xs={6} md={6}>
                              <Grid container justifyContent={"flex-end"} alignItems="bottom" px={3}>
                                <Grid item>
                                  <Link>
                                    ลืมรหัสผ่าน
                                  </Link>
                                </Grid>
                              </Grid>
                            </Grid> */}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Fade>
                  </form>
                </Grid>
              ) :
                <Grid container justifyContent={"center"} alignItems="center">
                  <Grid item>
                    {
                      userMsgStatus == true && <CircularProgress color="error" />
                    }
                  </Grid>
                  <Grid item px={2}>
                    <Typography align="center"> {userMsg}</Typography>
                  </Grid>
                </Grid>
            }
          </Grid>
        </Fade>
      </Grid>
    </Grid>
  )
}


export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}