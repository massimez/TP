import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Error404 from "./pages/404";

//Pages
import MainMenuPage from "./pages/MainMenuPage";
import StudentList from "./pages/StudentList";

function App() {
  return (
    <Router>
      <Switch>
        <Route  exact path="/app/" component={MainMenuPage} />
        <Route exact path="/app/students" component={StudentList} />
        <Route exact path="/app/404" component={Error404}/>
        <Redirect to="/app/404"/>
      </Switch>
    </Router>
  );
}

export default App;
