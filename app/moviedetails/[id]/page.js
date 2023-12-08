"use client";
/* eslint-disable @next/next/no-img-element */
import { CiCalendarDate } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoLocationOutline } from "react-icons/io5";

import { useRouter } from "next/navigation";

import {
  decrementQuantity,
  incrementQuantity,
  setQuantity,
} from "@/Redux/Features/calcSlice";
import Link from "next/link";

const Page = ({ params }) => {
  const router = useRouter;

  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);

  const quantity = useSelector((state) => state.calc.quantity);
  const price = useSelector((state) => state.calc.price);

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

  const handleIncrement = () => {
    dispatch(incrementQuantity());
  };
  const handleDecrement = () => {
    dispatch(decrementQuantity());
  };
  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value) || 1;
    dispatch(setQuantity(newQuantity));
  };
  if (!movie) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <section className="px-25 max-w-[1440px] mx-auto mt-48">
      <div className="flex flex-row gap-3">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          <div key={movie.imdbID} className=" md:p-4 lg:p-5 rounded-xl">
            <button className="btn-movies shadow-sm absolute mt-9 ml-[190] gap-2 py-2 px-3">
              {movie.Type}
            </button>

            <img
              className="h-[286px] w-full object-cover rounded-xl  md:w-full"
              src={movie.Poster || "/Assets/images.jpeg"}
              alt="image"
            />

            <h2 className="mt-3 font-semibold text-gray-100 text-xl md:text-lg">
              {movie.Title || "No Title Available"}
            </h2>
            <p className="text-md mt-3 text-gray-300">{movie.Year}</p>
            <p className="text-md mt-4 text-gray-300">
              {movie.Released || "no relseased date"}
            </p>
            <p className="text-md mt-5 text-gray-300">{movie.Genre}</p>
          </div>
        </div>

        <div className="cardDetails overflow-hidden p-6">
          <h1 className="font-inter font-semibold text-2xl leading-8 text-white ">
            Event Details
          </h1>
          <div className="flex items-center p-6">
            <CiCalendarDate
              className="mr-2"
              color="white"
              size={25}
              style={{ width: "48px", height: "48px", borderRadius: "50%" }}
            />
            <div>
              <h2 className="text-white text-xl mb-2">Date and Time</h2>
              <p className="text-white">Sun, Dec 30, 2023 9:30 AM.</p>
            </div>
          </div>

          <div className="border-t border-dark-mode-border-color"></div>

          <div className="flex items-center p-6">
            <IoLocationOutline
              className="mr-2"
              color="white"
              size={25}
              style={{ width: "48px", height: "48px", borderRadius: "50%" }}
            />
            <div>
              <h2 className="text-white text-xl mb-2">Date and Time</h2>
              <p className="text-white">Sun, Dec 30, 2023 9:30 AM.</p>
              <span className="text-[#E14658]">View on Map</span>
            </div>
          </div>

          <div className="border-t border-dark-mode-border-color"></div>

          <h1 className="font-inter font-semibold text-2xl leading-8 p-6 text-white ">
            Select Tickets
          </h1>
          <div className="justify-between ml-8">
            <small className=" font-inter text-4 text-white mb-2">
              1x Ticket(s)
            </small>
            <p className="font-inter font-semibold text-6 leading-8 text-white">
              Nrs.350.00
            </p>
          </div>
          <div className="flex flex-col items-center justify-end flex-grow rounded-l mb-7">
            <div className="flex items-center space-x-2 ml-auto">
              <button
                type="button"
                onClick={handleDecrement}
                data-action="decrement"
                className="bg-gray-600 text-white w-6 h-6 rounded-l">
                <span className="m-auto text-xs font-thin">−</span>
              </button>
              <input
                type="number"
                className="font-bold text-white h-7 w-9 text-lg px-1 py-1 bg-transparent text-center appearance-none"
                value={quantity}
                readOnly
                onChange={handleQuantityChange}
              />

              <button
                type="button"
                onClick={handleIncrement}
                data-action="increment"
                className="bg-red-500 text-white w-6 h-6 rounded-l">
                <span className="m-auto text-xs font-thin">+</span>
              </button>
            </div>
            <Link
              href={`/orderdetails/${params.id}?price=${price}&quantity=${quantity}`}>
              <button
                type="button"
                className="bg-[#E14658] text-white py-2 rounded-lg  w-full mx-auto shadow-button mt-3 px-8 mb-3">
                Check out for Nrs.{price}.00
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
