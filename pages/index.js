import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import { useSession, signIn } from "next-auth/react"
import { redirect } from 'next/navigation'
import React from 'react'
import { useRouter } from 'next/router'

export default function Home() {
  const { status, data } = useSession();
  console.log(data, "ProtectedData");
  console.log(status, "status");
  const router = useRouter()
  React.useEffect(() => {
    if (data?.user?.USER_LIST_TYPE == 8) {
      router.replace("/checkImage?PROCESS_SEQ=MTA2");
    } else {
      router.replace("/accountControl?PROCESS_SEQ=MTAx");
    }
  }, [data])
  return (
    <>
      <main className={styles.main}>

      </main>
    </>
  )
}
