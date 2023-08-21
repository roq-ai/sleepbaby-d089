import * as yup from 'yup';

export const reportValidationSchema = yup.object().shape({
  daily_report: yup.number().integer().nullable(),
  weekly_report: yup.number().integer().nullable(),
  monthly_report: yup.number().integer().nullable(),
  baby_id: yup.string().nullable().required(),
});
