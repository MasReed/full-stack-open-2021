const palindrome = require('../utils/for_testing').palindrome


describe('palindrome', () => {
    
    test('palindrom of a', () => {
        expect(palindrome('a')).toBe('a')
    })

    test('palindrome of react', () => {
        expect(palindrome('react')).toBe('tcaer')
    })

    test('palindrome of releveler', () => {
        expect(palindrome('releveler')).toBe('releveler')
    })
})
