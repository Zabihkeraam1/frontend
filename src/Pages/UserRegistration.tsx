import { ChangeEvent, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../Store/useAuthStore';

const schema = z.object({
    firstName: z.string().min(1, 'نام الزامی است'),
    lastName: z.string().min(1, 'نام خانوادگی الزامی است'),
    email: z.string().email('ایمیل نامعتبر است'),
    phone: z.number().min(100000000, 'شماره تلفن نامعتبر است').max(9999999999, 'نمبر تماس نباید بیشتر از ۱۰ رقم باشد'),
    password: z.string().min(6, 'رمز عبور باید حداقل 6 کاراکتر باشد'),
    nic: z.string().min(1, 'نمبر تذکره ضروری مباشد'),
    nin: z.string().min(1, 'آی‌دی کارت پوهنتون ضروری میباشد'),
    current_residence: z.string().min(1, 'آدرس فعلی شما ضروری مباشد'),
    original_residence: z.string().min(1, 'آدرس قبلی شما ضروری مباشد'),
    fac_id: z.preprocess((val) => Number(val), z.number()),
    dep_id: z.preprocess((val) => Number(val), z.number()),
    image: z.preprocess((val) => (val instanceof FileList ? val[0] : val), z.instanceof(File, { message: 'لطفاً عکس خود را آپلود کنید' })),
    type: z.string().min(1, 'Role is required'),
});

interface Faculty{
    id: number;
    name: string;
    departments: Department[];
}

interface Department{
    id: number;
    name: string;
}
type FormFields = z.infer<typeof schema>; 
const UserRegistration: React.FC = () => {
    const { setUser } = useAuthStore();
    const navigate = useNavigate();
    const [faculties, setFaculties] = useState<Faculty[]>([]);
    const [selectedFac, setSelectedFac] = useState<Faculty>();
    const [ response, setResponse] = useState<string>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null); 

    const { register, handleSubmit, formState: { errors }, reset }= useForm<FormFields>({
        resolver: zodResolver(schema)
    });

    //const selectedImage = watch('image');
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          setSelectedImage(e.target.files[0]);
        }
      };

    // Setting department based on the faculty
    const handleDepartment = (e: ChangeEvent<HTMLSelectElement>) => {
        const facultyId = parseInt(e.target.value, 10);
        const selectedFaculty = faculties.find(faculty=> faculty.id === facultyId);
        console.log(selectedFaculty);
        setSelectedFac(selectedFaculty);
    };
    useEffect(()=>{
        axios.get("http://localhost:8000/api/home/faculties/with/departments").then((response)=>{
            setFaculties(response.data.data);
            console.log(response.data.data);

        });
    }, [])
    // Submitting the from field
    const onSubmit: SubmitHandler<FormFields> = (data) => {
        const formData = new FormData();

        formData.append('firstName', data.firstName);
        formData.append('lastName', data.lastName);
        formData.append('type', data.type);
        formData.append('email', data.email);
        formData.append('dep_id', String(data.dep_id));
        formData.append('fac_id', String(data.fac_id));
        formData.append('phone', data.phone.toString());
        formData.append('password', data.password);
        formData.append('nic', data.nic);
        formData.append('nin', data.nin);
        formData.append('current_residence', data.current_residence);
        formData.append('original_residence', data.original_residence);
    
        // Append image
        if (selectedImage) {
            formData.append("image", selectedImage);
          }
        axios.post("http://localhost:8000/api/register", formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            }
            }).then((response) => {
            localStorage.setItem('token', response.data.token);
            console.log(localStorage.getItem('token'));
            console.log(response);
            if(response.status === 200) {
                const loggedInUser = { email: response.data.user.email, status: response.data.user.status, type: response.data.user.type };
                const userToken = response.data.token;
                const isLoggedIn = true;
                setUser(loggedInUser, userToken, isLoggedIn);
                console.log("logged in user: ", loggedInUser);
                console.log("user token: ", userToken);
                navigate('/')
                setResponse('');
                reset();
            }
            }
        ).catch((err) => {
            if (err){
            setResponse(err.response.data.message);
            console.log(err);
            }else{
                setResponse('');
               
            }
        });
    };

    return (
        <div className="p-2 flex justify-center items-center">
            <div className='flex flex-col p-2 bg-gray-100 rounded-md'>
                <h1 className="text-3xl font-bold text-center mb-8">ثبت نام</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="role" className="font-semibold"> نقش شما</label>
                        <select {...register("type")} id="role" className="input">
                            <option value="">نقش خود را انتخاب کنید</option>
                            <option value="student">دانشجو</option>
                            <option value="teacher">استاد</option>
                        </select>
                        {errors.type && <span className="text-red-500">{errors.type.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="faculty" className="font-semibold"> دانشکده</label>
                        <select {...register("fac_id")} id="faculty" onChange={handleDepartment} className="input">
                            <option value="">انتخاب فاکولته</option>
                            {faculties && faculties.map((f, index) => (
                                <option key={index} value={f.id}>{f.name}</option>
                            ))}
                        </select>
                        {errors.fac_id && <span className="text-red-500">{errors.fac_id.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="department" className="font-semibold"> دپارتمنت</label>
                        <select {...register("dep_id")} id="department" className="input">
                        <option value="">انتخاب دیپارتمنت</option>
                            {selectedFac && selectedFac.departments.map((d, index) => (
                                <option key={index} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                        {errors.dep_id && <span className="text-red-500">{errors.dep_id.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="nic" className="font-semibold">نمبر تذکره</label>
                        <input {...register('nic')} id='nic' type="text" placeholder='نمبر تذکره' className="input"/>
                        {errors.nic && <span className="text-red-500">{errors.nic.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="nin" className="font-semibold">آی‌دی پوهنتون</label>
                        <input {...register('nin')} id='nin' type="text" placeholder='ّآی‌دی پوهنتون' className="input"/>
                        {errors.nin && <span className="text-red-500">{errors.nin.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="phone" className="font-semibold">تلفن</label>
                        <input {...register('phone', { valueAsNumber: true })} id='phone' type="phone" placeholder='شماره تلفن شما' className="input"/>
                        {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="prevAdd" className="font-semibold">آدرس قبلی</label>
                        <input {...register('original_residence')} id='prevAdd' type="text" placeholder=' آدرس قبلی شما' className="input"/>
                        {errors.original_residence && <span className="text-red-500">{errors.original_residence.message}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="currAdd" className="font-semibold">آدرس فعلی شما</label>
                        <input {...register('current_residence')} id='currAdd' type='text' placeholder='آدرس فعلی شما' className="input"/>
                        {errors.current_residence && <span className="text-red-500">{errors.current_residence.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="name" className="font-semibold">نام</label>
                        <input {...register('firstName')} id='name' type="text" placeholder='نام شما' className="input"/>
                        {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="lastName" className="font-semibold">نام خانوادگی</label>
                        <input {...register('lastName')} id='lastName' type="text" placeholder='نام خانوادگی شما' className="input"/>
                        {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
                    </div>

                    <div className="flex flex-col col-span-2 lg:col-span-1">
                        <label htmlFor="email" className="font-semibold">ایمیل</label>
                        <input {...register('email')} id='email' type="email" placeholder='ایمیل شما' className="input"/>
                        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                    </div>
                    <div className="flex flex-col col-span-2 lg:col-span-1">
                        <label htmlFor="image" className="font-semibold">عکس</label>
                        <input {...register('image')} onChange={handleImageChange} id='image' type="file" placeholder='عکس شما' className="input"/>
                        {errors.image && <span className="text-red-500">{errors.image.message}</span>}
                    </div>

                    <div className="flex flex-col col-span-2 lg:col-span-1">
                        <label htmlFor="password" className="font-semibold">رمز عبور</label>
                        <input {...register('password')} id='password' type="password" placeholder='رمز عبور شما' className="input"/>
                        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                    </div>
                    
                    <div className='col-span-3 flex flex-col justify-center items-center'>
                    <p className='text-red-500 mt-2'>{response}</p>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded-md mt-4">ثبت نام</button>
                    <p>قبلا حساب داشته اید: <Link to={'/login'} className='text-blue-500 hover:underline mt-2'>ورود </Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default UserRegistration;