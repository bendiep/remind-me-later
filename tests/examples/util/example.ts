const TS_TODO_1: string = "TODO: ERROR 1";
const TS_TODO_2: string = "// TODO: ERROR 2";
const TS_FIXME_1: string = "/* FIXME: ERROR 3";
const TS_FIXME_2: string = "* FIXME: ERROR 4";
const TS_FIXME_3: string = "FIXME: ERROR 5 */";

function multiply(a: number, b: number): number {
  // TODO: Something 1
  return a * b;
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
 * TODO: Something 9 [END] */
