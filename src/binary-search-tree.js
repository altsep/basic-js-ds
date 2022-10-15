const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.base = null;
  }

  root() {
    return this.base;
  }

  add(data) {
    this.base = addWithin(this.base, data);

    function addWithin(e, data) {
      if (!e) return new Node(data);

      if (e.data === data) return e;

      if (data < e.data) e.left = addWithin(e.left, data);
      else e.right = addWithin(e.right, data);

      return e;
    }
  }

  has(data) {
    return searchWithin(this.base, data);

    function searchWithin(e, data) {
      if (!e) return false;

      if (e.data === data) return true;

      return data < e.data
        ? searchWithin(e.left, data)
        : searchWithin(e.right, data);
    }
  }

  find(data) {
    return findWithin(this.base, data);

    function findWithin(e, data) {
      if (!e) return null;
      if (e.data === data) return e;
      return data < e.data
        ? findWithin(e.left, data)
        : findWithin(e.right, data);
    }
  }

  remove(data) {
    this.base = removeE(this.base, data);

    function removeE(e, data) {
      if (!e) return null;

      if (data < e.data) {
        e.left = removeE(e.left, data);
        return e;
      } else if (data > e.data) {
        e.right = removeE(e.right, data);
        return e;
      } else {
        if (!e.left && !e.right) return null;
      }

      if (!e.left) {
        e = e.right;
        return e;
      }

      if (!e.right) {
        e = e.left;
        return e;
      }

      let minRight = e.right;
      while (minRight.left) minRight = minRight.left;
      e.data = minRight.data;

      e.right = removeE(e.right, minRight.data);

      return e;
    }
  }

  min() {
    if (!this.base) return;

    let e = this.base;
    while (e.left) e = e.left;

    return e.data;
  }

  max() {
    if (!this.base) return;

    let e = this.base;
    while (e.right) e = e.right;

    return e.data;
  }
}

module.exports = {
  BinarySearchTree,
};
