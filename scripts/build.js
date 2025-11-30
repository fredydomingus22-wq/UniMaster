import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('src');
const distDir = path.resolve('dist');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyFile(relativePath) {
  const srcPath = path.join(srcDir, relativePath);
  const destPath = path.join(distDir, relativePath);
  ensureDir(path.dirname(destPath));
  fs.copyFileSync(srcPath, destPath);
}

function build() {
  ensureDir(distDir);
  const filesToCopy = ['index.html', 'styles.css'];
  filesToCopy.forEach(copyFile);
  console.log('Build complete. Files written to dist/.');
}

build();
