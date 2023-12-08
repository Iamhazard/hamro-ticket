"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Page = ({ params }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const router = useRouter();
  const searchParms = useSearchParams();
  const moviePrice = parseFloat(searchParms.get("price"));
  console.log(moviePrice);
  const movieQuantity = searchParms.get("quantity");
  console.log(movieQuantity);
  const [movie, setMovie] = useState(null);
  const [saveData, setSaveData] = useState({});

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

  const calculateVat = moviePrice * 0.13;
  const calculateTotalAmt = calculateVat + moviePrice;
  console.log(calculateTotalAmt);

  const onSubmitRegister = (data) => {
    const jsonData = JSON.stringify(data);
    setSaveData(jsonData);
    router.push(
      `/checkout/${params.id}?price=${moviePrice}&quantity=${movieQuantity}&totalamt=${calculateTotalAmt}&data=${jsonData}`
    );
  };
  console.log("data", saveData);

  return (
    <section>
      <h1 className="text-[#97ABC0] font-inter regular-14 flex ">
        Home/movieDetails/Orderdetails/Checkout
      </h1>
      <div className="border-t border-dark-mode-border-color"></div>
      <h2 className="font-inter font-semibold text-2xl text-white absolute top-[200px] left-[100px]">
        Order Confirmation
      </h2>
      <div className="mt-[110px] ml-[100] border-t w-[1240px] border-dark-mode-border-color"></div>
      <form
        onSubmit={handleSubmit(onSubmitRegister)}
        className="flex gap-[32px] absolute top-[305px] left-[100px]">
        <div className="flex flex-col w-[808px] gap-8 p-6 border border-1 border-solid border-DarkMode/Border_Color rounded-8 bg-DarkMode/Background_Secondary">
          <h2 className="text-xl font-bold mb-3 text-white">Information</h2>
          <div>
            <label className=" font-inter text-base font-{400} text-white  mb-2">
              Full Name
            </label>
            <input
              className="bg-[#252D3C] border-1  rounded py-3 px-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600 mt-1"
              type="text"
              placeholder="Name"
              name="name"
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && (
              <span className="text-green-600 text-bold">Invalid name</span>
            )}
          </div>
          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="text-base leading-4 text-white">Email*</label>
              <input
                className="bg-[#252D3C] border-1px-solid-DarkMode-BorderColor rounded p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="email"
                placeholder="Your Email"
                name="email"
                {...register("email", {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
              {errors.email && (
                <span className="text-green-600 text-bold">Invalid email</span>
              )}
            </div>
            <div className="w-1/2">
              <label className="text-base leading-4 text-white">Address*</label>
              <input
                className="bg-[#252D3C] border-1px-solid-DarkMode-BorderColor rounded p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="text"
                placeholder="Your Address"
                name="address"
                {...register("address", {
                  required: true,
                })}
              />
              {errors.address && (
                <span className="text-green-600 text-bold">
                  Invalid address
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="text-base leading-4 text-white">Country*</label>
              <input
                className="bg-[#252D3C] border-1px-solid-DarkMode-BorderColor rounded p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="text"
                placeholder="Nepal"
                name="country"
                {...register("country", {
                  required: true,
                })}
              />
              {errors.country && (
                <span className="text-green-600 text-bold">
                  Invalid Country
                </span>
              )}
            </div>
            <div className="w-1/2">
              <label className="text-base leading-4 text-white">State</label>
              <input
                className="bg-[#252D3C] border-1px-solid-DarkMode-BorderColor rounded p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="text"
                placeholder="Your Address"
              />
            </div>
          </div>
          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="text-base leading-4 text-white">City</label>
              <input
                className="bg-[#252D3C] border-1px-solid-DarkMode-BorderColor rounded p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="text"
                placeholder="Your city"
              />
            </div>
            <div className="w-1/2">
              <label className="text-base leading-4 text-white">Zip*</label>
              <input
                className="bg-[#252D3C] border-1px-solid-DarkMode-BorderColor rounded p-4 w-full text-base leading-4 placeholder-gray-600 text-gray-600"
                type="number"
                placeholder="ZIP"
                name="zip"
                {...register("zip", {
                  required: true,
                })}
              />
              {errors.zip && (
                <span className="text-green-600 text-bold">
                  Please insert zip
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="w-[400px] h-[495px] rounded-lg p-6 border gap-4  border-solid ">
          <h2 className="text-xl font-bold mb-4 text-white">
            Checkout Summary
          </h2>

          <div className="border-t border-dark-mode-border-color mb-4"></div>

          <div className="mb-4 gap-4">
            <h2 className="text-white text-xl font-[800]">{movie?.Title}</h2>
            <div className="flex items-center">
              <span className="text-[#97ABC0]">{movie?.Type}</span>
              <small className="text-[#97ABC0] ml-2">
                <li className="text-[#97ABC0]"> Kathmandu, Nepal</li>
              </small>
            </div>
          </div>

          <div className="border-t border-dark-mode-border-color mb-4"></div>

          <div className="grid grid-cols-1 gap-5">
            <div className="flex justify-between">
              <span className="text-[#97ABC0] font-inter regular-14">
                Normal
              </span>
              <span className="text-white regular-14">x{movieQuantity}</span>
              <span className="text-white regular-14_btn">Nrs.350</span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#97ABC0] regular-14">Subtotal</span>
              <span></span>
              <span className="text-white regular-14_btn">
                Nrs.{moviePrice}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-[#97ABC0] regular-14">Tax (13%)</span>
              <span></span>
              <span className="text-white regular-14_btn">{calculateVat}</span>
            </div>

            <div className="flex justify-between ">
              <span className="text-[#97ABC0] regular-14">Discount</span>
              <span></span>
              <span className="text-white regular-14_btn">0</span>
            </div>
          </div>
          <div className="border-t border-dark-mode-border-color mb-4"></div>
          <div>
            <div className="flex justify-between gap-4">
              <span className="text-[#97ABC0] regular-14">Total</span>
              <span className="regular-14 text-white regular-14_btn">
                {calculateTotalAmt}
              </span>
            </div>
          </div>

          <div className="border-t border-dark-mode-border-color mb-4"></div>

          <button className="bg-[#E14658] text-white py-2 rounded-lg  w-full mx-auto shadow-button mt-3 px-8 mb-3">
            Confirm & Pay
          </button>
        </div>
      </form>
    </section>
  );
};

export default Page;
