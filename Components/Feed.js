/* eslint-disable @next/next/no-img-element */
"use client";
import { getAllMovies } from "@/Redux/Features/movieSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Feed = () => {
  const dispatch = useDispatch();

  const { movieDetails, isLoading } = useSelector((state) => state.movie);
  console.log(movieDetails);
  useEffect(() => {
    dispatch(getAllMovies());
  }, [dispatch]);

  const movies = Array.isArray(movieDetails.Search) ? movieDetails.Search : [];
  return (
    <section className="flex flex-col ml-[100px] gap-3 ">
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
          {movies.map((movie) => (
            <Link key={movie.imdbID} href={`/moviedetails/${movie.imdbID}`}>
              <div className="md:p-4 lg:p-5 rounded-xl">
                <button className="btn-movies shadow-sm absolute  mt-4">
                  {movie.Type}
                </button>
                <img
                  className=" h-[286px] w-[320px] object-cover rounded-xl"
                  src={movie.Poster || "/Assets/images.jpeg"}
                  alt="image"
                />

                <h2 className="mt-3 font-semibold text-gray-100 text-xl">
                  {movie.Title || "No Title Available"}
                </h2>
                <p className="text-md mt-3 text-gray-300">{movie.Year}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-white">No movie details available.</div>
      )}
    </section>
  );
};

export default Feed;
