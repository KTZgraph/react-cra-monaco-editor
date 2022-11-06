import "./App.css";
import EditorJson from "./components/EditorJson";
import EditorJavaScript from "./components/EditorJavaScript";
import EditorTypeScript from "./components/EditorTypeScript";
import EditorCSS from "./components/EditorCSS";
import EditorHTML from "./components/EditorHTML";

function App() {
  return (
    <div className="App">
      <EditorJson itemId={1} />
    </div>
  );
}

export default App;
