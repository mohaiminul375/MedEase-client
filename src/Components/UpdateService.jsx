import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import Swal from "sweetalert2";

const UpdateService = ({ service }) => {
  const { _id, service_name, description, price } = service;
  const queryClient = useQueryClient();
  //update services UseMutation
  const { mutateAsync } = useMutation({
    mutationFn: async ({ _id, update_info }) => {
        console.log(update_info)
      const { data } = await axios.patch(
        `https://medease-server.vercel.app/services/${_id}`,
         update_info 
      );
      console.log(data)
      return data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount) {
        Swal.fire({
          title: "Successful",
          text: "Service info updated",
          icon: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["all-services"] });
      }
    },
  });
// react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (update_info) => {
    console.log(_id);
    console.log(update_info);
    mutateAsync({ _id, update_info });
  };
  return (
    <div className="modal-box">
      <h2 className="text-center font-bold text-xl text-[#0155BD]">
        Update Service
      </h2>
      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="rounded-full bg-red-800 text-white p-1 font-bold">
            <FaXmark />
          </button>
        </form>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Service Name</span>
          </label>
          <input
            type="text"
            placeholder="input service name"
            className="input input-bordered"
            {...register("service_name")}
            required
            defaultValue={service_name}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            placeholder="input description"
            className="input input-bordered"
            {...register("description")}
            required
            defaultValue={description}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="text"
            placeholder="input service price"
            className="input input-bordered"
            required
            {...register("price", {
              validate: (value) => !isNaN(value) || "Price must be a number",
            })}
            defaultValue={price}
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>
        <button className="mt-5 w-full py-2 bg-[#0155BD] text-white font-semibold rounded-full">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateService;
