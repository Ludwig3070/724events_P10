import { getMonth } from ".";
import {expect, jest, test} from '@jest/globals';


/**
 * Returns the name of the month for the given date.
 * @param {Date} date - The date object.
 * @returns {string} The name of the month in French.
 */
describe("Date helper", () => {
    describe("When getMonth is called", () => {
        test("the function return janvier for 2022-01-01 as date", () => {         
            expect(getMonth(new Date( '2022-01-01'))).toBe('janvier')           
        });
        test("the function return juillet for 2022-07-08 as date", () => {
            expect(getMonth(new Date( '2022-07-08'))).toBe('juillet')
        });
    });
})

