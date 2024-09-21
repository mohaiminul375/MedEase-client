import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";

const ServiceTable = ({ service, idx }) => {
  const { service_name, description, price } = service;

//   


  return (
    <tr className="border-b-[#0155BD]">
      <th>{idx + 1}</th>
      <td>{service_name}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td className="flex items-center gap-2">
        <FaPencil
          title="edit service"
          className="text-xl bg-[#0155BD] text-white rounded-full p-1 cursor-pointer"
        />
        <FaTrashAlt
          title="Delete service"
          className="text-xl bg-red-700 text-white rounded-full cursor-pointer p-1"
        />
      </td>
    </tr>
  );
};

export default ServiceTable;
