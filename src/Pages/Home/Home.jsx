import React from "react";
import { useForm } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";

const Home = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
        console.log(data)
};

  return (
    <section className="mt-20">
      <div className="flex justify-center">
        <button
          onClick={() => document.getElementById("form_modal").showModal()}
          className="px-5 py-2 bg-[#0155BD] text-white font-semibold rounded-full flex items-center text-xl"
        >
          <IoMdAdd className="text-xl" /> Add Service
        </button>
      </div>
      {/* form */}
      <dialog id="form_modal" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Service Name</span>
              </label>
              <input
                type="text"
                placeholder="input service name"
                className="input input-bordered"
                {...register('service-name')}
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
                {...register('description')}
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
                {...register('price')}
                required
              />
            </div>
            <button className="mt-5 w-full py-2 bg-[#0155BD] text-white font-semibold rounded-full">Add</button>
          </form>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default Home;
