import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import NewPost from "./components/posts/NewPost"
import PostListDashboard from "./components/posts/PostListDashboard"

function App() {

  return (
    <>
      <ToastContainer closeOnClick draggable closeButton={false} theme="colored" autoClose={1500} hideProgressBar/>
      <div className="container bg-white mx-auto rounded h-screen">
        <p className="text-3xl text-blue-900 text-center font-bold">Dashboard</p>
        <NewPost/>
        <PostListDashboard/>
      </div>
    </>
    
  )
}

export default App
