import type { Importer } from 'sass';

export class SassAlias {
	private readonly alias;
	constructor(alias: AliasJSON);
	getAlias(): Alias;
	getImporter(): Importer;
}
