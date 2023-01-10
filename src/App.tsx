import React from 'react'
import AreaSelectContainer from '../lib'
import { IAreaData } from '../lib/types'

function App() {
  const saveData = (data: IAreaData) => {
    console.log('TOP level save data handler :: ', data)
  }

  return (
    <div>
      <AreaSelectContainer
        width={ 1000 }
        height={ 800 }
        imageUrl="https://kruti.com.ua/ckeditor/kcfinder/upload/images/Pride_rocx81_1.jpg"
        borderColor={ 'white' }
        saveData={ saveData }
      />
    </div>
  )
}

export default App
