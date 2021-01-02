import "./App.scss";
import Header from "./UIComponents/Header";
import Footer from "./UIComponents/Footer";
import CustomForm from "./Components/CustomForm";

function App() {


  return (
    <div className="App">
      <div className="content">
          <Header />
          <CustomForm />
          </div>
          <Footer />
    </div>
  );
}

export default App;
