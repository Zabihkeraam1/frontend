import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAdminAuthStore } from "../../store/useAdminAuthStore";

type FormValues = {
  title: string;
  author: string;
  publisher: string;
  dep_id: number;
  cat_id: number;
  format: string;
  barrow: string;
  image: File;
  shelf: string;
  publicationYear: string;
  lang: string;
  translator: string;
  sec_id: string;
  lockerNumber: string;
  isbn: string;
  description: string;
  total: number; //add
  edition: string; //add
  code:string;
};

interface Department {
  id: number;
  name: string;
}

interface Shelf {
  id: number;
  section: string;
}

interface Category {
  id: number;
  name: string;
}

const DashBookRegistration: React.FC = () => {
  const [faculties, setFaculties] = useState<Department[]>([]);
  const [shelves, setShelves] = useState<Shelf[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [response, setResponse] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null); 
  
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
  const { token } = useAdminAuthStore();

  useEffect(() => {
    axios.get("http://localhost:8000/api/dashboard/departments",
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    ).then((response) => {
      setFaculties(response.data.data);
    });
    axios.get("http://localhost:8000/api/dashboard/sections",
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    ).then((response) => {
      setShelves(response.data.data);
      console.log(response.data.data);
    });
    axios.get("http://localhost:8000/api/dashboard/categories",
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    ).then((response) => {
      setCategories(response.data.data);
      console.log(response.data.data);
    });
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('publisher', data.publisher);
    formData.append('dep_id', String(data.dep_id));
    formData.append('cat_id', String(data.cat_id));
    formData.append('format', data.format);
    formData.append('borrow', data.barrow);
    formData.append('shelf', data.shelf);
    formData.append('publicationYear', data.publicationYear);
    formData.append('lang', data.lang);
    formData.append('translator', data.translator);
    formData.append('sec_id', data.sec_id);
    formData.append('isbn', data.isbn);
    formData.append('description', data.description);
    formData.append('total', String(data.total));
    formData.append('edition', data.edition);
    formData.append('code','DH')

    // Append image
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    axios
      .post("http://localhost:8000/api/dashboard/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      })
      .then((response) => {
        setResponse(response.data.message);
      });
    reset();
  };

  return (
    <div className="w-full">
      <div className="flex flex-col p-8 bg-gray-100 rounded-md w-full">
        <h2 className="text-3xl font-bold text-center mb-8">ثبت کتاب</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4 lg:gap-4 w-full"
        >
          <div className="flex flex-col">
            <label className="font-semibold">عنوان</label>
            <input
              type="text"
              {...register("title", { required: "این فیلد اجباری است" })}
              className="input"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="faculty" className="font-semibold">
              {" "}
              کتگوری:
            </label>
            <select {...register("cat_id")} id="faculty" className="input">
              <option value="">انتخاب کتگوری</option>
              {categories &&
                categories.map((f, index) => (
                  <option key={index} value={f.id}>
                    {f.name}
                  </option>
                ))}
            </select>
            {errors.cat_id && (
              <span className="text-red-500">{errors.cat_id.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="department" className="font-semibold">
              {" "}
              دپارتمنت:
            </label>
            <select {...register("dep_id")} id="department" className="input">
              <option value="">انتخاب دیپارتمنت</option>
              {faculties &&
                faculties.map((d, index) => (
                  <option key={index} value={d.id}>
                    {d.name}
                  </option>
                ))}
            </select>
            {errors.dep_id && (
              <span className="text-red-500">{errors.dep_id.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">مولف</label>
            <input
              type="text"
              {...register("author", { required: "این فیلد اجباری است" })}
              className="input"
            />
            {errors.author && (
              <span className="text-red-500 text-sm">
                {errors.author.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">ناشر</label>
            <input
              type="text"
              {...register("publisher", { required: "این فیلد اجباری است" })}
              className="input"
            />
            {errors.author && (
              <span className="text-red-500 text-sm">
                {errors.author.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">چاپ</label>
            <input
              type="text"
              {...register("edition", { required: "این فیلد اجباری است" })}
              className="input"
            />
            {errors.edition && (
              <span className="text-red-500 text-sm">
                {errors.edition.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">زبان</label>
            <input
              type="text"
              {...register("lang", { required: "این فیلد اجباری است" })}
              className="input"
            />
            {errors.lang && (
              <span className="text-red-500 text-sm">
                {errors.lang.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">تعداد</label>
            <input
              type="text"
              {...register("total", { required: "این فیلد اجباری است" })}
              className="input"
            />
            {errors.total && (
              <span className="text-red-500 text-sm">
                {errors.total.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">مترجم</label>
            <input type="text" {...register("translator")} className="input" />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">سال چاپ</label>
            <input
              type="date"
              {...register("publicationYear", {
                required: "این فیلد اجباری است",
              })}
              className="input"
            />
            {errors.publicationYear && (
              <span className="text-red-500 text-sm">
                {errors.publicationYear.message}
              </span>
            )}
          </div>

          {/* Shelf */}
          <div className="flex flex-col">
            <label className="font-semibold">نام الماری</label>
            <select
              {...register("sec_id", { required: "این فیلد اجباری است" })}
              className="input"
            >
              <option value="">الماری انتخاب کنید</option>
              {shelves &&
                shelves.map((shelf) => (
                  <option key={shelf.id} value={shelf.id}>
                    {shelf.section}
                  </option>
                ))}
            </select>
            {errors.sec_id && (
              <span className="text-red-500">{errors.sec_id.message}</span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">نمبر قفسه</label>
            <input
              type="number"
              {...register("shelf", { required: "این فیلد اجباری است" })}
              className="input"
            />

            {errors.shelf && (
              <span className="text-red-500">{errors.shelf.message}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">DDS</label>
            <input
              type="text"
              {...register("code", { required: "این فیلد اجباری است" })}
              className="input"
            />
            {errors.code && (
              <span className="text-red-500 text-sm">
                {errors.code.message}
              </span>
            )}
          </div>
        

     


          {/* NEED EDITING */}
          <div className="flex flex-col">
            <label className="font-semibold">ISBN</label>
            <input
              type="text"
              {...register("isbn", { required: "این فیلد اجباری است" })}
              className="input"
            />
            {errors.isbn && (
              <span className="text-red-500 text-sm">
                {errors.isbn.message}
              </span>
            )}
          </div>

          

          <div className="flex flex-col">
            <label className="font-semibold">اجازه امانت</label>
            <select
              {...register("barrow", { required: "این فیلد اجباری است" })}
              className="input"
            >
              <option value="yes">بلی</option>
              <option value="no">نخیر</option>
            </select>
            {errors.barrow && (
              <span className="text-red-500 text-sm">
                {errors.barrow.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">نوعیت کتاب</label>
            <select
              {...register("format", { required: "این فیلد اجباری است" })}
              className="input"
            >
              <option value="hard">هارد</option>
              <option value="soft">سافت</option>
              <option value="both">هردو</option>
            </select>
            {errors.format && (
              <span className="text-red-500 text-sm">
                {errors.format.message}
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">انتخاب عکس</label>
            <input type="file" onChange={handleImageChange} className="input" />
            {errors.image && (
              <span className="text-red-500 text-sm">
                {errors.image.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">شرح کتاب</label>
            <input
              type="text"
              {...register("description", { required: "این فیلد اجباری است" })}
              className="input"
            />
            {errors.description && (
              <span className="text-red-500 text-sm">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Submit Button */}
          <div className="col-span-3 flex flex-col justify-center items-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded-md mt-4"
            >
              ثبت کتاب
            </button>
            {response && <p className="text-red-500 py-2">{response}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashBookRegistration;