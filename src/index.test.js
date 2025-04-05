// Jest test case starts here
import { greet } from './path/to/your/module'; // Adjust the import path accordingly

describe('Greeting Module', () => {
    it('should return the correct greeting', () => {
        const expectedGreeting = "Hello World!";
        expect(greet).toBe(expectedGreeting);
    });
});
// Jest test case ends here