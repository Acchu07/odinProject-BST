function merge(arrLeft, arrRight)
{
    const sortedArray = [];
    while ((arrLeft.length !== 0) && (arrRight.length !== 0))
    {
        if (arrLeft[0] > arrRight[0])
        {
            sortedArray.push(arrRight[0])
            arrRight.shift();
        }
        else
        {
            sortedArray.push(arrLeft[0])
            arrLeft.shift();
        }
    }
    while (arrLeft.length !== 0)
    {
        sortedArray.push(arrLeft[0])
        arrLeft.shift();
    }
    while (arrRight.length !== 0)
    {
        sortedArray.push(arrRight[0])
        arrRight.shift();
    }
    return sortedArray;

}

export function mergeSort(arrayToSort)
{
    if (arrayToSort.length === 1)
    {
        return arrayToSort;
    }
    const splitValue = Math.round(arrayToSort.length / 2);
    let leftArrayHalf = arrayToSort.slice(0, splitValue)
    let rightArrayHalf = arrayToSort.slice(splitValue, arrayToSort.length);
    leftArrayHalf = mergeSort(leftArrayHalf)
    rightArrayHalf = mergeSort(rightArrayHalf)
    const sortedArray = merge(leftArrayHalf, rightArrayHalf)
    return sortedArray;
}

