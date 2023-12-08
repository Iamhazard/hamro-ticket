/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BsFillTicketPerforatedFill } from "react-icons/bs";

const Checkout = ({ params }) => {
  const searchParms = useSearchParams();
  const [movie, setMovie] = useState(null);
  const router = useRouter();

  const moviePrice = parseFloat(searchParms.get("price"));

  const movieQuantity = searchParms.get("quantity");

  const totalAmt = searchParms.get("totalamt");
  const userData = searchParms.get("data");
  const userInfo = userData ? JSON.parse(userData) : null;
  const { name, email, address, country, zip } = userInfo || {};
  const quantityArray = Array.from({ length: movieQuantity });

  const API_KEY = "16cb3455";
  useEffect(() => {
    const fetchMoviesDetails = async () => {
      try {
        const response = await fetch(
          `https://omdbapi.com/?i=${params.id}&apikey=${API_KEY}`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details", error);
      }
    };

    if (params?.id) {
      fetchMoviesDetails();
    }
  }, [params.id]);
  const generateInvoice = (email) => {
    const letter = email.slice(0, 3).toUpperCase();
    const number = Date.now();
    const sku = letter + "-" + number;
    return sku;
  };
  let sku = generateInvoice(email);

  const currentDate = new Date();
  const formattedDate = currentDate.toDateString();

  return (
    <section className="shadow-2xl  ">
      <div className="flex justify-center items-center bg-gray-200 text-gray-900">
        <div className=" relative shadow-2xl p-3 bg-white">
          <div className="checkout_nav flex items-center flex-shrink-0">
            <Link href="/" className="flex gap-2">
              <Image
                className="gap-2"
                src="/Assets/tickticketing.svg"
                alt="logo"
                width={199}
                height={36}
              />
            </Link>
          </div>
          <div className="py-2">
            <div className=" text-xl font-bold">Invoice</div>
            <div className="grid grid-cols-1 gap-5">
              <div className="flex justify-between">
                <span className="text-[#97ABC0] font-inter regular-14">
                  Invoice to {name}
                </span>
                <span className="text-[#97ABC0] font-inter regular-14">
                  Invoive Id:{sku}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#97ABC0] font-inter regular-14">
                  Invoice to {address}
                </span>
                <span className="text-[#97ABC0] font-inter regular-14">
                  order Date:{formattedDate}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#97ABC0] regular-14">{country}</span>
              </div>

              <div className="table_checkout border border-solid border-LightMode-BorderColor  divide-y divide-[#D5DAE1]">
                <table className="min-w-full border border-solid border-LightMode-BorderColor mx-auto">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event Type
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ticket
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Unit Price
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Discount
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {movie?.Title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {movieQuantity}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Nrs.{moviePrice}.00
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">Nrs.0.00</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        Ns.{totalAmt}.00
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="text-right  gap-3">
                  <p className="text-xl font-bold mr-20 mt-5">
                    Invoice Total: Nrs{totalAmt}.00
                  </p>
                </div>
              </div>
            </div>
          </div>
          {quantityArray.map((movie, index) => (
            <div
              key={index}
              className="border-dashed border-t border-b border-l-0 border-r-0 border-gray-900 gap-6 mt-1 my-2 py-2 px-1">
              <div className=" flex w-[592px] h-[250px] bg-white rounded-s p-6 gap-6 shadow-md">
                <div className="h-[122px] w-[110px] rounded-xl ">
                  <img
                    className=" object-cover  md:w-full"
                    src={movie?.Poster || "/Assets/images.jpeg"}
                    alt="image"
                  />
                </div>
                <div className=" flex flex-col gap-3">
                  <h1 className="text-lg font-extrabold font-inter ">
                    {movie?.Title}
                  </h1>
                  <span className="text-[#556987] text-md font-normal">
                    Sat,ap,30 2023 11.30
                  </span>
                  <BsFillTicketPerforatedFill size={24} color="red" />{" "}
                  <span className="ml-1">1x</span>
                  <h3 className="text-black text-lg font-normal">
                    Total: <span className="font-bold">Nrs.10000.00</span>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Checkout;
