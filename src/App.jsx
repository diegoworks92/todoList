import TodoList from "./components/TodoList/TodoList";

function App() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <h1 className="my-5 text-white" >TODO LIST</h1>
      <TodoList />
    </div>
  );
}

export default App;
