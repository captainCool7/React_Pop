import { useEffect, useState } from "react";
import cross from "./img/cross.png";
import correct from "./img/correct.png";
import Grid from "./components/Grid";
import { getImageMap } from "./config";
import "./components/grid.css";
import boy from "./img/boy.png";

function App() {
  const [grid, setGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [status, setStatus] = useState(false);
  const [lives, setLives] = useState(3);
  const [target, setTarget] = useState(0);
  const [targetCount, setTargetCount] = useState(0);
  const [decision, setDecision] = useState(false);

  useEffect(() => {
    console.log("rendering the grid");
    getTargetValues();
    console.log("grid effect : done");
  }, [grid]);

  useEffect(() => {
    //console.log("target: rendering");
    //console.log("target  : : " + target);
    //console.log("targetCount  : : " + targetCount);
    //console.log("target effect : done");
  }, [target, targetCount]);

  let desc = "Find the food in the grid with exact number of connection";

  function giveRandomNumber(x) {
    return Math.floor(Math.random() * x);
  }

  async function setStatusRefill() {
    setStatus((prevstate) => !prevstate);
    console.log(decision);
    await new Promise((r) => setTimeout(r, 1200));
    console.log("over");
    console.log(decision);
    setStatus((prevstate) => !prevstate);
    console.log(status);
    refillGrid();
  }

  function getTargetValues() {
    let rowIndex = giveRandomNumber(grid.length);
    let columnIndex = giveRandomNumber(grid.length);
    let gridCopy = JSON.parse(JSON.stringify(grid));
    let flag = false;
    console.log(grid.length);
    if (grid.length > 0) {
      var newTarget = grid[rowIndex][columnIndex];
      setTarget(newTarget);
      console.log(rowIndex, columnIndex, newTarget, flag);
      console.log("back");
      let countValue = moveInGrid(
        gridCopy,
        rowIndex,
        columnIndex,
        newTarget,
        flag
      );
      setTargetCount(countValue);
    }
    console.log("num is: " + target + " count is: " + targetCount);
  }

  function handleCellClick(gridValue, rowIndex, columnIndex, num, flag) {
    if (lives > 0) {
      setDecision(false);
      let value = moveInGrid(gridValue, rowIndex, columnIndex, num, flag);
      if (value !== targetCount || num !== target) {
        setLives(lives - 1);
        setDecision(true);
      }
      if (value > 0) {
        setGrid(grid);
        setScore(score + value);
      }
      setStatusRefill();
    }
  }

  function moveInGrid(gridValue, rowIndex, columnIndex, num, flag) {
    if (gridValue[rowIndex][columnIndex] !== num) {
      return 0;
    }
    let count = 1;
    console.log("flag is: " + flag + " :: " + rowIndex + "" + columnIndex);
    gridValue[rowIndex][columnIndex] = -1;
    const gridLength = grid.length;
    if (rowIndex + 1 < gridLength) {
      count += moveInGrid(gridValue, rowIndex + 1, columnIndex, num, flag);
    }
    if (rowIndex - 1 > -1) {
      count += moveInGrid(gridValue, rowIndex - 1, columnIndex, num, flag);
    }
    if (columnIndex + 1 < gridLength) {
      count += moveInGrid(gridValue, rowIndex, columnIndex + 1, num, flag);
    }
    if (columnIndex - 1 > -1) {
      count += moveInGrid(gridValue, rowIndex, columnIndex - 1, num, flag);
    }
    console.log(rowIndex, columnIndex, num, count);
    return count;
  }

  function generateGrid(x) {
    const generatedGrid = [];
    for (let i = 0; i < x; i++) {
      let row = [];
      for (let j = 0; j < x; j++) {
        row.push(giveRandomNumber(x));
      }
      generatedGrid.push(row);
    }
    setGrid(generatedGrid);
  }

  function refillGrid() {
    let copyGrid = JSON.parse(JSON.stringify(grid));
    const columnLength = copyGrid.length;
    for (let i = 0; i < columnLength; i++) {
      let arr = [];
      let countZero = 0;
      for (let j = 0; j < columnLength; j++) {
        let num = copyGrid[j][i];
        if (num === -1) {
          countZero++;
        }
        arr.push(num);
      }
      //sort 0 and num array
      //fill arr of 0
      if (countZero > 0) {
        var numArray = [];
        let pointZero = 0;
        while (pointZero < countZero) {
          numArray.push(giveRandomNumber(columnLength));
          pointZero++;
        }
        for (let x of arr) {
          if (x > -1) numArray.push(x);
        }
        for (let j = 0; j < columnLength; j++) {
          copyGrid[j][i] = numArray[j];
        }
      }
    }
    console.log(copyGrid);
    setGrid(copyGrid);
  }

  if (grid.length === 0) {
    generateGrid(7);
  }

  return (
    <div className="main_content">
      <div className="main_column">
        <p className="main_grid_block">Make my Food 🥺</p>
        <img className="side_image" src={boy} alt="cook_boy" />
      </div>
      <div className="main_column_grid">
        <div className="main_grid_bar">
          <Grid
            grid={grid}
            handleCellClick={handleCellClick}
            target={target}
            targetCount={targetCount}
            processingImage={decision ? cross : correct}
          />
        </div>
      </div>
      <div className="main_column">
        <p className="main_grid_block">Hearts: {lives}</p>
        <p className="main_grid_block">
          <img className="item-logo" src={getImageMap(target)} alt="img" /> X
          {targetCount}
        </p>
        <p className="main_grid_block">
          {(status && "Refreshing Grid") || desc}
        </p>
        <p className="main_grid_block">Score is: {score}</p>
      </div>
    </div>
  );
}

export default App;
