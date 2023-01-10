import { render } from '@testing-library/react'
import Lib from '../lib'
test('Renders library component ', () => {
  const saveData = () => {}

  render(
    <Lib
      imageUrl="https://kruti.com.ua/ckeditor/kcfinder/upload/images/Pride_rocx81_1.jpg"
      saveData={ saveData }
    />,
  )
})
