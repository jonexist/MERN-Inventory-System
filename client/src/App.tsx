import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <main className='container mx-auto min-h-dvh p-3'>
        <Outlet />
      </main>
    </>
  );
};

export default App;
