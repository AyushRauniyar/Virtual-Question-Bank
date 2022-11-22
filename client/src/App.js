import "./App.css";
// importing components from react-router-dom package
import {
BrowserRouter as Router,
Routes,
Route,
Navigate 

} from "react-router-dom";

// import Home component
import Home from "./components/Home";
// import About component
import Chapter from "./components/Chapter";
// import Deleted from "./components/Deleted";
import Question from "./components/Question";

function App() {

return (
	<>
	{/* This is the alias of BrowserRouter i.e. Router */}
	<Router>
		<Routes>
		{/* This route is for home component
		with exact path "/", in component props
		we passes the imported component*/}
		<Route exact path="/" element={<Home/>} />
			
		{/* This route is for about component
		with exact path "/about", in component
		props we passes the imported component*/}
		<Route path="/chapter/:chapter_id" element={<Chapter/>} />
		<Route path="/question/:question_id" element={<Question/>} />
		{/* <Route path="/delete_chapter/:chapter_id"  element={<Deleted/>}  /> */}
	
			
		{/* This route is for contactus component
		with exact path "/contactus", in
		component props we passes the imported component*/}
		{/* <Route path="/contactus" component={ContactUs} /> */}
			
		{/* If any route mismatches the upper
		route endpoints then, redirect triggers
		and redirects app to home component with to="/" */}
		{/* <Navigate  to="/" /> */}
		</Routes>
	</Router>
	</>
);
}

export default App;
