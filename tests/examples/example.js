const JS_TODO_1 = "TODO: ERROR 1";
const JS_TODO_2 = "// TODO: ERROR 2";
const JS_FIXME_1 = "/* FIXME: ERROR 3";
const JS_FIXME_2 = "* FIXME: ERROR 4";
const JS_FIXME_3 = "FIXME: ERROR 5 */";

function sum(a, b) {
  // TODO: Something 1
  return a + b;
}

// TODO: Something 2

/* FIXME: Something 3 */

/* FIXME: Something 4
 *
 */

/*
 * TODO: Something 5
 */

/*
 *
 * TODO: Something 6 */

/* FIXME: Something 7
 * FIXME: Something 8
 * TODO: Something 9 END */
