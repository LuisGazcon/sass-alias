import fs from 'fs';

export function existsAndIsFileSync(filepath: string) {
	return fs.existsSync(filepath) && fs.lstatSync(filepath).isFile();
}
