// parseVariables.js
// Extracts variable names from text using {{variable}} syntax

export const parseVariables = (text) => {
  if (!text) return [];

  // Regular expression to match {{variable}} pattern
  // Only match complete variable patterns (with both opening and closing braces)
  const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
  const variables = [];
  let match;

  while ((match = variableRegex.exec(text)) !== null) {
    const variableName = match[1].trim();
    // Only add valid variable names (allowing underscores and numbers after the first character)
    if (
      /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(variableName) &&
      variableName.length > 0
    ) {
      if (!variables.includes(variableName)) {
        variables.push(variableName);
      }
    }
  }

  return variables;
};
