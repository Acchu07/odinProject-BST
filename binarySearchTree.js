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
            if (callback)
            {
                return
            }
            return array;
        }
        if (callback)
        {
            callback(currentNode.data)
            this.traversalPreOrder(callback, currentNode.left, array)
            this.traversalPreOrder(callback, currentNode.right, array)
            return;
        }
        array.push(currentNode.data);
        array = this.traversalPreOrder(callback, currentNode.left, array);
        array = this.traversalPreOrder(callback, currentNode.right, array);
        return array;
    }


    traversalInOrder(callback = undefined, currentNode = this.root)
    {
        if (callback !== undefined)
        {
            if (currentNode === null)
            {
                return;
            }
            this.traversalInOrder(callback, currentNode.left)
            callback(currentNode.data)
            this.traversalInOrder(callback, currentNode.right)
        }
        else
        {
            const array = []
            if (currentNode === null)
            {
                return array;
            }
            array.push(...this.traversalInOrder(callback, currentNode.left));
            array.push(currentNode.data);
            array.push(...this.traversalInOrder(callback, currentNode.right));
            return array;
        }
    }

    traversalPostOrder(callback = undefined, currentNode = this.root, array = [])
    {
        if (currentNode === null)
        {
            if (callback)
            {
                return
            }
            return array;
        }
        if (callback)
        {
            this.traversalPostOrder(callback, currentNode.left, array)
            this.traversalPostOrder(callback, currentNode.right, array)
            return callback(currentNode.data)
        }
        array = this.traversalPostOrder(callback, currentNode.left, array)
        array = this.traversalPostOrder(callback, currentNode.right, array)
        array.push(currentNode.data);
        return array;

    }

    height(currentNode = this.root, left = 0, right = 0)
    {
        if (currentNode === null)
        {
            return -1;
        }
        left = this.height(currentNode.left, left, right)
        right = this.height(currentNode.right, left, right)
        const maxValue = left > right ? left : right;
        return maxValue + 1;
    }

    depth(currentNode)
    {
        if (currentNode === this.root)
        {
            return 0;
        }
        let traversalNode;
        let arrayTracker = [this.root, 'Breaker'];
        let counter = 0;
        while (true)
        { // rephrase condition
            if (traversalNode === currentNode)
            {
                return counter;
            }
            if (arrayTracker[0] === 'Breaker')
            {
                if (arrayTracker.length === 1)
                {
                    break;
                }
                arrayTracker.push('Breaker');
                arrayTracker.shift();
                counter++;
                continue;
            }
            traversalNode = arrayTracker.shift();
            if (traversalNode.left !== null)
            {
                arrayTracker.push(traversalNode.left)
            }
            if (traversalNode.right !== null)
            {
                arrayTracker.push(traversalNode.right);
            }
        }
        return 'Not Present';
    }

    // isBalanced(currentNode = this.root){
    //     if(currentNode === null){
    //         return -1;
    //     }
    //     let left;
    //     let right;
    //     left = this.isBalanced(currentNode.left)
    //     right = this.isBalanced(currentNode.right);

    //     let inLeafNode = 1;
    //     inLeafNode = inLeafNode + Math.max(left,right);
    //     let difference;
    //     difference = left - right;
    //     // console.log(difference);
    //     // console.log(`difference when data point is ${currentNode.data} is ${difference} and leafnode value is ${inLeafNode}`);

    //     return inLeafNode;    
    // }

    isBalanced(currentNode = this.root)
    {
        if (currentNode === null)
        {
            return true;
        }
        let left;
        let right;
        left = this.height(currentNode.left)
        right = this.height(currentNode.right);

        if (Math.abs(left - right) <= 1 &&
            this.isBalanced(currentNode.left) &&
            this.isBalanced(currentNode.right))
        {
            return true;
        }

        return false;
    }

    reBalance()
    {
        if (!this.isBalanced())
        {
            console.log('notBalanced')
            this.root = buildTree(this.traversalInOrder());
            console.log('balanced');
            return;
        }
        console.log('already balanced')
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


function callback(nodeObject)
{
    // console.log(nodeObject.data);
    console.log(nodeObject);
    console.log(' ');
}

// Code from odinProject - BST Visual Print
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





// Driver script 

let testArray = [3, 2, 9, 9, 8, 8, 6, 5, 10, 11];
// let testArray = [3, 1];
testArray = sortRemoveDuplicates(testArray)
const treeTest = new Tree(testArray);
// treeTest.isBalanced()
console.log(treeTest.isBalanced());
treeTest.insert(0);
treeTest.insert(-1);
console.log(treeTest.isBalanced())
treeTest.reBalance();
// treeTest.insert(23);
// console.log(treeTest.isBalanced());
// treeTest.insert(0);
// treeTest.delete(2);
// console.log(treeTest.findValue(-1));
// treeTest.levelOrder(callback);
// treeTest.levelOrderRec(callback);




// let testArray = [9,5,3,10];
// let testArray = [1, 2, 3, 4, 5, 6,7,8, 9, 10];
// let testArray = [1,2,3,4,5,6];
prettyPrint(treeTest.root);