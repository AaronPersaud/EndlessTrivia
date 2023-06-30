import { shuffle, getQuestions } from "../utils";

describe('shuffle', () => {
    it('returns a list with the same length', () => {
        const testArr = [1,2,3,4];
        const shuffled = shuffle(testArr);

        expect(shuffled.length).toEqual(testArr.length)
    })
    it('returns a list with the same elements', () => {
        const testArr = [5,3,2,1,6,4];
        const shuffled = shuffle(testArr);

        shuffled.sort()
        testArr.sort()

        expect(shuffled).toEqual(testArr);
    })
})