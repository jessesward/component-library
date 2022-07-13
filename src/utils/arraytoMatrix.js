/**
 *
 * @param {Array} arr the array you want to convert to matrix
 * @param {Number} width the amount of columns you want
 * @returns An array of arrays (grid/map)
 */
export const arrayToMatrix = (arr, width) => {
  return arr.reduce(
    (rows, key, index) =>
      (index % width === 0
        ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows,
    [],
  )
}
