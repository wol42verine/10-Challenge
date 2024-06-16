const fs = require('fs');
const path = require('path');
const { modifySVG } = require('../index'); // Adjust the path as needed

describe('modifySVG function', () => {
    it('should correctly modify SVG content with color and text', () => {
        const shapeFilename = 'square.svg';
        const logoColor = 'blue';
        const logoText = 'Test Logo';
        const textColor = 'white';

        const modifiedSVG = modifySVG(shapeFilename, logoColor, logoText, textColor);

        // Assert that the modified SVG contains the expected elements and styles
        expect(modifiedSVG).toContain(`<rect width="100%" height="100%" fill="${logoColor}" />`);
        expect(modifiedSVG).toContain(`<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}">${logoText}</text>`);
    });

    // Add more test cases as needed
});
