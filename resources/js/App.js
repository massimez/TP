import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  BrowserRouter,
} from "react-router-dom";
import Error404 from "./pages/404";

//Pages
import MainMenuPage from "./pages/MainMenuPage";
import StudentList from "./pages/StudentList";
import AddNewResident from "./pages/AddNewResident";

function App() {
  return (

          <Router>
      <Switch>
        <Route  exact path="/app" component={MainMenuPage} />
        <Route exact path="/students" component={StudentList} />
        <Route exact path="/addresident" component={AddNewResident} />
        <Route exact path="/404" component={Error404}/>
        <Redirect to="/404"/>
      </Switch>
    </Router>


  );
}

export default App;
