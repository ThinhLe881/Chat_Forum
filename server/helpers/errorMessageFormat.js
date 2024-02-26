export const errorMessageFormat = (mes) => {
	let newMes = mes.replaceAll('"', '');
	return newMes.charAt(0).toUpperCase() + newMes.slice(1);
};
