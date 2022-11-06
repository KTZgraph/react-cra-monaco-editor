import { useEffect, useState, useCallback, useRef } from "react";
import Editor, { useMonaco, loader, DiffEditor } from "@monaco-editor/react";

import EditorErrors from "./EditorErrors";
import "./Editor.scss";

const URL = "https://jsonplaceholder.typicode.com/todos/";

const EditorJson = ({ itemId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const editorRef = useRef();
  const [hasError, setHasError] = useState(false);

  const [validationError, setValidationError] = useState([]);

  const fetchJsonFileThunk = useCallback(async () => {
    try {
      // const apiText = await getFileJsonAPI(`${URL}${itemId}`);
      const apiText = JSON.stringify({ a: 1, b: 2 });
      setCode(apiText);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [itemId]);

  useEffect(() => {
    fetchJsonFileThunk();
  }, [fetchJsonFileThunk]);

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  function handleEditorValidation(markers) {
    setValidationError([]);
    setHasError(false);
    console.log("handleEditorValidation");

    console.log(
      "markers:",
      markers.map(
        ({ message, startLineNumber, startColumn, endLineNumber, endColumn }) =>
          `${message} [${startLineNumber}:${startColumn}-${endLineNumber}:${endColumn}]`
      )
    );

    markers.forEach((marker) => {
      setHasError(true);
      setValidationError((prevState) =>
        [
          ...prevState,
          { line: marker.startLineNumber, message: marker.message },
        ].sort((a, b) => {
          if (a.line < b.line) return -1;
          return 1;
        })
      );
    });
  }

  function handleEditorChange(value, event) {
    setCode(value);
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!code) return null;

  return (
    <section className="code-editor">
      <div className="code-editor__container">
        <Editor
          className="code-editor__editor"
          defaultLanguage="json"
          language="json"
          theme="vs-dark"
          width={"50vw"}
          height={"70vh"}
          value={code}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          onValidate={handleEditorValidation}
        />
        <EditorErrors
          className="code-editor__errors"
          title="JSON validation error"
          errors={validationError}
        />
      </div>
    </section>
  );
};

export default EditorJson;
