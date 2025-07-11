# 🔧 Tool Management Quick Reference - Blog Automation Project

## Current Setup Optimization

### Immediate Action Required

- **Disable `context7 Docs`** - Not needed for blog automation (saves ~15 tools)
- **Keep `n8n-mcp` enabled** - Core workflow management
- **Use `n8n-workflows Docs` on-demand** - Enable only when needed

---

## Task-Based Tool Activation

### 📝 Creating Blog Workflows

**Active Tools:** (15-20 total)

- ✅ `n8n-mcp` - All tools
- ✅ Basic file operations (`read_file`, `edit_file`, `list_dir`)
- ❌ `context7` - Disabled
- ❌ `n8n-workflows` - Disabled

**Use when:** Building daily-blog-linkedin-automation.json

### 🔍 Finding Templates & Examples

**Active Tools:** (25-30 total)

- ✅ `n8n-mcp` - Core tools
- ✅ `n8n-workflows Docs` - Enable temporarily
- ✅ File operations
- ❌ `context7` - Still disabled

**Use when:** Looking for workflow patterns, templates, or examples

### 🧪 Testing & Validation

**Active Tools:** (20-25 total)

- ✅ `n8n-mcp` - Focus on validation tools
- ✅ Workflow management
- ❌ Documentation servers
- ❌ `context7` - Disabled

**Use when:** Validating workflows, testing automation

### 📚 Documentation & Guides

**Active Tools:** (30-35 total)

- ✅ `n8n-mcp` - Selected tools
- ✅ `n8n-workflows` - For examples
- ✅ File operations for writing docs
- ❌ `context7` - Only enable if working on context7 content

**Use when:** Writing setup guides, troubleshooting docs

---

## Tool Priority Levels

### 🔥 High Priority (Always Keep Active)

```
mcp_n8n-mcp_list_nodes
mcp_n8n-mcp_get_node_essentials
mcp_n8n-mcp_validate_workflow
mcp_n8n-mcp_n8n_create_workflow
read_file
edit_file
list_dir
```

### 🔶 Medium Priority (Situational)

```
mcp_n8n-mcp_search_nodes
mcp_n8n-mcp_get_templates_for_task
mcp_n8n-mcp_get_node_info
mcp_n8n-workflows_Docs_search_n8n_workflows_docs
```

### 🔸 Low Priority (Rarely Needed)

```
Context7 tools (all)
Advanced debugging tools
Specialized documentation tools
```

---

## Performance Optimization

### Current Status: 47 Tools ⚠️

**Target:** Under 25 tools for optimal performance

### Quick Wins:

1. **Disable context7** → Saves ~15 tools → **32 tools remaining**
2. **Selective n8n-workflows activation** → Target **25 tools**
3. **Smart tool selection** → Focus on current task

### Expected Results:

- ✅ Faster tool selection
- ✅ Better AI performance
- ✅ Cleaner interface
- ✅ Project-focused workflow

---

## Toggle Commands

**Disable context7 temporarily:**

```
In Cursor Settings → Tools & Integrations → Toggle OFF context7 Docs
```

**Enable n8n-workflows when needed:**

```
In Cursor Settings → Tools & Integrations → Toggle ON n8n-workflows Docs
```

**Re-enable context7 for other projects:**

```
In Cursor Settings → Tools & Integrations → Toggle ON context7 Docs
```

---

## Project Phases

### Phase 1: Core Development ✅ (Current)

- **Active:** n8n-mcp only
- **Target:** 15-20 tools
- **Focus:** Building automation workflows

### Phase 2: Template Research

- **Active:** n8n-mcp + n8n-workflows
- **Target:** 25-30 tools
- **Focus:** Finding patterns and examples

### Phase 3: Production Deployment

- **Active:** Validation tools primarily
- **Target:** 20-25 tools
- **Focus:** Testing and monitoring

### Phase 4: Documentation

- **Active:** Selective documentation tools
- **Target:** 25-30 tools
- **Focus:** Guides and troubleshooting

---

**🎯 Current Recommendation:** Disable context7, keep n8n-mcp only for optimal blog automation development.
