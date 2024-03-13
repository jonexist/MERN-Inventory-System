import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Table } from './Table';
import { Icon } from '@iconify/react/dist/iconify.js';
import Empty from '../../assets/Empty.svg';

type RecordType = {
  _id: number;
  name: string;
  lastname: string;
  email: string;
  position: string;
  level: string;
};

export const RecordList = () => {
  const [records, setRecords] = useState<RecordType[]>([]);

  useEffect(() => {
    const fetchRecords = async () => {
      const response = await fetch('http://localhost:5000/record/');
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    };
    fetchRecords();
  }, [records.length]);

  const deleteRecord = async (id: number) => {
    await fetch(`http://localhost:5000/record/${id}`, {
      method: 'DELETE',
    });
    const newRecords = records.filter((record) => record._id !== id);
    setRecords(newRecords);
  };

  return (
    <>
      <div className='text-right'>
        <NavLink to='/create' className='btn btn-ghost mb-4 w-full sm:w-max'>
          <Icon icon='heroicons-outline:plus' width='1.2em' height='1.2em' />
          Add new record
        </NavLink>
      </div>
      <div className='container mx-auto'>
        <div className='overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative'>
          {!records.length ? (
            <div className='grid place-content-center bg-white px-4'>
              <div className='text-center'>
                <img src={Empty} alt='Empty' className='w-96 mx-auto' />
                <h1 className='mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
                  Uh-oh!
                </h1>
                <p className='mt-4 text-gray-500'>
                  We couldn't find any intern records at the moment. Please
                  check back later or consider adding new records if you have
                  any.
                </p>
              </div>
            </div>
          ) : (
            <table className='border-collapse table-auto min-w-full whitespace-no-wrap bg-white table-striped relative'>
              <thead className='ltr:text-left rtl:text-right'>
                <tr className='text-left'>
                  <th className='bg-gray-100 sticky top-0 border-b border-gray-200 px-4 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs'>
                    Full Name
                  </th>
                  <th className='bg-gray-100 sticky top-0 border-b border-gray-200 px-4 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs'>
                    Position
                  </th>
                  <th className='bg-gray-100 sticky top-0 border-b border-gray-200 px-4 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs'>
                    Level
                  </th>
                  <th className='bg-gray-100 sticky top-0 border-b border-gray-200 px-4 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs'>
                    Email Address
                  </th>
                  <th className='bg-gray-100 sticky top-0 border-b border-gray-200 px-4 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs'>
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {records.map((record) => (
                  <Table
                    key={record._id}
                    record={record}
                    deleteRecord={deleteRecord}
                  />
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
