import axios from "axios";

export default getHotels = (req, res) => {
  const myarguments = res.data.args; // here args will be city passed by user
  console.log("this is my args", myarguments);
  const options = {
    method: "GET",
    url: "https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete",
    params: { text: myarguments.city, languagecode: "en-us" },
    headers: {
      "X-RapidAPI-Key": "1e56a29849msh8d21c58ceaa5123p102b61jsn8f825f919483",
      "X-RapidAPI-Host": "apidojo-booking-v1.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      res.send(error);
    });
};
