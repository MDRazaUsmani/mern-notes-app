import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard.jsx";
import NoNotesUI from "../components/NoNotesUI.jsx";

const Homepage = () => {
  const [isRateLimited, setIsRateLimited] =
    useState(false); /*both in array set to false */
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // a function with async getNotes function and an array
    const getNotes = async () => {
      try {
        // instead of axios.get we can use the "api" instance that we created in axios.js to avoid writing the baseURL manually everytime
        //const res = await axios.get("http://localhost:5001/api/notes")
        const res = await api.get("/notes");

        //const res = await fetch("http://localhost:5001/api/notes")
        //const data = await res.json() //we can use this or use axios.get/post/etc.
        console.log(res.data);
        setNotes(res.data); //fetching data
        setIsRateLimited(false); // if we can get the data then rate is not limited
      } catch (error) {
        console.log("Error Homepage getNotes ");
        if (error.response?.status === 429) {
          // === is value + type check
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load notes"); // in case it's not a 429 error
        }
      } finally {
        setLoading(false); // either we fetch data or get an error, we'll set loading to false afterwards
      }
    };
    getNotes(); // keep calling this in homepage till conditions are met
  }, []);
  return (
    //returning the ui content
    <div className="min-h-screen">
      {" "}
      {/*div is entire screen */}
      <Navbar />
      {isRateLimited && <RateLimitedUI />}{" "}
      {/*if rate limited then show the RateLimitedUI */}
      <div className="max-w-7xl mx-auto py-4">
        {loading && (
          <div className="text-center text-primary py-10">
            Fetching Notes...
          </div>
        )}
        {/*if loading state is true then show text*/}
        {notes.length === 0 && !isRateLimited && <NoNotesUI />}
        {/* show no notes ui if no notes present */}
        {/*setNotes setter function has the res.data and we map the values to each note. For each note we create a NoteCard component*/}
        {notes.length > 0 && !isRateLimited && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/*have a grid layout of notes where the smallest size shows 1 note, medium shows 2 and large/fullscreen 3 */}
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
