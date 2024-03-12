import _ from 'lodash'
import { mergeSort } from './mergeSort.js';

class Node
{
    constructor(data)
    {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree
{
    constructor(array)
    {
        this.root = buildTree(array);
    }
}


function buildTree(array)
{
    if (array.length === 0)
    {
        return null;
    }
    let splitValue = Math.floor(array.length / 2);
    
    const nodeObject = new Node(array[splitValue]);
    const arrayLeft = array.slice(0, splitValue);
    const arrayRight = array.slice(++splitValue, array.length)
    nodeObject.left = buildTree(arrayLeft);
    nodeObject.right = buildTree(arrayRight);

    return nodeObject;
}

function sortRemoveDuplicates(array)
{
    array = mergeSort(array);
    array = _.sortedUniq(array);
    return array;
}





// let testArray = [3,2,9,9,8,8,6,5,10];
// let testArray = [9,5,3,10];
let testArray = [1, 2, 3, 4, 5, 6, 9];
// let testArray = [1, 2, 3];
testArray = sortRemoveDuplicates(testArray)
const treeTest = new Tree(testArray);



// Code from odinProject - BST
const prettyPrint = (node, prefix = "", isLeft = true) =>
{
    if (node === null)
    {
        return;
    }
    if (node.right !== null)
    {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null)
    {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};
prettyPrint(treeTest.root);