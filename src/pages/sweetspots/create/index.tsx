import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createSweetspot } from 'apiSdk/sweetspots';
import { sweetspotValidationSchema } from 'validationSchema/sweetspots';
import { BabyInterface } from 'interfaces/baby';
import { getBabies } from 'apiSdk/babies';
import { SweetspotInterface } from 'interfaces/sweetspot';

function SweetspotCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SweetspotInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSweetspot(values);
      resetForm();
      router.push('/sweetspots');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SweetspotInterface>({
    initialValues: {
      ideal_sleep_window: new Date(new Date().toDateString()),
      ideal_nap_time: new Date(new Date().toDateString()),
      ideal_night_sleep_time: new Date(new Date().toDateString()),
      baby_id: (router.query.baby_id as string) ?? null,
    },
    validationSchema: sweetspotValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Sweetspots',
              link: '/sweetspots',
            },
            {
              label: 'Create Sweetspot',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Sweetspot
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="ideal_sleep_window" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Ideal Sleep Window
            </FormLabel>
            <DatePicker
              selected={formik.values?.ideal_sleep_window ? new Date(formik.values?.ideal_sleep_window) : null}
              onChange={(value: Date) => formik.setFieldValue('ideal_sleep_window', value)}
            />
          </FormControl>
          <FormControl id="ideal_nap_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Ideal Nap Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.ideal_nap_time ? new Date(formik.values?.ideal_nap_time) : null}
              onChange={(value: Date) => formik.setFieldValue('ideal_nap_time', value)}
            />
          </FormControl>
          <FormControl id="ideal_night_sleep_time" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Ideal Night Sleep Time
            </FormLabel>
            <DatePicker
              selected={formik.values?.ideal_night_sleep_time ? new Date(formik.values?.ideal_night_sleep_time) : null}
              onChange={(value: Date) => formik.setFieldValue('ideal_night_sleep_time', value)}
            />
          </FormControl>
          <AsyncSelect<BabyInterface>
            formik={formik}
            name={'baby_id'}
            label={'Select Baby'}
            placeholder={'Select Baby'}
            fetcher={getBabies}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/sweetspots')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'sweetspot',
    operation: AccessOperationEnum.CREATE,
  }),
)(SweetspotCreatePage);
