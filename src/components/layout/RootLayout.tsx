import { Outlet } from 'react-router-dom'
import { ScrollToTop } from './ScrollToTop'

/** `.scl-app` is the root of the captured "brand" override block. */
export function RootLayout() {
  return (
    <div className="scl-app">
      <ScrollToTop />
      <Outlet />
    </div>
  )
}
