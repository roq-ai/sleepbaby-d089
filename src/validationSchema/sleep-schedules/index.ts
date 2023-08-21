import * as yup from 'yup';

export const sleepScheduleValidationSchema = yup.object().shape({
  start_time: yup.date().required(),
  end_time: yup.date().required(),
  sleep_hours: yup.number().integer().nullable(),
  baby_id: yup.string().nullable().required(),
});
