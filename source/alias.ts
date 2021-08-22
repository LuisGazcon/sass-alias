export type AliasJSON = {
	[index: string]: string;
};

export class Alias {
	public readonly unparsed: AliasJSON;
	public readonly parsed: AliasJSON;

	public constructor(alias: AliasJSON) {
		this.unparsed = alias;
		this.parsed = Alias.parse(this.unparsed);
	}

	public static toPosix = (windowsLikePath: string): string =>
		windowsLikePath.replace(/\\/g, '/').replace(/^[a-zA-Z]:/, '');

	public static parse(unparsed: AliasJSON): AliasJSON {
		return Object.keys(unparsed).reduce<AliasJSON>((prev, curr) => {
			const parsed = Alias.toPosix(unparsed[curr] as string);
			return {
				...prev,
				[curr]:
					parsed.charAt(parsed.length - 1) === '/'
						? parsed.slice(0, parsed.length - 1)
						: parsed,
			};
		}, {});
	}

	public getPath(alias: string): string | undefined {
		return this.parsed[alias];
	}

	public resolve(url: string): string | undefined {
		for (let alias in this.parsed) {
			if (url.startsWith(alias)) {
				return this.parsed[alias] + url.replace(alias, '');
			}
		}
		return undefined;
	}
}
