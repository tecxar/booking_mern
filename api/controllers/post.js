import { db } from "../db.js";
import * as dotenv from "dotenv";
dotenv.config();
// console.log(dotenv);
import axios from "axios";

export const getDescription = (req, res) => {
  const descId = req.params.id;

  const options = {
    method: "GET",
    url: process.env.descriptionurl,
    params: {
      hotel_ids: descId,
    },
    headers: {
      "X-RapidAPI-Key": process.env.rapidAPI,
      "X-RapidAPI-Host": process.env.rapidAPIHOST,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.send(response.data[0].description);
    })
    .catch(function (error) {
      console.error(error);
    });
};

export const getHotels = (req, res) => {
  const myarguments = req.query.city;
  const options = {
    method: "GET",
    url: process.env.autocompleteurl,
    params: { text: myarguments, languagecode: "en-us" },
    headers: {
      "X-RapidAPI-Key": process.env.rapidAPI,
      "X-RapidAPI-Host": process.env.rapidAPIHOST,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      res.send("this is the error from first api", error);
    });
};

export const allHotelDetails = (req, res) => {
  const { arrivalDate, destinationId, departureDate, guest, room } = req.query;

  const options = {
    method: "GET",
    url: process.env.propertylisturl,
    params: {
      offset: "0",
      arrival_date: arrivalDate,
      departure_date: departureDate,
      guest_qty: guest,
      dest_ids: destinationId,
      room_qty: room,
      search_type: "city",
    },
    headers: {
      "X-RapidAPI-Key": process.env.rapidAPI,
      "X-RapidAPI-Host": process.env.rapidAPIHOST,
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.send(response.data);
    })
    .catch(function (error) {
      console.error("there is some error in second api call", error);
    });
};

export const getPosts = (req, res) => {
  const q = "SELECT * FROM blog ORDER BY id DESC";

  db.query(q, (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const addPost = (req, res) => {
  const q =
    "INSERT INTO blog(`firstName`, `lastName`, `countryFrom`, `wentToTrip`, `date`,`stayedInHotel`,`activities`,`img`) VALUES (?)";

  const values = [
    req.body.firstName,
    req.body.lastName,
    req.body.countryFrom,
    req.body.wentToTrip,
    req.body.date,
    req.body.stayedInHotel,
    req.body.activities,
    req.body.img,
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.log(err);
    }
    return res.status(200).json(data);
  });
};
