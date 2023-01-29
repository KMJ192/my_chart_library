import { useRouter } from '@router';
import LineChartContainer from './container/Canvas/LineChartContainer';
import PieChartContainer from './container/Canvas/PieChartContainer';

import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';

const router = [
  {
    element: LineChartContainer,
    path: '/line-chart',
  },
  {
    element: PieChartContainer,
    path: '/pie-chart',
  },
];

function App() {
  return useRouter(MainPage, NotFound, router);
}
export default App;
