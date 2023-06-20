import moment from 'moment';

export default {
	// get employer list - user specific
	getEmployerList: state => {
		const h = state.employerList.reduce((acc, item) => {
			acc.push({
				...item,
				value: item.company.id,
				label: item.company.company_name,
			});

			return acc;
		}, []);

		return h;
	},

	// get employer details
	getEmployerDetails: state => {
		return state.employerDetail || {};
	},

	// get invoice list - job seeker
	getJobSeekerInvoiceList: state => {
		return state.invoiceList || [];
	},

	// get invoice edit info - job seeker
	getJobSeekerInvoiceEditInfo: state => {
		return state.invoiceInfo || {};
	},

	// get invoice list - com pany
	getCompanyTeamInvoiceList: state => {
		return state.comnapnyInvoiceList || [];
	},

	// get invoice company view details
	getInvoiceCompnayDetails: state => {
		return state.invoiceCompanyDetail || {};
	},

	//team group options
	getTeamGroupOptions: state => {
		return state.teamGroupList.reduce((acc, item) => {
			acc.push({ ...item, value: item.id });
			return acc;
		}, []);
	},

	// get invoice seker view details
	getTeamInvoiceSeekerDetails: state => {
		return state.teaminvoiceSeekerDetail || {};
	},

	// get invoice company view details
	getTeamInvoiceCompanyDetails: state => {
		return state.teamInvoiceCompanyDetail || {};
	},

	/**
	 * Get Selected team detail
	 * @param {*} state
	 * @returns <Array>
	 */
	getTeamInvoiceDetail: state => {
		return state.teamWorkDetailList;
	},

	/**
	 * Get Selected team details members
	 * @param {*} state
	 * @returns <Array>
	 */
	getTeamMembersFromTeamImvoice: state => {
		return (
			state.teamWorkDetailList?.team_members?.map(x => ({
				id: x.id,
				seekerId: x.seekerId,
				seeker_total_work_amount: x.seeker_total_work_amount,
				status: x.status,
				teamId: x.teamId,
				seeker: {
					user: {
						email: x.seeker.user.email,
						file_path: x.seeker.user.file_path,
						full_name: x.seeker.user.full_name,
					},
					work_hours: x.seeker.work_hours,
					tax: {
						min: x.seeker.min_personal_tax,
						max: x.seeker.max_personal_tax,
					},
				},
				tax_percentage: x.seeker_tax_percentage,
				total_compensation: x.seeker_total_compensation,
				total_work_amount: x.seeker_total_work_amount,
				amountWillPaid: x.seeker_sub_total,
				TotalWorkValue: x.seeker_total_worked_value,
				VatAddedValue: x.seeker_work_vat_value,
				TotalCompensation: x.seeker_total_compensation,
				GrossSalary: x.seeker_gross_salary,
				TaxableAmount: x.seeker_tax_amount,
				HoursAmountAfterTax: x.seeker_hours_amount_after_tax,
				MisbCommissionAmount: x.seeker_misb_commission_amount,
				W2WCommissionAmount: x.seeker_w2w_commission_amount,
				CommissionAmount: x.seeker_commission_amount,
				PersonalTax: x.seeker_tax_percentage,
				quickpayPercentage: x.seeker_quick_pay_percentage,
				remainingTaxCardLimit: x.remainingTaxCardLimit,
				taxCardFlag: x.taxCardFlag,
			})) || []
		);
	},

	/**
	 * Get Selected team detail for edit team invoice
	 * @param {*} state
	 * @returns <Array>
	 */
	getEditTeamInvoiceDetail: state => {
		return state.editTeamWorkDetailList;
	},

	/**
	 * Get attachment from edit team invoice
	 * @param {*} state
	 * @returns <Array>
	 */
	getEditAttachmentFromTeamInvoice: state => {
		return state.editTeamWorkDetailList?.invoice_files?.map(x => ({
			purchase_place: x.purchase_place || '',
			purchase_date: x.purchase_date == null ? null : moment(x.purchase_date).format('YYYY/MM/DD'),
			receipt_file: x.receipt_file,
			contractFile: x.file_path || null,
			contractFilePreview: x.file_path || null,
			file_path: x.file_path || null,
		}));
	},

	/**
	 * Get Selected team details members for edit team invoice
	 * @param {*} state
	 * @returns <Array>
	 */
	getEditTeamMembersFromTeamImvoice: state => {
		return (
			state.editTeamWorkDetailList?.invoice_seekers?.map(x => ({
				id: x.id,
				seekerId: x.seekerId,
				seeker_total_work_amount: x.worked_value,
				seeker: {
					user: {
						email: x.seeker.user.email,
						file_path: x.seeker.user.file_path,
						full_name: x.seeker.user.full_name,
					},
					work_hours: x.workHours,
				},
				tax_percentage: x.tax,
				total_compensation: x.compensation_amount,
				total_work_amount: x.worked_value,
				amountWillPaid: x.sub_total,
				quickpayPercentage: x.quick_pay_percentage,
			})) || []
		);
	},

	/**
	 * calculate remaining work value of seeker
	 * For Add New Invoice
	 * */
	calculateRemainingWorkValueOfSeeker: state => {
		return index => {
			return Number(state.paymentSharing[index].shared_amount);
		};
	},

	/**
	 * calculate gross salary of seeker
	 * For Add New Invoice
	 */
	calculateGrossSalaryOfSeeker: (state, { calculateRemainingWorkValueOfSeeker }) => {
		return (index, vat = localStorage.getItem('teamInvoiceVat') || 0) => {
			return (calculateRemainingWorkValueOfSeeker(index));
		};
	},

	/**
	 * calculate taxable amount of seeker
	 * For Add New Invoice
	 */
	calculateTaxableAmountOfSeeker: (state, { calculateGrossSalaryOfSeeker, getTeamMembersFromTeamImvoice }) => {
		return index => {
			const grossSalary = calculateGrossSalaryOfSeeker(index);
			let tax = 0;
			if (getTeamMembersFromTeamImvoice[index].taxCardFlag) {
				const remainingTaxCardLimit = getTeamMembersFromTeamImvoice[index].remainingTaxCardLimit;
				if (remainingTaxCardLimit > grossSalary) {
					tax += (grossSalary * Number(getTeamMembersFromTeamImvoice[index].seeker.tax.min)) / 100;
				} else {
					if (remainingTaxCardLimit > 0) {
						tax += (remainingTaxCardLimit * Number(getTeamMembersFromTeamImvoice[index].seeker.tax.min)) / 100;
						tax += ((grossSalary - remainingTaxCardLimit) * Number(getTeamMembersFromTeamImvoice[index].seeker.tax.max)) / 100;
					} else {
						tax += (grossSalary * Number(getTeamMembersFromTeamImvoice[index].seeker.tax.max)) / 100;
					}
				}
			} else {
				tax += (grossSalary * 60) / 100;
			}
			return tax;
		};
	},

	/**
	 * calculate hours amount after tax applied of seeker
	 * For Add New Invoice
	 */
	calculateHourAmountAfterTaxableAmountOfSeeker: (state, { calculateGrossSalaryOfSeeker, calculateTaxableAmountOfSeeker }) => {
		return index => {
			return calculateGrossSalaryOfSeeker(index) - calculateTaxableAmountOfSeeker(index);
		};
	},

	/**
	 * calculate misb commission of seeker
	 * For Add New Invoice
	 */
	calculateMISBCommisionOfSeeker: (state, { calculateGrossSalaryOfSeeker }) => {
		return index => {
			return calculateGrossSalaryOfSeeker(index) * (state.teamWorkDetailList.misb_commission / 100);
		};
	},
	/**
	 * calculate HealthInsurance of seeker
	 * For Add New Invoice
	 */
	calculateHealthInsuranceOfSeeker: (state, { calculateGrossSalaryOfSeeker }) => {
		return index => {
			return calculateGrossSalaryOfSeeker(index) * (state.teamWorkDetailList.health_insurance / 100) || 0;
		};
	},
	/**
	 * calculate Accident Insurance of seeker
	 * For Add New Invoice
	 */
	calculateAccidentInsuranceOfSeeker: (state, { calculateGrossSalaryOfSeeker }) => {
		return index => {
			return calculateGrossSalaryOfSeeker(index) * (state.teamWorkDetailList.accident_insurance / 100) || 0;
		};
	},

	/**
	 * calculate W2W Invoice
	 * For Add New Invoice
	 */
	calculateW2WCommisionOfSeeker: (state, { calculateRemainingWorkValueOfSeeker }) => {
		return (index, vat = localStorage.getItem('teamInvoiceVat') || 0) => {
			return (calculateRemainingWorkValueOfSeeker(index) * state.teamWorkDetailList.w2w_commission) / 100 ;
		};
	},

	/**
	 * calculate Quickpay commission
	 * For Add New Invoice
	 */
	calculateQuickPayCommisionOfSeeker: (state, { calculateRemainingWorkValueOfSeeker, getTeamMembersFromTeamImvoice }) => {
		return (index, vat = localStorage.getItem('teamInvoiceVat') || 0, quickPayStat = JSON.parse(localStorage.getItem('quickPayStat')) || false) => {
			if (!quickPayStat) return 0;

			return (calculateRemainingWorkValueOfSeeker(index) * (getTeamMembersFromTeamImvoice[index].quickpayPercentage / 100));
		};
	},

	/**
	 * calculate commision amount of seeker
	 * For Add New Invoice
	 */
	calculateCommisionAmountOfSeeker: (state, { calculateHealthInsuranceOfSeeker,calculateAccidentInsuranceOfSeeker, calculateW2WCommisionOfSeeker, calculateQuickPayCommisionOfSeeker }) => {
		return index => {
			return calculateHealthInsuranceOfSeeker(index) + calculateAccidentInsuranceOfSeeker(index) + calculateW2WCommisionOfSeeker(index) + calculateQuickPayCommisionOfSeeker(index);
		};
	},

	/**
	 * calculate total of seeker
	 * For Add New Invoice
	 */
	calculateTotalOfSeeker: (state, { calculateHourAmountAfterTaxableAmountOfSeeker, calculateCommisionAmountOfSeeker, getTeamMembersFromTeamImvoice }) => {
		return index => {
			return calculateHourAmountAfterTaxableAmountOfSeeker(index) - calculateCommisionAmountOfSeeker(index) + Number(getTeamMembersFromTeamImvoice[index].TotalCompensation);
		};
	},

	/**
	 * calculate remaining work value of seeker
	 * For Edit New Invoice
	 * */
	editCalculateRemainingWorkValueOfSeeker: state => {
		return index => {
			return Number(state.editPaymentSharing[index].shared_amount);
		};
	},

	/**
	 * calcualte gross salary of seeker
	 * For Edit New Invoice
	 */
	editCalculateGrossSalaryOfSeeker: (state, { editCalculateRemainingWorkValueOfSeeker }) => {
		return (index, vat = localStorage.getItem('teamInvoiceVat') || 0) => {
			return (editCalculateRemainingWorkValueOfSeeker(index));
		};
	},

	/**
	 * calculate taxable amount of seeker
	 * For Edit New Invoice
	 */
	editCalculateTaxableAmountOfSeeker: (state, { editCalculateGrossSalaryOfSeeker, getEditTeamMembersFromTeamImvoice }) => {
		return index => {
			return editCalculateGrossSalaryOfSeeker(index) * (Number(getEditTeamMembersFromTeamImvoice[index].tax_percentage) / 100);
		};
	},

	/**
	 * calculate hours amount after tax applied of seeker
	 * For Edit New Invoice
	 */
	editCalculateHourAmountAfterTaxableAmountOfSeeker: (state, { editCalculateGrossSalaryOfSeeker, editCalculateTaxableAmountOfSeeker }) => {
		return index => {
			return editCalculateGrossSalaryOfSeeker(index) - editCalculateTaxableAmountOfSeeker(index);
		};
	},

	/**
	 * calculate misb commission of seeker
	 * For Edit New Invoice
	 */
	editCalculateMISBCommisionOfSeeker: (state, { editCalculateGrossSalaryOfSeeker }) => {
		return index => {
			return editCalculateGrossSalaryOfSeeker(index) * (state.editTeamWorkDetailList.misb_commission / 100);
		};
	},

	/**
	 * calculate HealthInsurance of seeker
	 * For Add New Invoice
	 */
	editCalculateHealthInsuranceOfSeeker: (state, { editCalculateGrossSalaryOfSeeker }) => {
		return index => {
			return editCalculateGrossSalaryOfSeeker(index) * (state.editTeamWorkDetailList.health_insurance / 100) || 0;
		};
	},
	/**
	 * calculate Accident Insurance of seeker
	 * For Add New Invoice
	 */
	editCalculateAccidentInsuranceOfSeeker: (state, { editCalculateGrossSalaryOfSeeker }) => {
		return index => {
			return editCalculateGrossSalaryOfSeeker(index) * (state.editTeamWorkDetailList.accident_insurance / 100) || 0;
		};
	},

	/**
	 * calculate W2W Invoice
	 * For Edit New Invoice
	 */
	editCalculateW2WCommisionOfSeeker: (state, { editCalculateRemainingWorkValueOfSeeker }) => {
		return (index, vat = Number(localStorage.getItem('teamInvoiceVat') || 0)) => {
			return (editCalculateRemainingWorkValueOfSeeker(index) * (state.editTeamWorkDetailList.w2w_commission / 100));
		};
	},

	/**
	 * calculate Quickpay commission
	 * For Edit New Invoice
	 */
	editCalculateQuickPayCommisionOfSeeker: (state, { editCalculateRemainingWorkValueOfSeeker, getEditTeamMembersFromTeamImvoice }) => {
		return (index, vat = Number(localStorage.getItem('teamInvoiceVat') || 0), quickPayStat = Boolean(localStorage.getItem('quickPayStat') || false)) => {
			if (!quickPayStat) return 0;
			return (editCalculateRemainingWorkValueOfSeeker(index) * (getEditTeamMembersFromTeamImvoice[index].quickpayPercentage / 100));
		};
	},

	/**
	 * calculate commision amount of seeker
	 * For Edit New Invoice
	 */
	editCalculateCommisionAmountOfSeeker: (state, { editCalculateHealthInsuranceOfSeeker,editCalculateAccidentInsuranceOfSeeker, editCalculateW2WCommisionOfSeeker, editCalculateQuickPayCommisionOfSeeker }) => {
		return index => {
			return editCalculateHealthInsuranceOfSeeker(index) + editCalculateAccidentInsuranceOfSeeker(index) + editCalculateW2WCommisionOfSeeker(index) + editCalculateQuickPayCommisionOfSeeker(index);
		};
	},

	/**
	 * calculate total of seeker
	 * For Edit New Invoice
	 */
	editCalculateTotalOfSeeker: (state, { editCalculateHourAmountAfterTaxableAmountOfSeeker, editCalculateCommisionAmountOfSeeker, getEditTeamMembersFromTeamImvoice }) => {
		return index => {
			return editCalculateHourAmountAfterTaxableAmountOfSeeker(index) - editCalculateCommisionAmountOfSeeker(index) + Number(getEditTeamMembersFromTeamImvoice[index].total_compensation);
		};
	},
};
