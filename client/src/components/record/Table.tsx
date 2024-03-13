import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react/dist/iconify.js';

type RecordProps = {
  record: {
    _id: number;
    name: string;
    lastname: string;
    email: string;
    position: string;
    level: string;
  };
  deleteRecord: (id: number) => void;
};

export const Table: React.FC<RecordProps> = ({ record, deleteRecord }) => {
  return (
    <tr>
      <td className='border-dashed border-t border-gray-200'>
        <span className='text-gray-700 px-4 py-6 flex items-center'>
          {`${record.name} ${record.lastname}`}
        </span>
      </td>
      <td className='border-dashed border-t border-gray-200'>
        <span className='text-gray-700 px-4 py-3 flex items-center'>
          {record.position}
        </span>
      </td>
      <td className='border-dashed border-t border-gray-200'>
        <span className='text-gray-700 uppercase px-4 py-3 flex items-center'>
          {record.level === 'Intern' ? (
            <div className='badge badge-neutral'>{record.level}</div>
          ) : record.level === 'Junior' ? (
            <div className='badge badge-accent'>{record.level}</div>
          ) : (
            <div className='badge badge-primary'>{record.level}</div>
          )}
        </span>
      </td>
      <td className='border-dashed border-t border-gray-200'>
        <span className='text-gray-700 px-4 py-3 flex items-center'>
          {record.email}
        </span>
      </td>
      <td>
        <div className='flex gap-3'>
          <Link
            to={`/edit/${record._id}`}
            className='btn btn-primary rounded-md text-slate-50'
          >
            <Icon
              icon='heroicons-outline:pencil-alt'
              width='1.2em'
              height='1.2em'
            />
            Edit Record
          </Link>
          <button
            className='btn btn-outline btn-error rounded-md'
            type='button'
            onClick={() => deleteRecord(record._id)}
          >
            <Icon icon='heroicons-outline:trash' width='1.2em' height='1.2em' />
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};
