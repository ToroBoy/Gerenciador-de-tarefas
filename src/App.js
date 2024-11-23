import Header from "./components/header";
import ListarTarefa from "./pages/tarefa/ListarTarefa";
import Login from "./pages/Login";
import AnchorTemporaryDrawer from "./components/AnchorTemporaryDrawer";

function App() {
  return (
    <div className="App">
      <AnchorTemporaryDrawer/>
      <Header />
      <Login />
      <ListarTarefa />
    </div>
  );
}

export default App;
