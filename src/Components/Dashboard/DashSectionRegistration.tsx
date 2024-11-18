

import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { useAdminAuthStore } from '../../Store/useAdminAuthStore';
const Schema = z.object({
    section: z.string(),
});
type FormFields = z.infer<typeof Schema>;
const DashSectionRegistration: React.FC = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<FormFields>({
        resolver: zodResolver(Schema)
    });
    const { token } = useAdminAuthStore();
    const onSubmit:SubmitHandler<FormFields> = (data) => {
        axios.post('http://localhost:8000/api/dashboard/sections', data, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }).then(response => {
            console.log(response);
        });
    }
  return (
<div className="w-full">
  <div className="flex flex-col p-8 bg-gray-100 rounded-md w-full">
    <h2 className="text-3xl font-bold text-center mb-8">ثبت الماری</h2>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-4 w-full"
    >
      <div className="flex flex-col">
        <label className="font-semibold">الماری</label>
        <input
          type="text"
          {...register('section', { required: 'این فیلد اجباری است' })}
          className="bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md p-2 w-full"
        />
        {errors.section &&  <p className='text-red-500'>{errors.section.message}</p>}
      </div>
      <div className="col-span-3 flex flex-col justify-center items-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded-md mt-4"
        >
          ثبت الماری
        </button>
      </div>
    </form>
  </div>
</div>
  )
}
export default DashSectionRegistration;