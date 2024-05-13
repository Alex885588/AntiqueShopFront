import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './Components/LoginPage/Login';
import { HomePage } from './Components/HomePage/HomePage';
import { useAuth } from './ContextApi/AuthContextApi';
import { ItemDetailsPage } from './Components/ItemDetailsPage/ItemDetailsPage';
import { ProfilePage } from './Components/ProfilePage.tsx/ProfilePage';
import { RegisterPage } from './Components/Register/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from './Components/Spinner/Spinner';

const ProtectedRoute = (props: { component: React.ComponentType<any> }) => {
  const context = useAuth();
  const isAuthenticated = context?.isAuthenticated;
  return isAuthenticated ? <props.component /> : <LoginPage />
};

function App() {
  const isReady = useMemo(() => {
    if (!process.env.REACT_APP_BACKEND_URL || !process.env.REACT_APP_BACKEND_WS_URL) {
      alert('Project running error please contact with admin');
      console.error('Supply env variables before running project');
      return false;
    }
    return true;
  }, [])

  if (!isReady) {
    return <div></div>
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<ProtectedRoute component={HomePage} />} />
        <Route path='/item-details/:id' element={<ProtectedRoute component={ItemDetailsPage} />} />
        <Route path='/profile' element={<ProtectedRoute component={ProfilePage} />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
