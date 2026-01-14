import { UserProvider, useUser } from './contexts/UserContext'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

const AppContent = () => {
  const { user } = useUser()

  if (!user) {
    return <Login />
  }

  return <Dashboard />
}

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  )
}

export default App
