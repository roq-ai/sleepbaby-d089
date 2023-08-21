import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import {
  authorizationValidationMiddleware,
  errorHandlerMiddleware,
  notificationHandlerMiddleware,
} from 'server/middlewares';
import { babyValidationSchema } from 'validationSchema/babies';
import { convertQueryToPrismaUtil, getOrderByOptions, parseQueryParams } from 'server/utils';
import { getServerSession } from '@roq/nextjs';
import { GetManyQueryOptions } from 'interfaces';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getBabies();
    case 'POST':
      return createBaby();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getBabies() {
    const {
      limit: _limit,
      offset: _offset,
      order,
      ...query
    } = parseQueryParams(req.query) as Partial<GetManyQueryOptions>;
    const limit = parseInt(_limit as string, 10) || 20;
    const offset = parseInt(_offset as string, 10) || 0;
    const response = await prisma.baby
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findManyPaginated({
        ...convertQueryToPrismaUtil(query, 'baby'),
        take: limit,
        skip: offset,
        ...(order?.length && {
          orderBy: getOrderByOptions(order),
        }),
      });
    return res.status(200).json(response);
  }

  async function createBaby() {
    await babyValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.report?.length > 0) {
      const create_report = body.report;
      body.report = {
        create: create_report,
      };
    } else {
      delete body.report;
    }
    if (body?.sleep_schedule?.length > 0) {
      const create_sleep_schedule = body.sleep_schedule;
      body.sleep_schedule = {
        create: create_sleep_schedule,
      };
    } else {
      delete body.sleep_schedule;
    }
    if (body?.sweetspot?.length > 0) {
      const create_sweetspot = body.sweetspot;
      body.sweetspot = {
        create: create_sweetspot,
      };
    } else {
      delete body.sweetspot;
    }
    const data = await prisma.baby.create({
      data: body,
    });
    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
