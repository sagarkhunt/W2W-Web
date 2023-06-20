import moment from 'moment';

export const dateFormat = date => {	
	return moment(date).format('DD.MM.YYYY');
};

export const dateNewFormatWork = (statDate, endDate) => {
	console.log(moment().format('DD.MM.YYYY'));
	return !statDate && !endDate ? moment(new Date()).format('DD.MM.YYYY') :`${moment(statDate).format('DD.MM')} - ${moment(endDate).format('DD.MM.YYYY')}`;
};


export const currencyConverture = val => {
	return (Math.round((val + Number.EPSILON) * 100) / 100).toFixed(2);
};

export const dateNewFormat = date => {	
	return moment(date).format('MMMM DD, YYYY');
};
