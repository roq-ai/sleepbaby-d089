import * as yup from 'yup';

export const babyValidationSchema = yup.object().shape({
  name: yup.string().required(),
  age: yup.number().integer().required(),
  nap_times: yup.number().integer().nullable(),
  organization_id: yup.string().nullable().required(),
});
