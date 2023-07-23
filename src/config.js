import burger from "./img/burger.png";
import taco from "./img/taco.png";
import pizza from "./img/pizza.png";
import noodles from "./img/japanese-noodles.png";
import fries from "./img/french-fries.png";
import soda from "./img/soda.png";
import sandwich from "./img/sandwich.png";

const imgMap = {
  1: burger,
  2: taco,
  3: pizza,
  4: noodles,
  5: fries,
  6: soda,
  0: sandwich,
};

export function getImageMap(x) {
  return imgMap[x];
}
