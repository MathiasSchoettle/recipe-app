export function formatMinutes(minutes: number): string {
	const hours = Math.floor(minutes / 60)
	minutes = Math.floor(minutes % 60)

	const parts: string[] = []
	if (hours > 0) {
		parts.push(`${hours} hour${hours > 1 ? 's' : ''}`)
	}
	if (minutes > 0 || hours === 0) {
		parts.push(`${minutes} minute${minutes > 1 ? 's' : ''}`)
	}

	return parts.join(' ')
}