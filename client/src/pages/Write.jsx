import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const [activities, setActivities] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [countryFrom, setCountryFrom] = useState("");
  const [wentToTrip, setwentToTrip] = useState("");
  const [stayedInHotel, setStayedInHotel] = useState("");
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      await axios.post(`/posts/`, {
        firstName,
        lastName,
        countryFrom,
        wentToTrip,
        activities,
        stayedInHotel,
        img: file ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <Card>
          <Card.Body>
            <Row>
              <Col sm={2} md={3} lg={4} xl={6}>
                <input
                  type="text"
                  placeholder="first Name"
                  className="inputWidth"
                  onChange={(e) => setfirstName(e.target.value)}
                />
                <input
                  type="text"
                  className="inputWidth"
                  placeholder="country From"
                  onChange={(e) => setCountryFrom(e.target.value)}
                />
                <input
                  type="text"
                  className="inputWidth"
                  placeholder="stayed In Hotel"
                  onChange={(e) => setStayedInHotel(e.target.value)}
                />
              </Col>
              <Col sm={2} md={3} lg={4} xl={6}>
                <input
                  type="text"
                  className="inputWidth"
                  placeholder="last Name"
                  onChange={(e) => setlastName(e.target.value)}
                />

                <input
                  type="text"
                  className="inputWidth"
                  placeholder="went To"
                  onChange={(e) => setwentToTrip(e.target.value)}
                />
                <Form.Group controlId="file" className="mb-3">
                  <Form.Control
                    type="file"
                    size="lg"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={activities}
            placeholder="write about your activities"
            onChange={setActivities}
          />
        </div>
        <div className="buttons">
          <Button className="px-4 py-2" size="lg" onClick={handleClick}>
            Publish
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Write;
