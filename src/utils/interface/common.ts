import { SvgIconComponent } from "@mui/icons-material";
import { ReactNode } from "react";

export interface ISidebar {
  name: string;
  icon: SvgIconComponent;
  path: string;
}

export interface IRoute {
  id: number;
  path: string;
  component:
    | React.LazyExoticComponent<React.FC<{}>>
    | React.ComponentType<{}>
    | any;
  isProtectedRoute: boolean;
  exact: boolean;
  isAdmin?: boolean;
}

export interface ITextField {
  label: string;
  name?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onBlur?: () => void;
  onChange?: () => void;
  error?: boolean;
  helperText?: string;
  touched?: boolean;
  disabled?: boolean;
}

export interface IPagination {
  search: string;
  sortBy: string;
  sortOrder: string;
  page: number;
  pageSize: number;
}
