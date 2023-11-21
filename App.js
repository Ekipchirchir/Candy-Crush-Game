import { useEffect, useState } from "react"
import ScoreBoard from "./components/ScoreBoard";
import blueCandy from './Images/blue-candy.png'
import greenCandy from './Images/green-candy.png'
import orangeCandy from './Images/orange-candy.png'
import purpleCandy from './Images/purple-candy.png'
import redCandy from './Images/red-candy.png'
import yellowCandy from './Images/yellow-candy.png'
import blank from './Images/blank.png'





const width = 8
const candyColors = [
    blueCandy,
    orangeCandy,
    purpleCandy,
    redCandy,
    yellowCandy,
    greenCandy
]



const App=() =>{
    const [ currentColorArrangemnt, setCurrentColorArrangememt] = useState([])
    const [ squareBeingDragged, setSquareBeingDragged] = useState(null)
    const [ squareBeingReplaced, setSquareBeingReplaced] = useState(null)
    const [ scoreDisplay, setScoreDisplay] = useState(0)

      const checkForColumnOfFour =() => {
        for (let i = 0; i <= 39; i ++){
          const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
          const decidedColor = currentColorArrangemnt[i]
          const isBlank =  currentColorArrangemnt[i] === blank

          if (columnOfFour.every(square => currentColorArrangemnt[square] === decidedColor && !isBlank)){
              setScoreDisplay((score) => score + 4)
            columnOfFour.forEach(square => currentColorArrangemnt[square]= blank)
              return true
          }
        }
      }

      const checkForRowOfFour =() => {
        for (let i = 0; i < 64; i ++){
          const rowOfFour = [i, i + 1, i + 2, i + 3]
          const decidedColor = currentColorArrangemnt[i]
          const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 53, 54, 55, 62, 63, 64]
          const isBlank =  currentColorArrangemnt[i] === blank

          if (notValid.includes(i)) continue

          if (rowOfFour.every(square => currentColorArrangemnt[square] === decidedColor && !isBlank)){
              setScoreDisplay((score) => score + 4)
            rowOfFour.forEach(square => currentColorArrangemnt[square]= blank)
              return true
          }
        }
      }


      const checkForColumnOfThree =() => {
        for (let i = 0; i <= 47; i ++){
          const columnOfThree = [i, i + width, i + width * 2]
          const decidedColor = currentColorArrangemnt[i]
          const isBlank =  currentColorArrangemnt[i] === blank

          if (columnOfThree.every(square => currentColorArrangemnt[square] === decidedColor && !isBlank)){
              setScoreDisplay((score) => score + 3)
            columnOfThree.forEach(square => currentColorArrangemnt[square]= blank)
              return true
          }
        }
      }

      const checkForRowOfThree =() => {
        for (let i = 0; i < 64; i ++){
          const rowOfThree = [i, i + 1, i + 2]
          const decidedColor = currentColorArrangemnt[i]
          const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 54, 55, 63, 64]
          const isBlank =  currentColorArrangemnt[i] === blank

          if (notValid.includes(i)) continue

          if (rowOfThree.every(square => currentColorArrangemnt[square] === decidedColor && !isBlank)){
              setScoreDisplay((score) => score + 3)
            rowOfThree.forEach(square => currentColorArrangemnt[square]= blank)
              return true
          }
        }
      }

      const moveIntoSquareBelow = () => {
          for (let i = 0; i < 55 ; i++) {
              const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
              const isFirstRow = firstRow.includes(i)

          if (isFirstRow && currentColorArrangemnt[i] === blank) {
              let randomNumber = Math.floor(Math.random() * candyColors.length)
              currentColorArrangemnt[i] = candyColors[randomNumber]
          }
              if((currentColorArrangemnt[i + width]) === blank){
                  currentColorArrangemnt[i + width] = currentColorArrangemnt[i]
                  currentColorArrangemnt[i] = blank
              }

    }
      }

      console.log(scoreDisplay)

      const dragStart = (e) => {
          setSquareBeingDragged(e.target)
      }
    const dragDrop = (e) => {
        setSquareBeingReplaced(e.target)
    }
    const dragEnd = (e) => {


        const squareBeingDraggedId = parseInt(squareBeingDragged.getAttribute('data-id'))
        const squareBeingReplacedId = parseInt(squareBeingReplaced.getAttribute('data-id'))

        currentColorArrangemnt[squareBeingReplacedId] = squareBeingDragged.getAttribute('src')
        currentColorArrangemnt[squareBeingDraggedId] = squareBeingReplaced.getAttribute('src')


        const validMoves = [
            squareBeingDraggedId -1 ,
            squareBeingDraggedId -width,
            squareBeingDraggedId + 1,
            squareBeingDraggedId + width
        ]

        const validMove = validMoves.includes(squareBeingReplacedId)

        const isAColumnOfFour = checkForColumnOfFour()
        const isARowOfFour = checkForRowOfFour()
        const isAColumnOfThree = checkForColumnOfThree()
        const isARowOfThree = checkForRowOfThree()

        if(squareBeingReplacedId && validMove && (isARowOfThree || isARowOfFour || isAColumnOfThree || isAColumnOfFour)){
            setSquareBeingDragged(null)
            setSquareBeingReplaced(null)
        } else {
            currentColorArrangemnt[squareBeingReplacedId] = squareBeingReplaced.getAttribute('src')
            currentColorArrangemnt[squareBeingDraggedId] = squareBeingDragged.getAttribute('src')
            setCurrentColorArrangememt([...currentColorArrangemnt])
        }
    }


      const createBoard = () => {
        const randomColorArrangement = []
        for (let i = 0; i < width * width; i++) {
          const randomNumberFrom0to5 = Math.floor(Math.random() * candyColors.length)
           const randomColor = candyColors[randomNumberFrom0to5]
           randomColorArrangement.push(randomColor)
        }
        setCurrentColorArrangememt(randomColorArrangement)
      }
      useEffect(()=>{
        createBoard()
      }, [])    
                

      useEffect(()=>{
        const timer =setInterval (() =>{
          checkForColumnOfFour()
          checkForRowOfFour()
          checkForColumnOfThree()
          checkForRowOfThree()
          moveIntoSquareBelow()
          setCurrentColorArrangememt([...currentColorArrangemnt]) //Passing the new currentColorArrangement will not work. So you must use the spread operator.
        }, 100)
        return () => clearInterval(timer)
      }, [checkForColumnOfFour, checkForRowOfFour, checkForColumnOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColorArrangemnt])
      


  return (
    <div className="app">
       <div className="game">
          {currentColorArrangemnt.map((candyColor, index) =>(
            <img
               key = {index}
               src = {candyColor}
               alt = {candyColor}
               data-id = {index}
               draggable = {true}
               onDragStart = {dragStart}
               onDragOver = {(e) => e.preventDefault()}
               onDragEnter = {(e) => e.preventDefault()}
               onDragLeave = {(e) => e.preventDefault()}
               onDrop = {dragDrop}
               onDragEnd = {dragEnd}
            />
          ))}
       </div>
        <ScoreBoard score = {scoreDisplay} />
    </div>
  )
}

export default App;
