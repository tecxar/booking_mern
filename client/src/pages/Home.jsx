import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts`);
        console.log("this is data->", res.data);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <Card className="post p-3" key={post.id}>
            <div className="img">
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Card bg={"info"} key={"warning"} className="mb-2 h-full">
                <Card.Header className="py-3 fs-4">
                  Trip To - {post.wentToTrip.toUpperCase()}
                </Card.Header>
                <Card.Body>
                  <Card.Title> </Card.Title>
                  <Card.Text>
                    Your Name - {post.firstName} {post.lastName}
                  </Card.Text>
                  <Card.Text>
                    {" "}
                    Country from - {post.countryFrom.toUpperCase()}
                  </Card.Text>
                  <Card.Text>
                    Stayed in {post.stayedInHotel.toUpperCase()}
                  </Card.Text>
                  <Card.Text>Your Activities</Card.Text>
                  <Card.Text>{getText(post.activities)}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
