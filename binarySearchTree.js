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

    insert(value, currentNode = this.root)
    {
        if (currentNode === null)
        {
            const insertNewNodeObject = new Node(value);
            return insertNewNodeObject;
        }
        if (value < currentNode.data)
        {
            currentNode.left = this.insert(value, currentNode.left)
        }
        else
        {
            currentNode.right = this.insert(value, currentNode.right);
        }
        return currentNode;
    }

    delete(value, currentNode = this.root)
    {
        if (value === currentNode.data)
        {
            if (currentNode.left === null && currentNode.right === null)
            {
                return null;
            }
            else if (currentNode.left === null || currentNode.right === null)
            {
                console.log(currentNode.left)
                return currentNode.left === null ? currentNode.right : currentNode.left
            }
            else if (currentNode.left !== null && currentNode.right !== null)
            {
                currentNode.data = findMaxRightNodeLeftTree(currentNode.left)
                console.log(currentNode.data, currentNode.left)
                currentNode.left = this.delete(currentNode.data, currentNode.left);
                return currentNode;
            }
        }
        if (value < currentNode.data)
        {
            currentNode.left = this.delete(value, currentNode.left)
        }
        else
        {
            currentNode.right = this.delete(value, currentNode.right);
        }
        return currentNode;
    }

    findValue(value, currentNode = this.root)
    {
        if (currentNode === null || value === currentNode.data)
        {
            return currentNode === null ? 'Not Found' : currentNode;
        }
        if (value > currentNode.data)
        {
            return this.findValue(value, currentNode.right)
        }
        else
        {
            return this.findValue(value, currentNode.left)
        }
    }
    levelOrder(callback)
    {
        const arrayQueue = [];
        const arrayStoreNodeObjects = []
        arrayQueue.push(this.root);
        while (arrayQueue.length !== 0)
        {
            const currentNode = arrayQueue.shift()
            if (currentNode.left !== null)
            {
                arrayQueue.push(currentNode.left)
            }
            if (currentNode.right !== null)
            {
                arrayQueue.push(currentNode.right)
            }
            if (callback === undefined)
            {
                arrayStoreNodeObjects.push(currentNode.data)
            }
            else
            {
                callback(currentNode);
            }
        }
        return arrayStoreNodeObjects
    }

    levelOrderRec(callback = undefined, currentNode = this.root, arrayQueue = [], arrayStoreNodeObjects = [])
    {
        if (currentNode.left !== null)
        {
            arrayQueue.push(currentNode.left)
        }
        if (currentNode.right !== null)
        {
            arrayQueue.push(currentNode.right)
        }
        if (callback === undefined)
        {
            arrayStoreNodeObjects.push(currentNode.data)
        }
        else
        {
            callback(currentNode);
        }
        if (arrayQueue.length === 0) // the base case is here
        {
            return arrayStoreNodeObjects;
        }
        this.levelOrderRec(callback, arrayQueue.shift(), arrayQueue, arrayStoreNodeObjects)
        return arrayStoreNodeObjects;
    }

    traversalPreOrder(callback = undefined, currentNode = this.root, array = [])
    {
        if (currentNode === null)
        {
            return array;
        }
        if (callback !== undefined)
        {
            callback(currentNode.data);
        }
        array = this.traversalPreOrder(callback, currentNode.left, array);
        array = this.traversalPreOrder(callback, currentNode.right, array);
        if (callback === undefined)
        {
            return array;
        }
    }


    traversalInOrder(callback = undefined, currentNode = this.root, array = []) {
        if (currentNode === null)
        {
            return array;
        }
        array = this.traversalInOrder(callback, currentNode.left, array);
        array.push(currentNode.data);
        if (callback !== undefined)
        {
            callback(currentNode.data);
        }
        array = this.traversalInOrder(callback, currentNode.right, array);
        if (callback === undefined)
        {
            return array;
        }        
    }
    
    traversalPostOrder(currentNode = this.root) { 

    }

}

function findMaxRightNodeLeftTree(currentNode, maxValue = 0)
{
    if (currentNode.right === null)
    {
        return currentNode.data
    }
    return findMaxRightNodeLeftTree(currentNode.right)
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
// let testArray = [1, 2, 3, 4, 5, 6, 9];
let testArray = [1, 2, 3];
testArray = sortRemoveDuplicates(testArray)
const treeTest = new Tree(testArray);
// treeTest.insert(0);
// treeTest.insert(5);
// treeTest.delete(2);
// console.log(treeTest.findValue(-1));
// treeTest.levelOrder(callback);
// treeTest.levelOrderRec(callback);
console.log(treeTest.traversalInOrder(callback))


function callback(nodeObject)
{
    // console.log(nodeObject.data);
    console.log(nodeObject);
    console.log(' ');
}

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