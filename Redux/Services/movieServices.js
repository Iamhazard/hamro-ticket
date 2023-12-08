import axios from "axios";

const API_KEY = "16cb3455";
// const imdbID = "tt3896198";

const getAllMovies = async () => {
  const url = `https://omdbapi.com/?s=avengers&t=new&y=2020&apikey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    if (response.status !== 200) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error("Error in fetching movie details", error);
    throw error;
  }
};

const getMovieDetails = async ({ params }) => {
  console.log("Fetching movie details for imdbID:", imdbID);
  const url = `https://omdbapi.com/?i=${params?.id}&apikey=${API_KEY}`;

  try {
    const response = await axios.get(url);
    console.log(response);
    if (response.status !== 200) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error("Error in fetching movie details", error);
    throw error;
  }
};

const movieServices = {
  getAllMovies,
  getMovieDetails,
};

export default movieServices;
