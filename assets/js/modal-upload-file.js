window.addEventListener("load", () => {
  ; (function () {
    const { element } = HSFileUpload.getInstance("#modal-file-upload", true)

    element.dropzone.on("error", (file, response) => {
      if (file.size > element.concatOptions.maxFilesize * 1024 * 1024) {
        const filePreview = file.previewElement

        const successEls = filePreview.querySelectorAll("[data-file-upload-file-success]")
        const errorEls = filePreview.querySelectorAll("[data-file-upload-file-error]")
        if (successEls) successEls.forEach(el => (el.style.display = "none"))
        errorEls.forEach(el => (el.style.display = ""))
        HSStaticMethods.autoInit(["tooltip"])
      }
    })
  })()
})
