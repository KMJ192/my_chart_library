import { useRouter } from '@router';

import MainPage from './pages/MainPage';
import NotFound from './pages/NotFound';

function App() {
  return useRouter(MainPage, NotFound);
}
export default App;
