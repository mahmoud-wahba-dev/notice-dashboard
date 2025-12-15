'use strict'

window.addEventListener("load", () => {
  const range = document.querySelector("#seats-target")
  const rangeInstance = new HSRangeSlider(range)
  const target = document.querySelector("#choose-seats-target")

  range.noUiSlider.on("update", values => {
    // Convert to integer to remove decimal places
    const integerValue = Math.round(parseFloat(values[0]))
    target.innerText = integerValue
  })
})
