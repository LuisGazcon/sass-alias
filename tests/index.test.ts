import path from 'path';

import { create } from '@/index';

const importer = create({
	'@resources/': path.join(__dirname, 'resources'),
});

describe('alias function test block', () => {
	test(`@use '@resources/color/' // => @resources/color/index.scss;`, () => {
		const result = importer.canonicalize('@resources/color/', { fromImport: false });
		expect(result?.pathname.endsWith('index.scss')).toBe(true);
	});

	test(`@use '@resources/font' // => @resources/_font.scss;`, () => {
		const result = importer.canonicalize('@resources/font', { fromImport: false });
		expect(result).toBeInstanceOf(URL);
	});

	test(`@import '@resources/color.scss' // @resources/color.scss`, () => {
		const result = importer.canonicalize('@resources/color.scss', { fromImport: true });
		expect(result).toBeInstanceOf(URL);
	});

	test(`@import '@resources/color.import.scss';`, () => {
		const result = importer.canonicalize('@resources/color.import.scss', { fromImport: true });
		expect(result).toBeInstanceOf(URL);
	});

	test(`@import '@resources/color.import.scss';`, () => {
		const result = importer.canonicalize('@resources/color.import.scss', { fromImport: false });
		expect(result).toBe(null);
	});
});
