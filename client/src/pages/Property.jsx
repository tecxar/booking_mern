import React, { useState, useEffect } from "react";

import axios from "axios";

import { Card, Row, Col, Button, Modal } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

const Property = () => {
  const [city, setCity] = useState("");
  const [hotels, setHotels] = useState([]);
  const [description, setDescription] = useState(null);
  const [destinationId, setDestinationId] = useState("");
  const [arrivalDate, setArrivalDate] = useState(Date.now());
  const [departureDate, setDepartureDate] = useState(Date.now());
  const [guest, setGuest] = useState(0);
  const [room, setRoom] = useState(0);
  const [show, setShow] = useState(false);

  async function getdescriptions(id) {
    setDescription("");
    try {
      console.log("i am here");
      console.log("this is id", id);
      const description = await axios.get(`/posts/description/${id}`);
      console.log(description.data);
      setDescription(description.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClose = () => setShow(false);

  async function getHotelsDetails() {
    try {
      const allHotels = await axios.get("/posts/allHotels", {
        params: {
          destinationId,
          arrivalDate,
          departureDate,
          guest,
          room,
          search_type: "city",
        },
      });
      console.log(
        "these parameters has been sent",
        destinationId,
        arrivalDate,
        departureDate,
        guest,
        room
      );
      console.log(
        "actual result from second api in react",
        allHotels.data.result
      );
      setHotels(allHotels.data.result);
      console.log("this is all hotels", allHotels);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {}, [city, hotels]);
  useEffect(() => {
    if (description) {
      setShow(true);
    }
  }, [description]);

  async function getCity() {
    try {
      const result = await axios.get("/posts/city", {
        params: { city: city },
      });
      setDestinationId(result.data[0].dest_id);
      console.log("this is on react my destination id", destinationId);
      console.log(result.data[0].dest_id);
    } catch (err) {
      console.log(err);
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("this is your city", city);
    console.log("this is all the inputs", {
      city,
      arrivalDate,
      departureDate,
      room,
      guest,
    });
    getHotelsDetails();
  };

  return (
    <div className="add">
      <div className="content">
        <Card>
          <Card.Body>
            <Row>
              <Col sm={2} md={3} lg={4} xl={6}>
                <label>Enter City Name</label>
                <input
                  type="text"
                  placeholder="Enter the city you want to visit"
                  className="inputWidth"
                  onChange={(e) => {
                    setCity();
                    setCity(e.target.value);
                  }}
                  onBlur={getCity}
                />
                <label>Enter Departure Date</label>
                <input
                  type="date"
                  selected={departureDate}
                  className="inputWidth"
                  placeholder="Enter end date"
                  onChange={(e) => setDepartureDate(e.target.value)}
                />
                <label>Enter no of guest</label>
                <input
                  type="number"
                  className="inputWidth"
                  placeholder="No of Guest"
                  onChange={(e) => setGuest(e.target.value)}
                />
              </Col>
              <Col sm={2} md={3} lg={4} xl={6}>
                <label>Arrival date</label>
                <input
                  type="date"
                  selected={arrivalDate}
                  className="inputWidth"
                  placeholder="Enter end date"
                  onChange={(e) => setArrivalDate(e.target.value)}
                />
                <label>Enter no of rooms</label>
                <input
                  type="number"
                  className="inputWidth"
                  placeholder="No of room you need"
                  onChange={(e) => setRoom(e.target.value)}
                />
              </Col>
            </Row>
            <div className="buttons">
              <Button className="px-4 py-2" size="lg" onClick={handleClick}>
                Search
              </Button>
            </div>
          </Card.Body>
        </Card>
        {hotels.length > 0 && (
          <div className="home">
            <div className="posts">
              {hotels.map((post) => (
                <Card className="post p-3" key={post.hotel_id}>
                  <div className="img">
                    <img src={post.main_photo_url} alt="" />
                  </div>
                  <div className="content">
                    <Card bg={"info"} key={"warning"} className="mb-2 h-full">
                      <Card.Header className="fs-5 py-3">
                        {post.hotel_name}
                      </Card.Header>
                      <Card.Body>
                        <Card.Text>
                          <div className="d-flex justify-content-between align-items-center">
                            <span>city name: </span>
                            <span>{post.city} </span>
                          </div>
                        </Card.Text>
                        <Card.Text>
                          <div className="d-flex justify-content-between align-items-center">
                            <span className="w-50">Hotel Address: </span>
                            <span>{post.address} </span>
                          </div>
                        </Card.Text>
                        <Card.Text>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <p className="m-0">Arrival date</p>
                              <p className="m-0">{arrivalDate}</p>
                            </div>
                            <div>
                              <p className="m-0">Departure date</p>
                              <p className="float-end m-0">{departureDate}</p>
                            </div>
                          </div>
                        </Card.Text>
                        <Card.Text>
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <p className="m-0">Country</p>
                              <p className="m-0">{post.country_trans}</p>
                            </div>
                            <div>
                              <p className="m-0">Currency code</p>
                              <p className="float-end m-0">
                                {post.currency_code}
                              </p>
                            </div>
                          </div>
                        </Card.Text>

                        <Card.Text> hotel_id - {post.hotel_id}</Card.Text>
                        <Card.Text className="m-auto text-center">
                          <Button
                            variant="primary"
                            className="px-4 fs-6"
                            onClick={(e) => getdescriptions(post.hotel_id)}
                          >
                            More Details
                          </Button>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
      <Modal centered size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Hotel description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="fs-5">{description}</div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Property;
