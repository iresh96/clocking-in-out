
const {formatDate,findOverTime,ifClockOut} = require('../helpers/hbs')



test('Formatdate',() =>{
    const result = formatDate(new Date(2020,10,4,1,14,55))
    expect(result).toBe("04/11/2020, 1:14:55")
})

describe("Over Time function",() =>{

    it('should return a number if working hours are more than 8 hours',() =>{
        const result = findOverTime(new Date(2020,10,4,1,0,0),new Date(2020,10,4,10,0,0))
        expect(result).toBe(1)
    })
    it('should return 0 if working hours are more than 8 hours',() =>{
        const result = findOverTime(new Date(2020,10,4,1,0,0),new Date(2020,10,4,3,0,0))
        expect(result).toBe(0)
    })
})

describe("If clock out function",() =>{

    it('should return 0 if Time in and Time out both are Equal',() =>{
        const result = ifClockOut(new Date(2020,10,4,10,0,0),new Date(2020,10,4,10,0,0))
        expect(result).toBe(0)
    })
    it('should return Time out value if Time in and Time out both are different ',() =>{
        const result = ifClockOut(new Date(2020,10,4,10,0,0),new Date(2020,10,4,12,0,0))
        expect(result).toBe("04/11/2020, 12:00:00")
    })
})
