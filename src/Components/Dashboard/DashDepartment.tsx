import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { useAdminAuthStore } from '../../Store/useAdminAuthStore';

// Updated schema to expect faculty as a number
const Schema = z.object({
    fac_id: z.preprocess((val) => Number(val), z.number()),
    name: z.string().min(1, 'این فیلد اجباری است'),
});

interface Faculty {
    id: number;
    name: string;
}

type FormFields = z.infer<typeof Schema>;

const DashDepartment: React.FC = () => {
    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const { token } = useAdminAuthStore();
    useEffect(() => {
        axios.get('http://localhost:8000/api/dashboard/faculties', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            console.log("fac", response.data.data);
            setFaculties(response.data.data);
        });
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm<FormFields>({
        resolver: zodResolver(Schema)
    });

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        console.log(data);
        axios.post('http://localhost:8000/api/dashboard/departments', data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                console.log(response);
            });
    };

    return (
        <div className="w-full">
            <div className="flex flex-col p-8 bg-gray-100 rounded-md w-full">
                <h2 className="text-3xl font-bold text-center mb-8">ثبت دیپارتمنت</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-4 w-full"
                >
                    <div className="flex flex-col">
                        <label htmlFor="faculty" className="font-semibold">فاکولته</label>
                        <select {...register("fac_id")} id="faculty" className="bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md p-2">
                            {
                                faculties && faculties.map((fac) => (
                                    <option key={fac.id} value={fac.id}>{fac.name}</option>
                                ))
                            }
                        </select>
                        {errors.fac_id && <span className="text-red-500">{errors.fac_id.message}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label className="font-semibold">دیپارتمنت</label>
                        <input
                            type="text"
                            {...register('name')}
                            className="bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md p-2 w-full"
                        />
                        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="col-span-3 flex flex-col justify-center items-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded-md mt-4"
                        >
                            ثبت دیپارتمنت
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DashDepartment;
