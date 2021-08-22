import { Alias } from '../source/alias';

describe('alias class test block', () => {
	test("test path parsing with 'toPosix' method", () => {
		const windowsLikePath = 'C:\\Users\\user\\Documents';
		const posixPath = '/Users/user/Documents';
		const parsedPath = Alias.toPosix(windowsLikePath);
		console.log(parsedPath);
		expect(parsedPath).toBe(posixPath);
	});
});
