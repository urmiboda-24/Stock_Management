export interface ICustomRoute {
  path: string;
  element: React.ReactNode;
  isPrivate: boolean;
  allowedRoles?: string[];
}

export const createInnerRoute = (
  role: string,
  prefixPath: string,
  Component: React.ReactElement
): ICustomRoute => {
  return {
    path: `/${prefixPath}${role}`,
    element: Component,
    isPrivate: true,
    allowedRoles: [role],
  };
};
