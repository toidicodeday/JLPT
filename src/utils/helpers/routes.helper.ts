// a function to retry loading a chunk to avoid chunk load error for out of date code
export const lazyRetry = (
  componentImport: () => Promise<{
    default: () => JSX.Element
  }>,
): Promise<{ default: React.ComponentType<any> }> => {
  return new Promise((resolve, reject) => {
    // check if the window has already been refreshed
    const hasRefreshed = JSON.parse(
      window.sessionStorage.getItem('retry-lazy-refreshed') || 'false',
    )
    // try to import the component
    componentImport()
      .then(component => {
        window.sessionStorage.setItem('retry-lazy-refreshed', 'false') // success so reset the refresh
        resolve(component)
      })
      .catch(error => {
        if (!hasRefreshed) {
          // not been refreshed yet
          window.sessionStorage.setItem('retry-lazy-refreshed', 'true') // we are now going to refresh
          return window.location.reload() // refresh the page
        }
        reject(error) // Default error behaviour as already tried refresh
      })
  })
}
