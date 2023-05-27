// import Display from "./features/nodes/Display";
import { Routes, Route } from "react-router-dom";
import Layout from "./component/Layout";
import Public from "./component/Public";
import Login from "./features/auth/Login";
import UserDashLayout from "./component/UserDashLayout";
import UserProfile from "./features/users/UserProfile";
import AddNode from "./features/nodes/AddNode";
import Lists from "./features/nodes/Lists";
import Logout from "./features/auth/Logout";
import Missing from "./component/Missing";
import RequireAuth from "./component/RequireAuth";
import NodeWithNexus from "./features/nodes/NodeWithNexus";


function App() {

  return (
    <Routes>
      {/* Layout component has the closing tag */}
      {/* for rendering children */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        {/* protected */}
        <Route element={<RequireAuth />}>
          <Route path="user-dash" element={<UserDashLayout />} >
            <Route index element={<UserProfile />} />
            <Route path="nodes" >
              <Route path=":userId/" element={<Lists />} />
              <Route path="detail/:id" element={<NodeWithNexus />} />
              <Route path="add" element={<AddNode />} />
            </Route>
            <Route path="logout" element={<Logout />} />
          </Route>
        </Route>

        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
