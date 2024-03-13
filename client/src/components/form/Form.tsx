import { useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { positions } from '../../static/position';
import { levels } from '../../static/levels';
import { Dialog, Transition } from '@headlessui/react';
import { InputField } from './InputField';
import { Dropdown } from './Dropdown';
import { Icon } from '@iconify/react/dist/iconify.js';

type FormType = {
  name: string;
  lastname: string;
  email: string;
  position: string;
  level: string;
};

export const Form = () => {
  const [form, setForm] = useState({
    name: '',
    lastname: '',
    email: '',
    position: '',
    level: '',
  });
  const [isNew, setIsNew] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecord = async () => {
      const id = params.id?.toString() || undefined;
      if (!id) return;
      setIsNew(false);
      const response = await fetch(
        `http://localhost:5000/record/${params.id?.toString()}`
      );
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        console.error(message);
        return;
      }
      const record = await response.json();
      if (!record) {
        console.warn(`Record with id ${id} not found`);
        navigate('/');
        return;
      }
      setForm(record);
    };
    fetchRecord();
    return;
  }, [navigate, params.id]);

  const updateForm = (value: Partial<FormType>) => {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !form.name ||
      !form.lastname ||
      !form.email ||
      !form.position ||
      !form.level
    ) {
      console.error('Please fill out all fields');
      openModal();
      return;
    }
    const person = { ...form };
    try {
      let response;
      if (isNew) {
        response = await fetch('http://localhost:5000/record/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(person),
        });
      } else {
        response = await fetch(`http://localhost:5000/record/${params.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(person),
        });
      }
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        console.error(message);
        return;
      }
    } catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
    } finally {
      setForm({ name: '', lastname: '', email: '', position: '', level: '' });
      navigate('/');
    }
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}
        >
          <div className='min-h-screen px-4 text-center'>
            <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />

            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>

            <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 text-gray-900'
              >
                Submission Error
              </Dialog.Title>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  We noticed that one or more fields in the form are empty.
                  Please fill in all required fields to proceed with your
                  submission. Thank you.
                </p>
              </div>

              <div className='mt-4'>
                <button
                  type='button'
                  className='btn btn-warning whitespace-nowrap font-medium rounded-md mr-4 cursor-pointer'
                  onClick={closeModal}
                >
                  Fill out form
                </button>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>

      <form
        onSubmit={handleSubmit}
        className='border rounded-lg overflow-hidden p-4'
      >
        <div className='grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2'>
          <div>
            <h2 className='text-xl font-semibold leading-7 uppercase'>
              Intern Information
            </h2>
            <p className='mt-1 text-sm leading-6 text-slate-600 text-justify'>
              The section titled "Intern Information" is a crucial part of our
              application. This section is designed to gather and display
              information about interns. The information entered here is not
              just for internal use, but will also be publicly visible to anyone
              who accesses our platform. This could include other interns,
              potential employers, or anyone interested in the work our interns
              are doing.
            </p>
          </div>

          <div className='grid min-w-full grid-cols-1 gap-x-6 gap-y-8 '>
            <div className='sm:col-span-4'>
              <InputField
                type='text'
                label='Enter name'
                name='name'
                placeholder='Enter name'
                value={form.name}
                onChange={(value) => updateForm({ name: value })}
              />
            </div>
            <div className='sm:col-span-4'>
              <InputField
                type='text'
                label='Enter last name'
                name='lastname'
                placeholder='Enter last name'
                value={form.lastname}
                onChange={(value) => updateForm({ lastname: value })}
              />
            </div>
            <div className='sm:col-span-4'>
              <InputField
                type='email'
                label='Enter email'
                name='email'
                placeholder='Enter email'
                value={form.email}
                onChange={(value) => updateForm({ email: value })}
              />
            </div>
            <div className='sm:col-span-4'>
              <Dropdown
                name='position'
                value={form.position}
                options={positions}
                onChange={(value) => updateForm({ position: value })}
              />
            </div>
            <div>
              <fieldset>
                <legend className='sr-only'>Position Options</legend>
                <div className='space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0'>
                  <div className='flex items-center'>
                    {levels.map(({ id, label, value }) => (
                      <Fragment key={id}>
                        <input
                          id={id.toString()}
                          name='position'
                          type='radio'
                          value={value}
                          className='h-4 w-4 border-slate-300 text-slate-600 focus:ring-slate-600 cursor-pointer'
                          checked={form.level === value}
                          onChange={(e) =>
                            updateForm({ level: e.target.value })
                          }
                        />
                        <label
                          htmlFor='position'
                          className='ml-3 block text-sm font-medium leading-6 text-slate-900 mr-4'
                        >
                          {label}
                        </label>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>
        <button
          type='submit'
          className='btn btn-primary text-slate-50 whitespace-nowrap font-medium rounded-md mt-4 cursor-pointer'
        >
          {isNew ? (
            <Icon
              icon='heroicons-outline:clipboard-list'
              width='1.2em'
              height='1.2em'
            />
          ) : (
            <Icon
              icon='heroicons-outline:pencil-alt'
              width='1.2em'
              height='1.2em'
            />
          )}

          {isNew ? 'Create Intern Record' : 'Update Intern Record'}
        </button>
      </form>
    </>
  );
};
