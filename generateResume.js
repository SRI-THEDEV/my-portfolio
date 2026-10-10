import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.resolve(__dirname, 'client/public');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const sourcePdf = path.join(targetDir, 'Sri_Nataraj_Y_Resume.pdf');
const alias = path.join(targetDir, 'resume.pdf');

if (fs.existsSync(sourcePdf)) {
  fs.copyFileSync(sourcePdf, alias);
  console.log('✓ Successfully synchronized updated resume to:');
  console.log(` - ${sourcePdf}`);
  console.log(` - ${alias}`);
} else {
  console.error(`Error: Source resume not found at ${sourcePdf}`);
}
