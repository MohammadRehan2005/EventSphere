import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/axios";
import { isLoggedIn } from "../utils/auth";
import Navbar from "../components/Navbar";

function LandingPage() {
  let navigate = useNavigate();
  let [events, setEvents] = useState([]);
  let [loading, setLoading] = useState(true);
  let loggedIn = isLoggedIn();

  useEffect(() => {
    let fetchEvents = async () => {
      try {
        let res = await API.get("/event/all-events");
        setEvents(res.data.events);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  let handleBookNow = (eventId) => {
    if (!isLoggedIn()) {
      navigate("/register");
    } else {
      navigate(`/event/${eventId}`);
    }
  };

  let handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
       <Navbar/>
    </div>
  );
}

export default LandingPage;
