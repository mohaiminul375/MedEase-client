import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import Swal from "sweetalert2";
const AddService = () => {
  const queryClient = useQueryClient();
  // useMutation (tanstack query) for post date to db
  const { mutateAsync } = useMutation({
    mutationFn: async (service) => {
      console.log(service);
      const { data } = await axios.post(
        "https://medease-server.vercel.app/services",
        service
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        Swal.fire({
          title: "Successful",
          text: "Service added",
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

  const onSubmit = (service) => {
    console.log(service);
    // data pass to useMutation
    mutateAsync(service);
    reset();
  };
  return (
    <section>
      <div className="flex justify-center">
        <button
          onClick={() => document.getElementById("form_modal").showModal()}
          className="px-5 py-2 bg-[#0155BD] text-white font-semibold rounded-full flex items-center text-xl"
        >
          <IoMdAdd className="text-xl" /> Add Service
        </button>
      </div>

      <dialog id="form_modal" className="modal">
        <div className="modal-box">
          <h2 className="text-center font-bold text-xl text-[#0155BD]">
            Add Service
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
                  validate: (value) =>
                    !isNaN(value) || "Price must be a number",
                })}
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </div>
            <button className="mt-5 w-full py-2 bg-[#0155BD] text-white font-semibold rounded-full">
              Add
            </button>
          </form>
        </div>
      </dialog>
    </section>
  );
};

export default AddService;
