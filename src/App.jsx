import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import GetStarted from './components/2nd_page/GetStarted'
import SignOutPage from './components/auth/SignOutPage'
import PlatformPage from './pages/PlatformPage'
import { sitePages } from './data/platformRoutes'
import ProtectedRoute from './components/auth/ProtectedRoute'

const App = () => {
  const allPages = Object.values(sitePages);
  const extraPages = allPages.filter((page) => page.path !== '/');

  const publicPages = extraPages.filter((page) => !page.path.startsWith('/ngo/') && !page.path.startsWith('/volunteer/') && !page.path.startsWith('/staff/') && !page.path.startsWith('/admin/'));
  const ngoPages = extraPages.filter((page) => page.path.startsWith('/ngo/'));
  const volunteerPages = extraPages.filter((page) => page.path.startsWith('/volunteer/'));
  const staffPages = extraPages.filter((page) => page.path.startsWith('/staff/'));
  const adminPages = extraPages.filter((page) => page.path.startsWith('/admin/'));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlatformPage page={sitePages.landing} />} />
        <Route path="/get-started" element={<GetStarted />} />

        {publicPages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={<PlatformPage page={page} />}
          />
        ))}

        {ngoPages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={(
              <ProtectedRoute allowedRoles={["NGO"]}>
                <PlatformPage page={page} />
              </ProtectedRoute>
            )}
          />
        ))}

        {volunteerPages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={(
              <ProtectedRoute allowedRoles={["Volunteer"]}>
                <PlatformPage page={page} />
              </ProtectedRoute>
            )}
          />
        ))}

        {adminPages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={(
              <ProtectedRoute allowedRoles={["Admin"]}>
                <PlatformPage page={page} />
              </ProtectedRoute>
            )}
          />
        ))}

        {staffPages.map((page) => (
          <Route
            key={page.path}
            path={page.path}
            element={(
              <ProtectedRoute allowedRoles={["Staff"]}>
                <PlatformPage page={page} />
              </ProtectedRoute>
            )}
          />
        ))}

        <Route path="/ngos" element={<Navigate to="/directory" replace />} />
        <Route path="/features" element={<Navigate to="/about" replace />} />
        <Route path="/signup" element={<Navigate to="/role-select" replace />} />
        <Route path="/sign-out" element={<SignOutPage />} />
        <Route path="/reset-password" element={<PlatformPage page={sitePages.forgotPassword} />} />
        <Route path="/admin/approvals" element={<Navigate to="/admin/ngo-approvals" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App