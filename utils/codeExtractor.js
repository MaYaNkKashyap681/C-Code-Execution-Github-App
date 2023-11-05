const getExecutableCode = (diffHunk) => {
    const lines = diffHunk.split('\n');

    // Initialize an empty array to store the added code
    const addedCode = [];

    // Flag to skip the first line
    let skipNextLine = true;

    // Iterate through the lines
    lines.forEach(line => {
        if (skipNextLine) {
            skipNextLine = false;
        } else if (line.startsWith('+')) {
            // Remove the '+' and leading whitespace
            const codeLine = line.slice(1).trim();
            if (!codeLine.startsWith('//')) {
                // Exclude comments
                addedCode.push(codeLine);
            }
        }
    });

    // Join the extracted lines to form the complete code
    const actualCode = addedCode.join('\n');
    // Now, 'actualCode' contains the extracted code, excluding the first line and comments
    // console.log(actualCode);
    return actualCode;
}

module.exports = {getExecutableCode};