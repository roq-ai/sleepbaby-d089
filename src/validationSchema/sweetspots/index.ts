import * as yup from 'yup';

export const sweetspotValidationSchema = yup.object().shape({
  ideal_sleep_window: yup.date().nullable(),
  ideal_nap_time: yup.date().nullable(),
  ideal_night_sleep_time: yup.date().nullable(),
  baby_id: yup.string().nullable().required(),
});
