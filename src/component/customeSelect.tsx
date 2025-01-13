import React from "react";
import { styled } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { Box, SelectChangeEvent } from "@mui/material";

interface CommonSelectProps {
  label?: string;
  value: string;
  onChange?: (event: SelectChangeEvent) => void;
  type?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  customStyle?: React.CSSProperties;
  options: { value: string | number; label: string | number }[];
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const SelectBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  height: "40px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    height: "100%",
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.dark,
    },
  },
  "& .MuiSelect-select": {
    padding: "22px",
  },
  "& .MuiFormHelperText-root": {
    margin: "3px 14px 0 14px",
  },
}));

const StyledPlaceholder = styled(MenuItem)(({ theme }) => ({
  color: theme.palette.text.disabled,
  padding: 0,
}));

const CommonSelect: React.FC<CommonSelectProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  error = false,
  helperText = "",
  disabled = false,
  fullWidth = true,
  customStyle = {},
  options,
  onBlur,
  ...rest
}) => {
  return (
    <SelectBox style={customStyle}>
      <Select
        {...rest}
        value={value}
        label={label}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        disabled={disabled}
        fullWidth={fullWidth}
        displayEmpty
        renderValue={(selected) => {
          if (!selected) {
            return <StyledPlaceholder>{placeholder}</StyledPlaceholder>;
          }

          return selected;
        }}
      >
        <MenuItem disabled value="">
          {placeholder}
        </MenuItem>
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </SelectBox>
  );
};

export default CommonSelect;
