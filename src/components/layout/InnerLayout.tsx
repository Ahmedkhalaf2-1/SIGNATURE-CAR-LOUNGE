import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'

/** Shell for every inner page: global header widget, page content, global footer widget. */
export function InnerLayout() {
  return (
    <>
      <div className="scl-home scl-home--header">
        <Header />
      </div>
      <Outlet />
      <div className="scl-home">
        <Footer />
      </div>
    </>
  )
}
