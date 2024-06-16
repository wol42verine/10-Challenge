const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

// Function to read and modify SVG file with specified color and text
function modifySVG(shapeFilename, logoColor, logoText, textColor) {
    // Read the SVG file content
    const svgPath = path.join(__dirname, 'library', shapeFilename);
    let svgContent = fs.readFileSync(svgPath, 'utf8');

    // Find the position to insert the text and rectangle before </svg>
    const insertIndex = svgContent.indexOf('</svg>');

    // Modify the SVG content to fill with the specified color and text
    svgContent = svgContent.slice(0, insertIndex) +
        `<rect width="100%" height="100%" fill="${logoColor}" />\n` + // Add rectangle for background color
        `<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}">${logoText}</text>` + // Add text
        svgContent.slice(insertIndex);

    return svgContent;
}

// Inquirer prompts for shape, color, text, and text color inputs
const prompts = [
    {
        type: 'list',
        name: 'logoShape',
        message: 'Choose the shape of your logo:',
        choices: ['square.svg', 'circle.svg', 'triangle.svg']
    },
    {
        type: 'input',
        name: 'logoColor',
        message: 'Enter the color for your logo:'
    },
    {
        type: 'input',
        name: 'logoText',
        message: 'Enter the text for your logo:'
    },
    {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color for your logo:'
    }
];

// Prompt user for shape, color, text, and text color inputs
inquirer.prompt(prompts)
    .then(answers => {
        // Destructure answers object
        const { logoShape, logoColor, logoText, textColor } = answers;

        // Modify SVG content based on selected shape, color, text, and text color
        const svgContent = modifySVG(logoShape, logoColor, logoText, textColor);

        // Write SVG content to file
        const filename = 'logo.svg';
        fs.writeFileSync(filename, svgContent);
        console.log(`SVG file '${filename}' successfully created!`);
    })
    .catch(error => {
        console.error('Error occurred during prompts:', error);
    });

// Export modifySVG function for testing or potential reuse
module.exports = {
    modifySVG,
};
