import React from "react";

import "./EditorErrors.scss";

const EditorErrors = ({ className, title, errors }) => (
  <div className={`${className} editor-validation`}>
    <h2>{title}</h2>
    {errors.map((item) => (
      <p className="editor-validation__item" key={item.line + item.message}>
        <span className="editor-validation__line">{item.line}</span>
        <span className="editor-validation__message">{item.message}</span>
      </p>
    ))}
  </div>
);

export default EditorErrors;
