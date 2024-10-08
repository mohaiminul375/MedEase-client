import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BounceLoader } from "react-spinners";
import ServiceTable from "./ServiceTable";

const AllServices = () => {
  // tanstack query load data from server
  const { data: services, isLoading } = useQuery({
    queryFn: async () => {
      const { data } = await axios.get("https://medease-server.vercel.app/services");
      return data;
    },
    queryKey: ["all-services"],
  });
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <BounceLoader color="#0155BD" />
      </div>
    );
  }
  console.log(services);
  return (
    <section className="mt-8">
      <div>
        <h2 className="text-center text-4xl font-bold text-[#0155BD]">
          Our all Services
        </h2>
      </div>
      <div>
        {services.length == 0 ? (
          <h2 className="text-center  text-red-700 text-2xl">
            No Services Found!
          </h2>
        ) : (
          <div className="mt-5">
            <div className="overflow-x-auto">
              <table className="table border border-y-2">
                {/* head */}
                <thead className="bg-[#0155BD] text-white">
                  <tr>
                    <th>Sl</th>
                    <th>Service Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {services?.map((service, idx) => (
                    <ServiceTable
                      service={service}
                      idx={idx}
                      key={service._id}
                    ></ServiceTable>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AllServices;
