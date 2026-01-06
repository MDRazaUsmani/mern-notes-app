import React from 'react'
import {Link} from 'react-router'
import {PlusIcon} from 'lucide-react'

const Navbar = () => {
  return <header className= "bg-base-300 border-b border-base-content/10"> {/* hover to see desc on each command - bas color, bottom border, border color is base/10 opacity*/}
    <div className = "mx-auto max-w-6xl p-4">
        <div className ="flex items-center justify-between"> {/*flexbox with centered items and both items have a space in between */}
            <h1 className ="text-3xl font-bold text-primary font-mono tracking-tighter">BruhNotes</h1> {/*left item */}
            <div className = "flex items-center gap-4">
                <Link to={"/create"} className = "btn btn-primary">
                <PlusIcon className ="size-5"/> {/*same as writing h-5 w-5 */}
                <span>New Note</span>
                </Link>
            </div>{/*right item */}
        </div>
    </div>
  </header>;
};

export default Navbar
