import NewPost from "./components/posts/NewPost"
import PostListDashboard from "./components/posts/PostListDashboard"

function App() {

  return (
    <div className="container bg-white mx-auto rounded h-screen">
      <p className="text-3xl text-blue-900 text-center font-bold">Dashboard</p>
      <NewPost/>
      <PostListDashboard/>
    </div>
  )
}

export default App
