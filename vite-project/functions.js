
import _ from "lodash";

function mergeSort(arr, sortby) {
  //Reengineered to sort an Array Of Objects

  //console.log('...')

  if (arr.length <= 1) {
    return arr;
  }

  let middle = Math.floor(arr.length / 2);

  let left = mergeSort(arr.slice(0, middle), sortby);

  let right = mergeSort(arr.slice(middle), sortby);

  let sortedArray = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex][sortby] <= right[rightIndex][sortby]) {
      sortedArray.push(left[leftIndex]);

      leftIndex++;
    } else if (left[leftIndex][sortby] > right[rightIndex][sortby]) {
      sortedArray.push(right[rightIndex]);

      rightIndex++;
    }
  }

  for (let i = leftIndex; i < left.length; i++) {
    sortedArray.push(left[i]);
  }

  for (let i = rightIndex; i < right.length; i++) {
    sortedArray.push(right[i]);
  }

  return sortedArray;
}

function filtering(a, f) {
  return a.filter((item, index, defaultArray) =>
    f === "None" ? item : item.type === f
  );
}

function searching(a, s) {
  console.log(s);
  if (s === "") {
    return a;
  } else {
    let searchResults = a.filter((item) =>
      item.item.toLowerCase().startsWith(s.toLowerCase())
    );
    return searchResults;
  }
}

function sorting(a, so) {
  switch (so) {
    case "price":
      let arr = mergeSort(a, so);
      return arr;
      break;

    case "Newly Added":
      let newArr = [...a];
      _.reverse(newArr);
      return newArr;

    default:
      return a;
      break;
  }
}
export { mergeSort , filtering, searching, sorting };
