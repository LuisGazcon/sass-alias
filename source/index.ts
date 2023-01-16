import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import { extname } from 'path';

import type { Importer, Syntax } from 'sass';

import { resolve } from '@/resolve';

export function create(config: Record<string, string>): Importer<'sync'> {
	const entries = Object.entries(config);

	return {
		canonicalize(requestedUrl, { fromImport }) {
			return entries.reduce<URL | null>((resolved, [alias, path]) => {
				if (resolved) return resolved;
				if (requestedUrl.startsWith(alias)) return resolve({ url: requestedUrl, alias, path, fromImport });
				return null;
			}, null);
		},
		load(canonicalUrl) {
			const filepath = fileURLToPath(canonicalUrl);
			const extension = extname(filepath).replace('.', '');
			const contents = readFileSync(filepath).toString();

			return {
				syntax: (extension === 'sass' ? 'indented' : extension) as Syntax,
				contents,
			};
		},
	};
}
