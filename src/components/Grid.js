import { getImageMap } from "../config";
import "./grid.css";

function Grid({ grid, handleCellClick, processingImage }) {
  /*const imgMap = {
    1: burger,
    2: taco,
    3: pizza,
    4: noodles,
    5: fries,
    6: soda,
    0: sandwich,
    "-1": processingImage,
  };*/

  const renderedGrid = grid.map((row, index) => {
    let renderedRow = getRow(row, index);
    return <tr key={Math.random() * Math.random()}>{renderedRow}</tr>;
  });

  function getRow(row, rowIndex) {
    let flag = true;
    const renderedRow = row.map((num, index) => {
      return (
        <td key={Math.random() * Math.random()}>
          <div
            onClick={() => handleCellClick(grid, rowIndex, index, num, flag)}
          >
            <img
              className="item-logo"
              src={num !== -1 ? getImageMap(num) : processingImage}
              alt="img"
            />
          </div>
        </td>
      );
    });
    return renderedRow;
  }

  return (
    <div>
      <table className="table-box">
        <tbody>{renderedGrid}</tbody>
      </table>
    </div>
  );
}

export default Grid;
