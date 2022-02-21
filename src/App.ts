import { useRouter } from '@router';
import LineChartContainer from './container/Canvas/LineChartContainer';

import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';

const router = [
  {
    element: LineChartContainer,
    path: '/line-chart',
  },
];

function App() {
  return useRouter(MainPage, NotFound, router);
}
export default App;
