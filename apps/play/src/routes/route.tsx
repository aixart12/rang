import { Route, Routes } from 'react-router-dom';
import { LoginScreen } from '../pages/authentication/login';
import { SignupCard } from '../pages/authentication/signup';
import { PlayGround } from '../pages/playground';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PlayGround />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/sign-up" element={<SignupCard />} />
    </Routes>
  );
};
export default AppRoutes;
