// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import { remote } from 'electron'

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector)
    if (element) {
      element.innerText = text
    }
  }

  replaceText('node-version', process.versions.node)
  replaceText('chrome-version', process.versions.chrome)
  replaceText('electron-version', process.versions.electron)
  replaceText('app-version', remote.getGlobal('appVersion'))
})
