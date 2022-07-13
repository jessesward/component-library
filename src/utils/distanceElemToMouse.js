/**
 *
 * @param {Object} elem
 * @param {Number} mouseX the mouse clientX
 * @param {Number} mouseY the mouse clientY
 * @returns the distance between the center of an element and the mouse
 */
export const distanceElemToMouse = (elem, mouseX, mouseY) => {
  const boundingBox = elem.getBoundingClientRect()
  return Math.floor(
    Math.sqrt(
      Math.pow(mouseX - (boundingBox.x + boundingBox.width / 2), 2) +
        Math.pow(mouseY - (boundingBox.y + boundingBox.height / 2), 2),
    ),
  )
}
