// site global configs
export const siteGlobalConfigs = {
	w2wServiceFeePercentage: 7.44,
	insuranceAndSocialFeePercentage: 4.38,
};

// gender options
export const genderOptions = [
	{
		label: 'dropDown.Male',
		value: 'male',
	},
	{
		label: 'dropDown.Female',
		value: 'female',
	},
	{
		label: 'dropDown.Other',
		value: 'other',
	},
];

// organization options
export const organizationOptions = [
	{
		label: 'dropDown.Private',
		value: 'private',
	},
	{
		label: 'dropDown.Public',
		value: 'public',
	},
	{
		label: 'dropDown.Government',
		value: 'government',
	},
];

// no of employees options
export const noOfEmployeesOptions = [
	{
		label: '1-10',
		value: '1-10',
	},
	{
		label: '11-50',
		value: '11-50',
	},
	{
		label: '51-100',
		value: '51-100',
	},
	{
		label: '101-300',
		value: '101-300',
	},
	{
		label: '301-600',
		value: '301-600',
	},
	{
		label: '601-1000',
		value: '601-1000',
	},
	{
		label: '1001-1500',
		value: '1001-1500',
	},
	{
		label: '1501-2000',
		value: '1501-2000',
	},
	// {
	// 	label: 'More than 2000',
	// 	value: 'more than 2000',
	// },
];

// contract types
export const contractTypeOptions = [
	{
		label: 'dropDown.Hours',
		value: 'hours',
	},
	{
		label: 'dropDown.Pcs',
		value: 'pieces',
	},
];

// Account types
export const accountTypeOptions = [
	{
		label: 'dropDown.LightEntrepreneur',
		value: 'jobseeker',
	},
	{
		label: 'dropDown.PrivateCustomer',
		value: 'private',
	},
	{
		label: 'dropDown.Business',
		value: 'public',
	},
];

// vat types
export const vatTypeOptions = [
	{
		label: '0%',
		value: '0',
	},
	{
		label: '10 %',
		value: '10',
	},
	{
		label: '14 %',
		value: '14',
	},
	{
		label: '24 %',
		value: '24',
	},
];

// gig mode options
export const gigModeOptions = [
	{
		label: 'dropDown.HomeBased',
		value: 'home_based',
	},
	{
		label: 'dropDown.PartTime',
		value: 'part_time',
	},
	{
		label: 'dropDown.FullTime',
		value: 'full_time',
	},
];

export const vehicleClassTypes = [
	{
		label: 'dropDown.OwnCar',
		value: 'own_car',
	},
];
export const vehicleSubClassTypes = [
	{
		label: 'dropDown.Trailer',
		value: 'trailer',
	},
	{
		label: 'dropDown.Carvan',
		value: 'carvan',
	},
	{
		label: 'dropDown.Bigcarvan',
		value: 'bigcarvan',
	},
];

// vat types
export const vatTypeOptionsNew = [
	{
		label: '0%',
		value: '0',
	},
	{
		label: '10 %',
		value: '10',
	},
	{
		label: '14 %',
		value: '14',
	},
	{
		label: '24 %',
		value: '24',
	},
];

// shaerd types
export const shardType = [
	{
		label: 'dropDown.Percentage',
		value: 'percentage',
	},
	{
		label: 'dropDown.Amount',
		value: 'amount',
	},
];
//job post status
export const jobPostStatus = [
	{
		label: 'dropDown.Active',
		value: 'active',
	},
	{
		label: 'dropDown.Blocked',
		value: 'blocked',
	},
	{
		label: 'dropDown.Completed',
		value: 'completed',
	},
];

//Gig Type
export const gigTypes = [
	{
		label: 'dropDown.Permanent',
		value: 'permanent',
	},
	{
		label: 'dropDown.Temporary',
		value: 'temporary',
	},
	{
		label: 'dropDown.FullTime',
		value: 'full_time',
	},
	{
		label: 'dropDown.PartTime',
		value: 'part_time',
	},
	{
		label: 'dropDown.OnCallWork',
		value: 'On_call_work',
	},
];
//kilometer allowance
export const invoiceAllownceTracer = {
	transported_heavyloads: 0.23,
	driven_in_rough_terrain: 0.1,
	vehicle_subclass: 0.08,
	distanceAllownce: 0.46,
};

// google map autocomplete restriction
export const gAuComRestriction = { country: ['fi', 'ee', 'se', 'no', 'ru', 'lv', 'lt'] };

// payment terms types
export const paymrntTermsOptions = [
	{
		label: '3',
		value: '3',
	},
	{
		label: '7',
		value: '7',
	},
	{
		label: '14',
		value: '14',
	},
	{
		label: '21',
		value: '21',
	},
	{
		label: '30',
		value: '30',
	},
	{
		label: '60',
		value: '60',
	},
];

//resume status
export const resumesRequestStatus = [
	{
		label: 'dropDown.Approved',
		value: 'approved',
	},
	{
		label: 'dropDown.Declined',
		value: 'declined',
	},
];

//invoice filter statau
export const invoiceFilterStatus = [
	{
		label: 'dropDown.Waiting',
		value: 'waiting',
	},
	{
		label: 'dropDown.Approved',
		value: 'approved',
	},
	{
		label: 'dropDown.Credited',
		value: 'credited',
	},
	{
		label: 'dropDown.Paid',
		value: 'paid',
	},
	{
		label: 'dropDown.Unpaid',
		value: 'unpaid',
	},
	{
		label: 'dropDown.PartiallyPaid',
		value: 'partially_paid',
	},
];