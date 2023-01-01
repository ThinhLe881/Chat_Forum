export const transactionOptions = {
	readConcern: { level: 'snapshot' },
	writeConcern: { w: 'majority' },
	readPreference: 'primary',
};
