import { Route, Routes } from 'react-router-dom';
import { Policy, Home } from './pages';
import { Index, SiteRoute } from './constants';
import { Layout } from './components';
import { FC } from 'react';

const App: FC = () => (
  <Routes>
    <Route path={Index} element={<Layout />}>
      <Route index element={<Home />} />
      <Route path={SiteRoute.policy.path} element={<Policy />} />
    </Route>
  </Routes>
);

export default App;
