const fs = require('fs');
const path = require('path');
const { modifySVG } = require('../index'); // Adjust the path as needed

jest.mock('fs');

describe('modifySVG function', () => {
    const shapeFilename = 'test.svg';
    const logoColor = 'blue';
    const logoText = 'Test Logo';
    const textColor = 'white';
    const svgContent = '<svg></svg>';

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should correctly modify SVG content with color and text', () => {
        fs.readFileSync.mockReturnValue(svgContent);

        const modifiedSVG = modifySVG(shapeFilename, logoColor, logoText, textColor);

        expect(modifiedSVG).toContain(`<rect width="100%" height="100%" fill="${logoColor}" />`);
        expect(modifiedSVG).toContain(`<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}">${logoText}</text>`);
    });

    it('should handle different shapes correctly', () => {
        const circleSVGContent = '<svg><circle cx="50" cy="50" r="40" /></svg>';
        fs.readFileSync.mockReturnValue(circleSVGContent);

        const modifiedSVG = modifySVG('circle.svg', 'green', 'Circle Logo', 'yellow');

        expect(modifiedSVG).toContain(`<rect width="100%" height="100%" fill="green" />`);
        expect(modifiedSVG).toContain(`<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="yellow">Circle Logo</text>`);
    });

    // Additional test cases can be added as needed
});
