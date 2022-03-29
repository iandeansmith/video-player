import { Launch } from '@lightningjs/sdk'
import MainApp from './MainApp.js'

export default function() {
  return Launch(MainApp, ...arguments)
}
