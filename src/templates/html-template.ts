export interface HTMLTemplateOptions {
  highlightedCode: string;
  lineNumbers: boolean;
  background: string;
  padding: number;
  windowControls: boolean;
  title: string;
  shadow: boolean;
}

export function generateHTML(options: HTMLTemplateOptions): string {
  const {
    highlightedCode,
    lineNumbers,
    background,
    padding,
    windowControls,
    title,
    shadow,
  } = options;

  // Determine background style
  const bgStyle = background.includes('gradient')
    ? `background: ${background};`
    : `background-color: ${background};`;

  const shadowStyle = shadow
    ? 'box-shadow: 0 20px 68px rgba(0, 0, 0, 0.55);'
    : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      ${bgStyle}
      padding: ${padding}px;
      font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
    }

    .code-container {
      display: inline-block;
      border-radius: 8px;
      overflow: hidden;
      ${shadowStyle}
    }

    .window-header {
      background: #2d2d2d;
      padding: 12px 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid #1e1e1e;
    }

    .window-controls {
      display: flex;
      gap: 8px;
    }

    .control-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .control-red {
      background: #ff5f56;
    }

    .control-yellow {
      background: #ffbd2e;
    }

    .control-green {
      background: #27c93f;
    }

    .window-title {
      color: #999;
      font-size: 13px;
      margin-left: 8px;
    }

    .code-wrapper {
      overflow: auto;
    }

    pre {
      margin: 0 !important;
      padding: 20px !important;
      ${lineNumbers ? '' : 'counter-reset: none !important;'}
    }

    ${
      !lineNumbers
        ? `
    pre code .line::before {
      display: none !important;
    }
    `
        : ''
    }
  </style>
</head>
<body>
  <div class="code-container">
    ${
      windowControls
        ? `
    <div class="window-header">
      <div class="window-controls">
        <div class="control-dot control-red"></div>
        <div class="control-dot control-yellow"></div>
        <div class="control-dot control-green"></div>
      </div>
      <div class="window-title">${title}</div>
    </div>
    `
        : ''
    }
    <div class="code-wrapper">
      ${highlightedCode}
    </div>
  </div>
</body>
</html>
  `.trim();
}
