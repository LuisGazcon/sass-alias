import path from 'path';
import type { Importer } from 'sass';

import { Alias, AliasJSON } from './alias';

type ImporterReturn = {
	file: string;
} | null;

export class SassAlias {
	private readonly alias: Alias;

	constructor(alias: AliasJSON) {
		this.alias = new Alias(alias);
	}

	public getAlias(): Alias {
		return this.alias;
	}

	public getImporter(): Importer {
		return (url: string): ImporterReturn => {
			const resolvedUrl = this.alias.resolve(url);
			return resolvedUrl ? { file: path.resolve(resolvedUrl) } : null;
		};
	}
}
