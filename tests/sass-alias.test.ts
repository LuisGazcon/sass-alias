import type { ImporterReturnType } from 'sass';
import { SassAlias } from '../source/sass-alias';

describe('sass-alias class test block', () => {
	test('alias object must be equal', () => {
		const posixSassAlias = new SassAlias({
			alias: '/Users/users/example',
		});
		const windowsSassAlias = new SassAlias({
			alias: 'C:\\Users\\users\\example',
		});

		expect(posixSassAlias.getAlias().parsed).toMatchObject(
			windowsSassAlias.getAlias().parsed,
		);
	});

	test('alias object must be equal, but posix alias is registered with a slash at the end', () => {
		const posixSassAlias = new SassAlias({
			alias: '/Users/users/example/',
		});
		const windowsSassAlias = new SassAlias({
			alias: 'C:\\Users\\users\\example',
		});

		expect(posixSassAlias.getAlias().parsed).toMatchObject(
			windowsSassAlias.getAlias().parsed,
		);
	});

	test('alias object must be equal, but windows alias is registered with a back slash at the end', () => {
		const posixSassAlias = new SassAlias({
			alias: '/Users/users/example/',
		});
		const windowsSassAlias = new SassAlias({
			alias: 'C:\\Users\\users\\example\\',
		});

		expect(posixSassAlias.getAlias().parsed).toMatchObject(
			windowsSassAlias.getAlias().parsed,
		);
	});

	test('alias importer must return a correct path using windows path', () => {
		const path = 'C:\\Users\\users\\example';
		const sassAlias = new SassAlias({
			'@alias': path,
		});

		const importer = sassAlias.getImporter();
		const result = importer('@alias/scss/index.scss', '', () => {}) as {
			file: string;
		};
		expect(result.file).toEqual(path + '\\scss\\index.scss');
	});

	test('alias importer must return a correct path', () => {
		const path = 'C:\\Users\\users\\example';
		const sassAlias = new SassAlias({
			'@alias': path,
		});

		const importer = sassAlias.getImporter();
		const result = importer('@alias/scss/index.scss', '', () => {}) as {
			file: string;
		};
		expect(result.file).toEqual(path + '\\scss\\index.scss');
	});

	test('alias importer must return null', () => {
		const path = 'C:\\Users\\users\\example';
		const sassAlias = new SassAlias({
			'@alias': path,
		});

		const importer = sassAlias.getImporter();
		const result = importer('@anotherAlias/scss/index.scss', '', () => {});
		expect(result).toBe(null);
	});
});
