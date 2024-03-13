import { NavLink } from 'react-router-dom';
import MongoDB from '../assets/MongoDB.svg';

export const Navbar = () => {
  return (
    <header className='w-full p-6'>
      <nav>
        <NavLink to='/'>
          <img src={MongoDB} alt='MongoDB Logo' className='h-10' />
        </NavLink>
      </nav>
    </header>
  );
};
