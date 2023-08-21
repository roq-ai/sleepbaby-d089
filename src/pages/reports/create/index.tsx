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

import { createReport } from 'apiSdk/reports';
import { reportValidationSchema } from 'validationSchema/reports';
import { BabyInterface } from 'interfaces/baby';
import { getBabies } from 'apiSdk/babies';
import { ReportInterface } from 'interfaces/report';

function ReportCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ReportInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createReport(values);
      resetForm();
      router.push('/reports');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ReportInterface>({
    initialValues: {
      daily_report: 0,
      weekly_report: 0,
      monthly_report: 0,
      baby_id: (router.query.baby_id as string) ?? null,
    },
    validationSchema: reportValidationSchema,
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
              label: 'Reports',
              link: '/reports',
            },
            {
              label: 'Create Report',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Report
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Daily Report"
            formControlProps={{
              id: 'daily_report',
              isInvalid: !!formik.errors?.daily_report,
            }}
            name="daily_report"
            error={formik.errors?.daily_report}
            value={formik.values?.daily_report}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('daily_report', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Weekly Report"
            formControlProps={{
              id: 'weekly_report',
              isInvalid: !!formik.errors?.weekly_report,
            }}
            name="weekly_report"
            error={formik.errors?.weekly_report}
            value={formik.values?.weekly_report}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('weekly_report', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Monthly Report"
            formControlProps={{
              id: 'monthly_report',
              isInvalid: !!formik.errors?.monthly_report,
            }}
            name="monthly_report"
            error={formik.errors?.monthly_report}
            value={formik.values?.monthly_report}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('monthly_report', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

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
              onClick={() => router.push('/reports')}
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
    entity: 'report',
    operation: AccessOperationEnum.CREATE,
  }),
)(ReportCreatePage);
