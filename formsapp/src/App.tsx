import './App.scss';
import { Header } from './UIComponents/Header';


function App() {
  const name: string = "Forms Reactjs App";

  return (
    <div className="App">
     
      <Header name={name} />
      
    </div>
  );
}

export default App;
