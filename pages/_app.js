import '@/styles/globals.css'
import { useRouter } from 'next/router'
import React from 'react'
import HeaderBar from './components/header/headerBar'
import HeaderTabs from './components/header/headerTabsV2'
import SideTreeView from './components/sideTreeView'
import LoadingScreen from './components/loadingscreen'
import { Provider } from 'react-redux'
import store from '../store'
import ConfirmDialog2 from './components/confirmDialog'
import { SessionProvider } from 'next-auth/react'
import Protected from './protectedPage'

export default function App({
  Component,
  pageProps
}) {
  const router = useRouter()
  const { pathname } = router
  // end checkSession

  return (
    <div>
      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          <Protected/>
          <LoadingScreen />
          <ConfirmDialog2 />
          {/* {
          pathname == '/login' && <HeaderBar />
        } */}
          {
            pathname !== '/login' && <HeaderTabs />
          }
          <main className="main-content" style={pathname == '/login' ? { paddingTop: '0px' } : { paddingTop: '64px' }} >
            <Component {...pageProps} />
          </main>
        </SessionProvider>
      </Provider >
    </div>
  )
}

