// TODO: Something 1
import React from "react";

export default function ExampleJSX() {
  // TODO: Something 2
  const TODO_1 = "TODO: ERROR 1";
  const TODO_2 = "// TODO: ERROR 2";
  const FIXME_1 = "/* FIXME: ERROR 3";
  const FIXME_2 = "* FIXME: ERROR 4";
  const FIXME_3 = "FIXME: ERROR 5 */";
  return (
    <div>
      {/* FIXME: Something 3 */}
      <h1>Example JSX</h1>
      <p>TODO</p>
      <p>FIXME</p>
      {/* FIXME: Something 4 */}

      {/* TODO: Something 5
       *
       */}

      {/*
       * TODO: Something 6
       */}

      {/*
       *
       * FIXME: Something 7 */}

      {/* FIXME: Something 8
       * TODO: Something 9
       * TODO: Something 10 */}
    </div>
  );
}
