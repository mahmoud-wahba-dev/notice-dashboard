window.addEventListener('load', () => {
  setTimeout(() => {
    const path = window.location.pathname
    const pageName = path.substring(path.lastIndexOf('/') + 1)
    const currentLink =
      document.querySelector(`[data-combo-box-output-item] a[href*="/${pageName}"]`) ||
      document.querySelector(`[data-combo-box-output-item] a[href*="${pageName}"]`)

    if (currentLink) {
      currentLink.classList.add('dropdown-active')
      currentLink.closest('[data-combo-box-output-item]').classList.add('combo-box-output-item-highlighted')
    }

    closeAndClearCombobox()
  }, 200)

  // Get scrollbar width
  function getScrollbarWidth() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.setProperty('--bs-scrollbar-width', `${scrollbarWidth}px`)
  }
  getScrollbarWidth()
})

function clearSearchbox(combobox) {
  combobox.element.close('')
  combobox.element.setItemsVisibility()
}

function closeAndClearCombobox() {
  const searchOverlay = HSOverlay.getInstance('#search-modal', true)
  const searchCombobox = HSComboBox.getInstance('#search-modal [data-combo-box]', true)
  const clear = document.querySelector('#searchbox-clear')
  const input = document.querySelector('#search-modal [data-combo-box] input')

  if (!searchOverlay || !searchCombobox || !clear) return

  searchOverlay.element.on('open', () => {
    document.body.style.paddingInlineEnd = 'var(--bs-scrollbar-width)'
  })

  window.addEventListener('keydown', function (evt) {
    if (evt.code === 'KeyK' && (evt.ctrlKey || evt.metaKey)) {
      if (searchOverlay.element && searchOverlay.element.el.classList.contains('open')) return false

      searchOverlay.element.open()
      searchCombobox.element.setCurrent()
    }

    // Global Enter key handler for search modal
    if (evt.key === 'Enter' && searchOverlay.element && searchOverlay.element.el.classList.contains('open')) {
      const highlightedItem =
        document.querySelector('#search-modal [data-combo-box-output-item].combo-box-output-item-highlighted') ||
        document
          .querySelector('#search-modal [data-combo-box-output-item] a:focus')
          ?.closest('[data-combo-box-output-item]') ||
        document.querySelector('#search-modal li[data-combo-box-output-item]:focus-within')

      if (highlightedItem) {
        evt.preventDefault()
        evt.stopPropagation()

        const linkElement = highlightedItem.querySelector('a[href]')
        if (linkElement && linkElement.href && linkElement.href !== '#') {
          searchOverlay.element.close()
          clearSearchbox(searchCombobox)
          setTimeout(() => {
            window.location.href = linkElement.href
          }, 100)
        }
      }
    }
  })
  if (input) {
    input.addEventListener('focus', () => {
      searchCombobox.element.setCurrent()
    })

    input.addEventListener('keydown', evt => {
      if (evt.key === 'ArrowDown') {
        evt.preventDefault()
        if (searchCombobox && searchCombobox.element && typeof searchCombobox.element.next === 'function') {
          searchCombobox.element.next()
        }
      } else if (evt.key === 'ArrowUp') {
        evt.preventDefault()
        if (searchCombobox && searchCombobox.element && typeof searchCombobox.element.previous === 'function') {
          searchCombobox.element.previous()
        }
      }
    })
  }

  if (searchOverlay) {
    document.addEventListener('open.hs.overlay', ({ detail }) => {
      if (detail.payload.getAttribute('data-overlay') === '#search-modal') searchCombobox.element.setCurrent()
      return false
    })

    searchOverlay.element.on('close', () => {
      clearSearchbox(searchCombobox)
      document.body.style.paddingInlineEnd = ''
    })
  }

  clear.addEventListener('click', () => clearSearchbox(searchCombobox))
}
