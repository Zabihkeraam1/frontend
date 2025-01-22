import { zodResolver } from '@hookform/resolvers/zod';
import axios from '../../axiosInstance';
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { useAdminAuthStore } from '../../Store/useAdminAuthStore';
import Swal from 'sweetalert2';
import DashSectionTable from './DashSectionTable';
import { Loader2 } from 'lucide-react';
const Schema = z.object({
    section: z.string(),
});
type FormFields = z.infer<typeof Schema>;
const DashSectionRegistration: React.FC = () => {
    const { register, handleSubmit, formState: {errors}, reset } = useForm<FormFields>({
        resolver: zodResolver(Schema)
    });
    const { token } = useAdminAuthStore();
    const [update, setUpdate] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const onSubmit:SubmitHandler<FormFields> = (data) => {
      setLoading(true);
        axios.post('/api/dashboard/sections', data, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }).then((response)=>{
        setLoading(false);
        Swal.fire({
          title: 'Success!',
          text: 'Faculty registered successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        console.log(response);
        setUpdate(!update);
        reset()
      }) .catch((error) => {
        setLoading(false);
        // Handling the error
        if (error.response) {
          console.error("Error response:", error.response);
          setErrorMessage(error.response.data.message || "Failed to submit department.");
          if (error.response.data.errors) {
            console.log("Validation Errors:", error.response.data.errors);
          }
        } else {
          setErrorMessage("An unexpected error occurred. Please try again later.");
        }
      });
    }
  return (
<div className="w-full">
  <div className="flex flex-col p-8 bg-gray-100 rounded-md w-full">
    <h2 className="text-3xl font-bold text-center mb-8">ثبت الماری</h2>
    {errorMessage && (
          <div className="bg-red-500 text-white p-4 rounded-md mb-4">
            {errorMessage}
          </div>
        )}
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
      <div className="">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded-md mt-6"
        >
        {
          loading? <Loader2 className='animate-spin'/> : 'ثبت الماری'
        }
        </button>
      </div>
    </form>
    <DashSectionTable update={update}/>
  </div>
</div>
  )
}
export default DashSectionRegistration;