import { removeFinalSlash } from '@/utils/path';

type GetImportMetadataArguments = {
	url: string;
	alias: string;
	path: string;
};
type GetImportMetadataReturn = {
	replaced: string;
	alias: string;
	path: string;
	url: string;
	extension: string;
	file: string;
	filename: string;
	directory: string;
	fromImport?: boolean;
};
export function getImportMetadata(args: GetImportMetadataArguments): GetImportMetadataReturn {
	const path = removeFinalSlash(args.path);
	const alias = removeFinalSlash(args.alias);
	const { url } = args;
	const replaced = url.replace(alias, path);
	const directory = replaced.slice(0, replaced.lastIndexOf('/'));
	const file = replaced.slice(replaced.lastIndexOf('/') + 1);
	const extension = file.includes('.') ? file.slice(file.lastIndexOf('.') + 1, file.length) : '';
	const filename = file.includes('.') ? file.slice(0, file.lastIndexOf('.')) : file;

	return {
		replaced,
		alias,
		path,
		url,
		extension,
		file,
		filename,
		directory,
	};
}
