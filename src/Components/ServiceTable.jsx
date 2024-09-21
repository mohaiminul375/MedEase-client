import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import Swal from "sweetalert2";

const ServiceTable = ({ service, idx }) => {
  const { _id, service_name, description, price } = service;
  const queryClient = useQueryClient();
  //

  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(
        `http://localhost:3000/services/${id}`
      );
      console.log(data);
      return data;
    },
    onSuccess: (data) => {
      if (data.deletedCount) {
        Swal.fire({
          title: "Deleted!",
          text: "Your service has been deleted.",
          icon: "success",
        });
        queryClient.invalidateQueries({ queryKey: ["all-services"] });
      }
    },
  });
  const handleDelete = (id) => {
    console.log(id);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutateAsync(id);
      }
    });
  };
  return (
    <tr className="border-b-[#0155BD]">
      <th>{idx + 1}</th>
      <td>{service_name}</td>
      <td>{description}</td>
      <td>₹{price}</td>
      <td className="flex items-center gap-2">
        <FaPencil
          title="edit service"
          className="text-xl bg-[#0155BD] text-white rounded-full p-1 cursor-pointer"
        />
        <FaTrashAlt
          onClick={() => handleDelete(_id)}
          title="Delete service"
          className="text-xl bg-red-700 text-white rounded-full cursor-pointer p-1"
        />
      </td>
    </tr>
  );
};

export default ServiceTable;
