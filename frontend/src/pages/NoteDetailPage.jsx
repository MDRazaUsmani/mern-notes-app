import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const NoteDetailPage = () => {
  const [note, setNote] = useState(null); // nothing by default
  const [loading, setLoading] = useState(true); // load notes by default
  const [saving, setSaving] = useState(false); // don't save by default

  const navigate = useNavigate();
  //const id is variable declaration, const {id} is *object destructuring*, meaning take the value from a particular object with the key id. So we say const {id} = useParams() to get the id of the currently loaded object from db
  //make sure the name 'id' is the same 'id' in the App.jsx route path
  const { id } = useParams();

  useEffect(() => {
    // whenever the id changes, we will run useEffect
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
      } catch (error) {
        if (error.response?.status === 429) {
          console.log("429 from NoteDetailPage fetchNote", error);
          toast.error("Too many requests!");
        } else {
          console.log("Error NoteDetailPage fetchNote", error);
          toast.error("Note fetch failed");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault(); // prevents the delete button from navigating to the detail page
    if (!window.confirm("Delete the Note?")) return; // window popup message, return if cancel is clicked
    //else
    try {
      await api.delete(`/notes/${id}`)
      //show all previous notes and filter by the note ids which is not equal to the one deleted.
      navigate("/")
      toast.success("Note Deleted!")
    } catch (error) {
      console.log("Error in NoteCard handleDelete", error)
      toast.error("Failed to Deleted Note")
    }
  }

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please fill all fields")
      return
    }
    setSaving(true)
    try {
      await api.put(`/notes/${id}`, note)
      toast.success("Note Saved!")
      navigate("/")
    } catch (error) {
      console.log("Error in NoteCard handleSave", error)
      toast.error("Failed to Save Note")
    } finally {
      setSaving(false)
    }
  };

  if (loading) {
    //if loading show spinning load icon
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-transparent">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline">
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>
          <div className="card bg-base-100/30">
            <div className="card-body">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input type='text' placeholder='Note title' className='input border-primary/60 bg-transparent'
                  value={note.title}
                  onChange={(eventVal) => setNote({ ...note, title: eventVal.target.value })} />
              </div>

              <div className='form-control mb-4'>
                <label className="label">
                  <span className='label-text'>Content</span>
                </label>
                <textarea placeholder='Note Contents' className='textarea border-primary/60 bg-transparent h-32'
                  value={note.content}
                  onChange={(eventVal) => setNote({ ...note, content:eventVal.target.value })} /> {/*input type text value is title, on submit, setTitle = value */}
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
                  {saving ? "Saving..." : "Save Changes"}

                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
