import _ from 'lodash'

// Generates a random value of rotation between min and max no. of rotations, inclusive
const spinertia = (min: number, max: number) => {
    return (Math.floor(Math.random() * (max - min + 1)) + min) * 360;
};

// @params
// - rotation: degree rotation between 0 and 359
const getSelectedSliceIndex = (prizes: Array<{ text: string, color: string, probability: number }>, rotation: number) => {
    let selectedIndex = prizes.length - 1;
    let i = selectedIndex;
    let cumulativeRotation = 0;
    while (rotation > cumulativeRotation + 360 * prizes[i].probability / 100) {
        cumulativeRotation += 360 * prizes[i].probability / 100;
        selectedIndex -= 1;
        i--;
        if (i === 0) break;

    }
    return selectedIndex;
}

const getRiggedDegreeRotation = (prizes: Array<{ text: string, color: string, probability: number }>, riggedSliceIndex: number) => {
    // Get the cumulative probability up to slice before riggedSliceIndex and riggedSliceIndex
    // The two numbers will be used to calculate the min/max degree the ticker can land
    const min = _.sum(prizes.slice(0, riggedSliceIndex).map(prize => prize.probability));
    const max = min + prizes[riggedSliceIndex].probability
    return spinertia(min, max) / 100
}

export {
    spinertia,
    getSelectedSliceIndex,
    getRiggedDegreeRotation
}