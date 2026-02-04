import puppeteer from 'puppeteer';
import { codeToHtml } from 'shiki';
import * as path from 'path';
import { generateHTML } from './templates/html-template';

export interface SnapshotOptions {
  code: string;
  language: string;
  theme: string;
  outputPath: string;
  lineNumbers: boolean;
  background: string;
  padding: number;
  windowControls: boolean;
  title: string;
  shadow: boolean;
}

export async function generateSnapshot(options: SnapshotOptions): Promise<void> {
  const {
    code,
    language,
    theme,
    outputPath,
    lineNumbers,
    background,
    padding,
    windowControls,
    title,
    shadow,
  } = options;

  // Generate syntax-highlighted HTML using Shiki
  const highlightedCode = await codeToHtml(code, {
    lang: language,
    theme: mapTheme(theme),
  });

  // Wrap in HTML template
  const html = generateHTML({
    highlightedCode,
    lineNumbers,
    background,
    padding,
    windowControls,
    title,
    shadow,
  });

  // Launch headless browser
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Set content
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Get the code container dimensions
    const element = await page.$('.code-container');
    if (!element) {
      throw new Error('Could not find code container');
    }

    const boundingBox = await element.boundingBox();
    if (!boundingBox) {
      throw new Error('Could not get bounding box');
    }

    // Take screenshot
    await element.screenshot({
      path: outputPath,
      omitBackground: true,
    });
  } finally {
    await browser.close();
  }
}

function mapTheme(theme: string): string {
  const themeMap: { [key: string]: string } = {
    dark: 'dark-plus',
    light: 'light-plus',
    monokai: 'monokai',
    nord: 'nord',
    dracula: 'dracula',
    'github-dark': 'github-dark',
    'github-light': 'github-light',
    'solarized-dark': 'solarized-dark',
    'solarized-light': 'solarized-light',
  };
  return themeMap[theme] || 'dark-plus';
}
