import Tree from "./Tree.js";

const array = [
  84, 27, 84, 1, 27, 63, 20, 81, 89, 19, 10, 42, 8, 29, 68, 59, 82, 4, 51, 22, 21, 59, 97,
  29, 47, 43, 93, 64, 67, 1, 37, 60, 29, 31, 6, 19, 14, 45, 49, 53, 74, 12, 2, 27, 18, 0,
  83, 63, 70, 6, 62, 79, 96, 28, 86, 15, 38, 14, 89, 30, 95, 10, 96, 47, 96, 62, 43, 30,
  29, 90, 66, 63, 38, 15, 13, 1, 79, 2, 60, 22, 18, 83, 85, 14, 36, 92, 55, 60, 52, 91,
  62, 17, 46, 99, 96, 64, 10, 62, 61, 19, 3,
];

const tree = new Tree();

tree.buildTree(array);
console.log("depth:", tree.depth(20));
console.log("height:", tree.height(15));

console.log("balanced:", tree.isBalanced());

tree.delete(99);
tree.delete(61);
tree.delete(49);
tree.insert(7);
tree.insert(9);
tree.insert(100);
tree.insert(102);
tree.insert(103);

console.log("balanced:", tree.isBalanced());

tree.rebalance();

console.log("balanced:", tree.isBalanced());

tree.prettyPrint();

console.log("-- level order --");
tree.levelOrder((node) => console.log(node.data));

console.log("-- post order --");
tree.postOrder((node) => console.log(node.data));

console.log("-- pre order --");
tree.preOrder((node) => console.log(node.data));

console.log("-- in order --");
tree.inOrder((node) => console.log(node.data));

function generateRandomNumbers() {
  const numbers = [];

  for (let i = 0; i < 100; i++) {
    const rand = Math.floor(Math.random() * 100);
    numbers.push(rand);
  }

  return numbers;
}
