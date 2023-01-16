import { pathToFileURL } from 'url';

import { getImportMetadata } from '@/import-metadata';
import { existsAndIsFileSync } from '@/utils/file-system';
import { removeFinalSlash } from '@/utils/path';

export type ResolveArguments = {
	url: string;
	alias: string;
	path: string;
	fromImport: boolean;
};
export function resolve(args: ResolveArguments): URL | null {
	const metadata = getImportMetadata(args);
	if (/^.*\.import\.(sass|scss)/.test(metadata.file) && !args.fromImport) return null;

	if (!metadata.file) {
		const templates = ['{path}/index.sass', '{path}/index.scss'];
		return getFileURLFromTemplates(templates, (template) =>
			template.replace('{path}', removeFinalSlash(metadata.replaced)),
		);
	} else if (metadata.extension) {
		const templates = ['{directory}/{filename}.{extension}', '{directory}/_{filename}.{extension}'];
		return getFileURLFromTemplates(templates, (template) =>
			template
				.replace('{directory}', removeFinalSlash(metadata.directory))
				.replace('{filename}', metadata.filename)
				.replace('{extension}', metadata.extension),
		);
	} else if (metadata.filename) {
		const templates = [
			'{directory}/{filename}.sass',
			'{directory}/{filename}.scss',
			'{directory}/_{filename}.sass',
			'{directory}/_{filename}.scss',
		];
		return getFileURLFromTemplates(templates, (template) =>
			template
				.replace('{directory}', removeFinalSlash(metadata.directory))
				.replace('{filename}', metadata.filename),
		);
	}
	return null;
}

function getFileURLFromTemplates(templates: Array<string>, transform: (string: string) => string): URL | null {
	return templates.reduce<URL | null>((resolved, template) => {
		if (resolved instanceof URL) return resolved;
		const filepath = transform(template);
		return existsAndIsFileSync(filepath) ? pathToFileURL(filepath) : null;
	}, null);
}
