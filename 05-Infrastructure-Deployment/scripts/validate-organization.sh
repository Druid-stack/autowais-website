#!/bin/bash

# Power Plant Workspace Organization Validator
# This script checks that all files are properly organized

echo "🔍 Power Plant Workspace Organization Validator"
echo "================================================="

# Check that main project directories exist
echo "📁 Checking main project directories..."
for dir in "01-Autowais-Platform" "02-LinkedIn-Integration" "03-N8N-Workflows-Agents" "04-Content-Knowledge-Management" "05-Infrastructure-Deployment" "06-Archive-Legacy"; do
    if [ -d "$dir" ]; then
        echo "  ✅ $dir exists"
    else
        echo "  ❌ $dir missing"
    fi
done

# Check that each project has its README
echo ""
echo "📖 Checking README files..."
for dir in "01-Autowais-Platform" "02-LinkedIn-Integration" "03-N8N-Workflows-Agents" "04-Content-Knowledge-Management" "05-Infrastructure-Deployment"; do
    if [ -f "$dir/README.md" ]; then
        echo "  ✅ $dir/README.md exists"
    else
        echo "  ❌ $dir/README.md missing"
    fi
done

# Check workspace configuration
echo ""
echo "⚙️ Checking workspace configuration..."
if [ -f "power-plant.code-workspace" ]; then
    echo "  ✅ Workspace configuration exists"
else
    echo "  ❌ Workspace configuration missing"
fi

# Check for stray files in root (should be minimal)
echo ""
echo "🧹 Checking root directory cleanliness..."
root_files=$(ls -la | grep -v "^d" | wc -l)
echo "  📊 Root directory has $root_files files (should be ~8-10)"

if [ $root_files -gt 15 ]; then
    echo "  ⚠️  Root directory might have too many files"
    echo "  Consider moving files to appropriate project directories"
else
    echo "  ✅ Root directory looks clean"
fi

# Summary
echo ""
echo "📋 Organization Status Summary:"
echo "================================"

# Count files in each directory
total_files=0
for dir in "01-Autowais-Platform" "02-LinkedIn-Integration" "03-N8N-Workflows-Agents" "04-Content-Knowledge-Management" "05-Infrastructure-Deployment" "06-Archive-Legacy"; do
    if [ -d "$dir" ]; then
        file_count=$(find "$dir" -type f | wc -l)
        echo "  $dir: $file_count files"
        total_files=$((total_files + file_count))
    fi
done

echo "  📊 Total organized files: $total_files"
echo ""
echo "🎉 Validation complete! Workspace is properly organized."
echo ""
echo "💡 To use:"
echo "   - Open workspace: code power-plant.code-workspace"
echo "   - Navigate to specific projects using numbered directories"
echo "   - Each project has its own README with setup instructions" 