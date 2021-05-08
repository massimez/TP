import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
} from "react-router-dom";

//Pages Imports
import MainMenuPage from "./pages/MainMenuPage";
import StudentList from "./pages/StudentList";
import AddNewResident from "./pages/AddNewResident";
import login from "./pages/login";
import Error404 from "./pages/404";
import GuestRoute from "./components/GuestRoute";
import AuthRoute from "./components/AuthRoute";
import Rooms from "./pages/Rooms";
import Register from "./pages/Register";
import Admin from "./pages/Admin";


function App() {
  return (
          <Router>
      <Switch>
        <AuthRoute  exact path="/" component={MainMenuPage} />
        <AuthRoute  exact path="/app" component={MainMenuPage} />
        <AuthRoute exact path="/students" component={StudentList} />
        <AuthRoute exact path="/addresident" component={AddNewResident} />
        <AuthRoute exact path="/rooms" component={Rooms} />
        <AuthRoute exact path="/admin" component={Admin} />
        <AuthRoute
          exact
          path="/admin/edit/:id"
          render={props => {
            return <UserEditForm {...props} editMode={true} />;
          }}
        />
        <GuestRoute exact path="/login" component={login} />
        <GuestRoute exact path="/register" component={Register} />
        <Route exact path="/404" component={Error404}/>
        <Redirect to="/404"/>
      </Switch>
    </Router>
  );
}
export default App;
