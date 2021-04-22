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

function App() {
  return (
          <Router>
      <Switch>
        <AuthRoute  exact path="/app" component={MainMenuPage} />
        <AuthRoute exact path="/students" component={StudentList} />
        <AuthRoute exact path="/addresident" component={AddNewResident} />
        <GuestRoute exact path="/tok" component={login} />
        <Route exact path="/404" component={Error404}/>
        <Redirect to="/404"/>
      </Switch>
    </Router>
  );
}
export default App;
