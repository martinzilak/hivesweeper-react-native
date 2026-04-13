export const Index = '/';

const Routes = ['home', 'policy'] as const;
const Route: Record<
  (typeof Routes)[number],
  {
    path: string;
    displayName?: string;
  }
> = {
  home: { path: '' },
  policy: { path: 'policy', displayName: 'privacy policy' },
};

type SiteRoute = Record<
  keyof typeof Route,
  {
    path: string;
    fullPath: string;
    name: string;
    displayName: string;
  }
>;

export const SiteRoute: SiteRoute = Object.entries(Route).reduce(
  (acc, [name, { path, displayName }]) => ({
    ...acc,
    [name]: {
      path,
      fullPath: `${Index}${path}`,
      name,
      displayName: displayName?.toUpperCase() ?? name.toUpperCase(),
    },
  }),
  {} as SiteRoute,
);
