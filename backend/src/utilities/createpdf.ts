import { User } from '../entities/User';
import * as fs from 'fs';
import * as path from 'path';
import { ASSETS_DIR } from '../app.module';
import { generatePdf } from 'pdf-master';
import { EstateManager } from '../entities/EstateManager';

export async function createPDF(user: User | EstateManager) {
  const currentDate = new Date();
  const imgBuffer = fs.readFileSync(path.join(ASSETS_DIR, 'i', 'logo.jpeg'));
  const base64Image = imgBuffer.toString('base64');
  const imgSrcString = 'data:image/jpeg;base64,' + base64Image;
  const data = {
    name: user.fullname,
    date: currentDate.toDateString(),
    image: imgSrcString,
  };
  const options = {
    displayHeaderFooter: false,
    format: 'A4',
    margin: { top: '80px', bottom: '100px' },
  };
  const template = path.join(ASSETS_DIR, 'pdf_template.html');
  const output: {
    success: boolean;
    filePath: string | null;
    err: string | null;
  } = {
    success: false,
    filePath: null,
    err: null,
  };
  try {
    const pdf = await generatePdf(template, data, options);
    const filename = user.email.replace('@', '').replace('.', '-') + '.pdf';
    const filePath = path.join(__dirname, filename);
    try {
      fs.writeFileSync(filePath, pdf);
      output.success = true;
      output.filePath = filePath;
      output.err = null;
    } catch (err) {
      output.success = false;
      output.err = err.toString();
    }
  } catch (err) {
    output.success = false;
    output.err = err.toString();
  }
  return output;
}
