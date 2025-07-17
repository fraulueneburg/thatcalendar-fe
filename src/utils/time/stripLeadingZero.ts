const stripLeadingZero = (time: string): string => time.replace(/^0(?=\d)/, '')
export { stripLeadingZero }
