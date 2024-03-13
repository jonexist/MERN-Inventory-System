import { NavLink } from 'react-router-dom';

export const Error404 = () => {
  return (
    <div className='grid h-screen place-content-center bg-white px-4'>
      <div className='text-center'>
        <h1 className='text-9xl font-black text-gray-200'>404</h1>

        <p className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Uh-oh!
        </p>

        <p className='mt-4 text-gray-500'>We can't find that page.</p>

        <NavLink to='/' className='btn btn-primary text-slate-50 mt-6'>
          Go back home
        </NavLink>
      </div>
    </div>
  );
};
