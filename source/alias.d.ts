export type AliasJSON = {
	[index: string]: string;
};

export class Alias {
	readonly unparsed: AliasJSON;
	readonly parsed: AliasJSON;
	constructor(alias: AliasJSON);
	static toPosix: (windowsLikePath: string) => string;
	static parse(unparsed: AliasJSON): AliasJSON;
	getPath(alias: string): string | undefined;
	resolve(url: string): string | undefined;
}
