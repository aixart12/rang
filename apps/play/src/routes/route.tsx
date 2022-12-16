import { Route, Routes } from 'react-router-dom';
import { PlayGround } from '../pages/playground';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PlayGround />} />
    </Routes>
  );
};
export default AppRoutes;
