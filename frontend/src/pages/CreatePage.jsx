import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'
import api from '../lib/axios.js'

const CreatePage = () => {
  const [title, setTitle] = useState("");//default state
  const [content, setContent] = useState("");//default state
  const [loading, setLoading] = useState(false); // default false, set to true when we enter data

  const navigate = useNavigate() //react-router function - allows redirect
  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents default refresh on submit - allows testing

    if (!title.trim() || !content.trim()) {
      toast.error("Please fill all fields")
      return
    }

    setLoading(true)
    try {
      await api.post("/notes", {
        title, content
      })
      toast.success("Note Created!")
      navigate("/")
    } catch (error) {
      console.log("Error handleSubmit CreatePage:", error)
      if (error.response?.status === 429) {
        toast.error("Too many requests", {
          duration: 5000,
          icon: "🔥"
        })
      }
      else {
        toast.error("Failed to create note")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-transparent'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <Link to={"/"} className='btn btn-ghost mb-6'>
            <ArrowLeftIcon className='size-5' />
            Back to Notes
          </Link>

          <div className='card bg-base-100/30'>
            <div className='card-body'>
              <h2 className='card-title text-2xl mb-4'>Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className='form-control mb-4'>
                  <label className="label">
                    <span className='label-text'>Title</span>
                  </label>
                  <input type='text' placeholder='Note title' className='input border-primary/60 bg-transparent'
                    value={title}
                    onChange={(eventVal) => setTitle(eventVal.target.value)} /> {/*input type text value is title, on submit, setTitle = value */}
                </div>

                <div className='form-control mb-4'>
                  <label className="label">
                    <span className='label-text'>Content</span>
                  </label>
                  <textarea placeholder='Note Contents' className='textarea border-primary/60 bg-transparent h-32'
                    value={content}
                    onChange={(eventVal) => setContent(eventVal.target.value)} /> {/*input type text value is title, on submit, setTitle = value */}
                </div>
                <div className="card-actions justify-end">
                  <button type='submit' className='btn btn-primary' disabled={loading}>
                    {loading ? "Creating..." : "Create Note"}
                  </button> {/*button disabled if content loading is true*/}
                </div>
              </form>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

export default CreatePage
