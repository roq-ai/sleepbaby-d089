const mapping: Record<string, string> = {
  babies: 'baby',
  organizations: 'organization',
  reports: 'report',
  'sleep-schedules': 'sleep_schedule',
  sweetspots: 'sweetspot',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
