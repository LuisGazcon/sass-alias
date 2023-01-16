export function removeFinalSlash(string: string) {
	if (string.charAt(string.length - 1) == '/') return string.substring(0, string.length - 1);
	else return string;
}
