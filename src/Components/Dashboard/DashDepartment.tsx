import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../axiosInstance";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { useAdminAuthStore } from "../../Store/useAdminAuthStore";
import Swal from "sweetalert2";
import { Loader2 } from "lucide-react";
import DashDepartmentTable from "./DashDepartmentTable";

const Schema = z.object({
  fac_id: z.preprocess((val) => Number(val), z.number()),
  name: z.string().min(1, "این فیلد اجباری است"),
});

interface Faculty {
  id: number;
  name: string;
}

type FormFields = z.infer<typeof Schema>;

const DashDepartment: React.FC = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const { token } = useAdminAuthStore();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("/api/dashboard/faculties", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFaculties(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching faculties:", error);
        setErrorMessage("Failed to fetch faculties. Please try again later.");
      });
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FormFields>({
    resolver: zodResolver(Schema),
  });

  const [update, setUpdate] = useState(false);

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    setLoading(true);
    axios
      .post("/api/dashboard/departments", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setLoading(false);
        Swal.fire({
          title: 'Success!',
          text: 'Department registered successfully',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        setUpdate(!update);
        reset();
      })
      .catch((error) => {
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
  };

  return (
    <div className="w-full">
      <div className="flex flex-col p-8 bg-gray-100 rounded-md w-full">
        <h2 className="text-3xl font-bold text-center mb-8">ثبت دیپارتمنت</h2>
        
        {/* Display error message if there is any */}
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
            <label htmlFor="faculty" className="font-semibold">
            پوهنځی
            </label>
            <select
              {...register("fac_id")}
              id="faculty"
              className="bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md p-2"
            >
              <option value="">انتخاب پوهنځی</option>
              {faculties &&
                faculties.map((fac) => (
                  <option key={fac.id} value={fac.id}>
                    {fac.name}
                  </option>
                ))}
            </select>
            {errors.fac_id && (
              <span className="text-red-500">{errors.fac_id.message}</span>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">دیپارتمنت</label>
            <input
              type="text"
              {...register("name")}
              className="bg-gray-200 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-md p-2 w-full"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="flex ">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-16 rounded-md mt-6"
            >
              {
                loading? <Loader2 className="animate-spin"/> : "ثبت دیپارتمنت"
              }
            </button>
          </div>
        </form>
        <DashDepartmentTable update={update} />
      </div>
    </div>
  );
};

export default DashDepartment;
