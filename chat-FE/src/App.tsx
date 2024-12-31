import { Routes, Route, Navigate } from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SettingPage from "./pages/SettingPage"
import ProfilePage from "./pages/ProfilePage"
import Navbar from "./components/Navbar"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
import { Toaster } from "react-hot-toast"
//import { Loader } from "lucide-react"
function App() {

  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log(authUser);

  if(isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
      <span className="loading loading-spinner text-primary"></span>
    </div>
    )
  }
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to='/login' />} > </Route>
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to='/login' />} > </Route>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to='/' />} > </Route>
        <Route path="/settings" element={<SettingPage />} > </Route>
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to='/login' />} > </Route>
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App
