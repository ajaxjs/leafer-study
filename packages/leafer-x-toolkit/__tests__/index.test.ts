import { describe, expect, test } from 'vitest'

import { Toolkit } from "../src"


describe('toolkit', () => {

    test('is Group', () => {

        const toolkit = new Toolkit()
        expect(toolkit.children).toBeTruthy()

    })

    test('async: is Group', async () => {
        await new Promise(function (resolve) {

            const toolkit = new Toolkit()
            expect(toolkit.children).toBeTruthy()
            resolve(true)
        })

    })

})