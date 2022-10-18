import Layout from "./components/Layout";
import Question from "./components/Question";
import "./App.css";


function App() {
	return (
		<Layout>
			<Question question="This is first question?" creator="0xtestor" reward="10 cUSD"/>
		</Layout>
	);
}

export default App;
