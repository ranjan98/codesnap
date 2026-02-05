# CodeSnap

Generate beautiful code screenshots from your terminal. Like Carbon.now.sh, but as a CLI tool.

## Why CodeSnap?

Stop opening websites just to screenshot your code. CodeSnap gives you pixel-perfect, syntax-highlighted code screenshots right from your terminal. Perfect for documentation, blog posts, Twitter, or showing off that clever one-liner.

## Features

- **Syntax highlighting** for 100+ languages via Shiki
- **Multiple themes** - Dark, Light, Monokai, Nord, Dracula, GitHub, Solarized
- **macOS-style window controls** - Optional window chrome for that polished look
- **Custom backgrounds** - Solid colors or gradients
- **Line number control** - Show/hide, or select specific line ranges
- **Shadow effects** - Add depth to your screenshots
- **Piped input** - Screenshot code from clipboard or command output
- **Fast** - Generates screenshots in seconds

## Installation

```bash
npm install -g codesnap
```

Or run locally:

```bash
git clone https://github.com/ranjan98/codesnap.git
cd codesnap
npm install
npm run build
npm link
```

## Usage

### Basic Screenshot

```bash
# Screenshot a file
codesnap capture myfile.js

# Custom output location
codesnap capture myfile.py --output screenshot.png
```

### Themes

```bash
# Use a specific theme
codesnap capture app.tsx --theme dracula

# See all available themes
codesnap themes
```

Available themes:
- `dark` (default)
- `light`
- `monokai`
- `nord`
- `dracula`
- `github-dark`
- `github-light`
- `solarized-dark`
- `solarized-light`

### Window Controls

```bash
# Add macOS-style window controls
codesnap capture server.go --window-controls --title "server.go"

# With custom background
codesnap capture api.rs --window-controls --bg "#282a36"
```

### Line Numbers & Ranges

```bash
# Hide line numbers
codesnap capture script.sh --no-line-numbers

# Capture specific lines (lines 10-25)
codesnap capture app.ts --start-line 10 --end-line 25
```

### Styling Options

```bash
# Custom background color
codesnap capture code.py --bg "#0d1117"

# Add shadow effect
codesnap capture main.cpp --shadow

# Custom padding
codesnap capture style.css --padding 60

# Combine all options
codesnap capture app.js \
  --theme nord \
  --window-controls \
  --title "app.js" \
  --bg "#2e3440" \
  --shadow \
  --padding 50 \
  --output beautiful-code.png
```

### From Clipboard or Stdin

```bash
# Screenshot code from clipboard (macOS)
pbpaste | codesnap stdin --language javascript

# From a command
cat myfile.rb | codesnap stdin --language ruby --theme monokai

# From any output
git diff | codesnap stdin --language diff
```

## Examples

### Example 1: Basic JavaScript

```bash
codesnap capture example.js
```

Creates a dark-themed screenshot with syntax highlighting and line numbers.

### Example 2: Styled Python

```bash
codesnap capture train.py \
  --theme github-dark \
  --window-controls \
  --title "train.py" \
  --shadow
```

Creates a GitHub Dark themed screenshot with window controls and shadow.

### Example 3: Specific Lines

```bash
codesnap capture api.go \
  --start-line 45 \
  --end-line 67 \
  --theme nord \
  --output api-handler.png
```

Screenshots only lines 45-67 with Nord theme.

### Example 4: Blog Post Snippet

```bash
codesnap capture snippet.tsx \
  --no-line-numbers \
  --theme light \
  --bg "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" \
  --padding 80 \
  --shadow
```

Clean screenshot with gradient background, perfect for blog posts.

## Supported Languages

Auto-detects from file extension:

JavaScript, TypeScript, Python, Ruby, Go, Rust, Java, C, C++, C#, PHP, Swift, Kotlin, Bash, YAML, JSON, Markdown, HTML, CSS, SCSS, SQL, and many more.

Specify manually with `--language` flag if needed.

## Use Cases

- **Documentation** - Clean code examples for README files
- **Social Media** - Share code snippets on Twitter/LinkedIn
- **Blog Posts** - Professional-looking code blocks
- **Presentations** - High-quality code slides
- **Tutorials** - Clear, readable code examples
- **Code Reviews** - Highlight specific sections

## Tips

1. **High DPI displays** - Screenshots are rendered at 2x resolution by default
2. **File size** - PNG outputs are typically 50-200KB
3. **Custom fonts** - Uses system monospace fonts (SF Mono on macOS)
4. **Gradients** - Use CSS gradient syntax for `--bg` option

## Comparison to Alternatives

| Feature | CodeSnap | Carbon.now.sh | Polacode |
|---------|----------|---------------|----------|
| CLI Interface | ✅ | ❌ | ❌ |
| Offline | ✅ | ❌ | ✅ |
| Batch Processing | ✅ | ❌ | ❌ |
| Piped Input | ✅ | ❌ | ❌ |
| Themes | 9+ | 20+ | 5+ |
| Window Controls | ✅ | ✅ | ✅ |

## Roadmap

- [ ] More built-in themes
- [ ] Custom font selection
- [ ] Watermark support
- [ ] Batch processing multiple files
- [ ] SVG export option
- [ ] Configuration file support
- [ ] GIF generation for code diffs

## Contributing

Found a bug? Want a new theme?

```bash
git clone https://github.com/ranjan98/codesnap.git
cd codesnap
npm install
npm run dev capture test.js
```

Submit issues or PRs on GitHub!

## License

MIT License - see [LICENSE](LICENSE) for details

---

**Made for developers who live in the terminal.**

Give it a star if it saves you time! ⭐
