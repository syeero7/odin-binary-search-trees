class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export default class Tree {
  #root;

  constructor() {
    this.#root = null;
  }

  buildTree(array) {
    const data = [...new Set(array)].sort((a, b) => a - b);

    const build = (array, start, end) => {
      if (start > end) return null;

      const mid = start + Math.round((end - start) / 2);
      const root = new Node(array[mid]);
      root.left = build(array, start, mid - 1);
      root.right = build(array, mid + 1, end);

      return root;
    };

    this.#root = build(data, 0, data.length - 1);
  }

  prettyPrint() {
    const print = (node, prefix = "", isLeft = true) => {
      if (node === null) return;

      if (node.right !== null) {
        print(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        print(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
      }
    };

    print(this.#root);
  }

  insert(value) {
    if (!this.#root) {
      this.#root = new Node(value);
      return;
    }

    let current = this.#root;

    while (current) {
      if (current.data === value) return;

      if (current.data > value) {
        if (!current.left) {
          current.left = new Node(value);
          return;
        }

        current = current.left;
      }

      if (current.data < value) {
        if (!current.right) {
          current.right = new Node(value);
          return;
        }

        current = current.right;
      }
    }
  }

  delete(value) {
    const del = (root, val) => {
      if (!root) return null;

      if (root.data === val) {
        if (!root.left && !root.right) return null;

        if (root.left && !root.right) return root.left;

        if (root.right && !root.left) return root.right;

        let successorParent = root;
        let successor = root.right;

        while (successor.left) {
          successorParent = successor;
          successor = successor.left;
        }

        root.data = successor.data;

        if (successorParent.left === successor) {
          successorParent.left = successor.right;
        } else {
          successorParent.right = successor.right;
        }
      }

      if (root.data > val) {
        root.left = del(root.left, val);
      } else {
        root.right = del(root.right, val);
      }

      return root;
    };

    del(this.#root, value);
  }

  find(value) {
    const search = (root, val) => {
      if (!root) return null;

      if (root.data === val) return structuredClone(root);

      if (root.data > val) {
        return search(root.left, val);
      } else {
        return search(root.right, val);
      }
    };

    return search(this.#root, value);
  }

  levelOrder(callback) {
    if (typeof callback !== "function") throw new Error(`${callback} is not a function`);
    if (!this.#root) return;

    const queue = [];
    queue.push(this.#root);

    while (queue.length) {
      const node = queue.shift();

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);

      callback(structuredClone(node));
    }
  }

  inOrder(callback) {
    if (typeof callback !== "function") throw new Error(`${callback} is not a function`);

    const traverse = (root) => {
      if (!root) return;

      traverse(root.left);
      callback(structuredClone(root));
      traverse(root.right);
    };

    traverse(this.#root);
  }

  preOrder(callback) {
    if (typeof callback !== "function") throw new Error(`${callback} is not a function`);

    const traverse = (root) => {
      if (!root) return;

      callback(structuredClone(root));
      traverse(root.left);
      traverse(root.right);
    };

    traverse(this.#root);
  }

  postOrder(callback) {
    if (typeof callback !== "function") throw new Error(`${callback} is not a function`);

    const traverse = (root) => {
      if (!root) return;

      traverse(root.left);
      traverse(root.right);
      callback(structuredClone(root));
    };

    traverse(this.#root);
  }

  height(value) {
    if (!this.#root) return null;
    let current = this.#root;

    // prettier-ignore
    while (current) {

      if (current.data === value) {

        const queue = [];
        let count = -1;
        queue.push(current);

        while (queue.length) {
          let nodeCount = queue.length;
          count++;

          for (let i = 0; i < nodeCount; i++) {
            const node = queue.shift();

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
          }

        }

        return count;
      }

      current = current.data > value ? current.left : current.right;
    }

    return null;
  }
}
