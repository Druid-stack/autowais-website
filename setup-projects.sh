#!/bin/bash

# Setup script for separated projects
echo "Setting up separated projects..."

# Create directories if they don't exist
mkdir -p power-plant figma-context-mcp autowais

echo "✅ Project directories created"
echo ""
echo "📁 Project Structure:"
echo "├── power-plant/          # N8N workflows & automation"
echo "├── figma-context-mcp/    # Figma API integration"
echo "├── autowais/            # Business website"
echo "└── separated-projects.code-workspace"
echo ""
echo "📋 Next Steps:"
echo "1. Move Power Plant files to ./power-plant/"
echo "2. Move Figma-Context-MCP files to ./figma-context-mcp/"
echo "3. Move Autowais files to ./autowais/"
echo "4. Open separated-projects.code-workspace in VS Code/Cursor"
echo ""
echo "🎯 Each project now has:"
echo "   - Project-specific .cursorrules"
echo "   - Technology-focused guidelines"
echo "   - Independent development workflows"
echo ""
echo "🚀 Ready to work on separate projects!" 