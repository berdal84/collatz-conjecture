
export class CollatzMath {
    /**
     * 
     * @param {Number} i a positive non null integer 
     * @returns {Number} the result of the syracuse function applied to i
     */
    static syracuse( i ) {
        if( !Number.isInteger(i)) return undefined
        if( i < 1) return undefined

        if (i % 2 === 0)
            return i / 2  // even
        return i * 3 + 1; // odd
    }
}