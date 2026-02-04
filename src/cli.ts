#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { generateSnapshot } from './generator';
import * as fs from 'fs';
import * as path from 'path';

const program = new Command();

program
  .name('codesnap')
  .description('Generate beautiful code screenshots from the command line')
  .version('1.0.0');

program
  .command('capture <file>')
  .description('Create a code screenshot from a file')
  .option('-o, --output <path>', 'Output file path', './code-snap.png')
  .option('-t, --theme <theme>', 'Color theme (dark, light, monokai, nord, dracula)', 'dark')
  .option('-l, --language <lang>', 'Language for syntax highlighting (auto-detect if not specified)')
  .option('--no-line-numbers', 'Hide line numbers')
  .option('--start-line <line>', 'Start from line number', '1')
  .option('--end-line <line>', 'End at line number')
  .option('--bg <color>', 'Background color (hex or gradient)', '#1e1e1e')
  .option('--padding <px>', 'Padding around code (in pixels)', '40')
  .option('--window-controls', 'Show macOS-style window controls')
  .option('--title <text>', 'Window title text')
  .option('--shadow', 'Add shadow effect')
  .action(async (file: string, options) => {
    try {
      // Validate file exists
      if (!fs.existsSync(file)) {
        console.error(chalk.red(`Error: File not found: ${file}`));
        process.exit(1);
      }

      console.log(chalk.blue.bold('\n📸 CodeSnap\n'));
      console.log(chalk.gray(`Reading ${file}...`));

      // Read file
      let code = fs.readFileSync(file, 'utf-8');
      const lines = code.split('\n');

      // Extract lines if specified
      const startLine = parseInt(options.startLine) - 1;
      const endLine = options.endLine ? parseInt(options.endLine) : lines.length;

      if (startLine > 0 || endLine < lines.length) {
        code = lines.slice(startLine, endLine).join('\n');
        console.log(chalk.gray(`Extracting lines ${startLine + 1}-${endLine}`));
      }

      // Auto-detect language if not specified
      const language = options.language || detectLanguage(file);
      console.log(chalk.gray(`Language: ${language}`));
      console.log(chalk.gray(`Theme: ${options.theme}`));

      // Generate snapshot
      console.log(chalk.yellow('\nGenerating snapshot...'));

      await generateSnapshot({
        code,
        language,
        theme: options.theme,
        outputPath: options.output,
        lineNumbers: options.lineNumbers,
        background: options.bg,
        padding: parseInt(options.padding),
        windowControls: options.windowControls,
        title: options.title || path.basename(file),
        shadow: options.shadow,
      });

      console.log(chalk.green.bold(`\n✅ Snapshot saved to: ${options.output}\n`));
    } catch (error: any) {
      console.error(chalk.red('\n❌ Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('stdin')
  .description('Create a screenshot from stdin')
  .option('-o, --output <path>', 'Output file path', './code-snap.png')
  .option('-t, --theme <theme>', 'Color theme', 'dark')
  .option('-l, --language <lang>', 'Language for syntax highlighting', 'javascript')
  .option('--window-controls', 'Show macOS-style window controls')
  .option('--title <text>', 'Window title text', 'Code')
  .action(async (options) => {
    try {
      // Read from stdin
      const chunks: Buffer[] = [];
      for await (const chunk of process.stdin) {
        chunks.push(chunk);
      }
      const code = Buffer.concat(chunks).toString('utf-8');

      if (!code.trim()) {
        console.error(chalk.red('Error: No input received from stdin'));
        process.exit(1);
      }

      console.log(chalk.blue.bold('\n📸 CodeSnap\n'));
      console.log(chalk.yellow('Generating snapshot from stdin...'));

      await generateSnapshot({
        code,
        language: options.language,
        theme: options.theme,
        outputPath: options.output,
        lineNumbers: true,
        background: '#1e1e1e',
        padding: 40,
        windowControls: options.windowControls,
        title: options.title,
        shadow: false,
      });

      console.log(chalk.green.bold(`\n✅ Snapshot saved to: ${options.output}\n`));
    } catch (error: any) {
      console.error(chalk.red('\n❌ Error:'), error.message);
      process.exit(1);
    }
  });

program
  .command('themes')
  .description('List available themes')
  .action(() => {
    console.log(chalk.blue.bold('\n🎨 Available Themes:\n'));
    const themes = [
      'dark',
      'light',
      'monokai',
      'nord',
      'dracula',
      'github-dark',
      'github-light',
      'solarized-dark',
      'solarized-light',
    ];
    themes.forEach((theme) => {
      console.log(`  • ${theme}`);
    });
    console.log();
  });

function detectLanguage(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  const langMap: { [key: string]: string } = {
    '.js': 'javascript',
    '.jsx': 'jsx',
    '.ts': 'typescript',
    '.tsx': 'tsx',
    '.py': 'python',
    '.rb': 'ruby',
    '.go': 'go',
    '.rs': 'rust',
    '.java': 'java',
    '.cpp': 'cpp',
    '.c': 'c',
    '.cs': 'csharp',
    '.php': 'php',
    '.swift': 'swift',
    '.kt': 'kotlin',
    '.sh': 'bash',
    '.yaml': 'yaml',
    '.yml': 'yaml',
    '.json': 'json',
    '.md': 'markdown',
    '.html': 'html',
    '.css': 'css',
    '.scss': 'scss',
    '.sql': 'sql',
  };
  return langMap[ext] || 'plaintext';
}

program.parse(process.argv);
