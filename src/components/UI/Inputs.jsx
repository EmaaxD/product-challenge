import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  OutlinedInput,
  TextareaAutosize,
  FormGroup,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => ({
  mainSelect: {
    width: ({ matches }) => (matches ? "100%" : 200),

    "& label": {
      color: ({ borderWithe }) => borderWithe && "#ffffffd6 !important",
    },
    "& fieldset": {
      borderColor: ({ borderWithe }) => borderWithe && "#ffffffad !important",
    },
    "& svg": {
      color: ({ borderWithe }) => borderWithe && "#ffffffad !important",
    },
  },
  mainInput: {
    width: ({ matches }) => (matches ? "100%" : 200),
    "& label": {
      color: ({ borderWithe }) => borderWithe && "#ffffffd6 !important",
    },
    "& fieldset": {
      borderColor: ({ borderWithe }) => borderWithe && "#ffffffad !important",
    },
  },
}));

export const MainSelect = ({
  labelId,
  name,
  text,
  value,
  onHandleChange,
  options,
  borderWithe,
}) => {
  const matches = useMediaQuery("(max-width:900px)");

  const classes = useStyles({ borderWithe, matches });

  return (
    <>
      <FormControl size="small" className={classes.mainSelect}>
        <InputLabel id={labelId}>{text}</InputLabel>
        <Select
          labelId={labelId}
          id={name}
          name={name}
          value={value}
          label={text}
          onChange={onHandleChange}
        >
          <MenuItem selected value={""}>
            Seleccione una opcion
          </MenuItem>
          {options &&
            options.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.text}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
};

export const MainInput = ({
  name,
  type = "text",
  value,
  text,
  borderWithe,
  placeholder,
  onHandleChange,
}) => {
  const matches = useMediaQuery("(max-width:900px)");

  const classes = useStyles({ borderWithe, matches });

  return (
    <>
      <TextField
        size="small"
        type={type}
        id={name}
        name={name}
        value={value}
        label={text}
        className={classes.mainInput}
        variant="outlined"
        placeholder={placeholder}
        onChange={onHandleChange}
      />
    </>
  );
};

export const MultipleSelect = ({
  name,
  labelId,
  text,
  value,
  options,
  onHandleChange,
}) => {
  const MenuProps = {
    PaperProps: {
      style: {
        width: 200,
      },
    },
  };

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName?.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const theme = useTheme();

  const matches = useMediaQuery("(max-width:900px)");

  return (
    <>
      <FormControl sx={{ width: matches ? "100%" : 200 }} size="small">
        <InputLabel id={labelId}>{text}</InputLabel>
        <Select
          labelId={labelId}
          id={name}
          name={name}
          multiple
          value={value}
          onChange={onHandleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              style={getStyles(option.value, value, theme)}
            >
              {option.text}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export const TextAreaProduct = ({ name, value, onHandleChange }) => {
  const matches = useMediaQuery("(max-width:900px)");

  return (
    <>
      <TextareaAutosize
        aria-label="minimum height"
        name={name}
        value={value}
        minRows={3}
        placeholder="Descripcion del producto"
        onChange={onHandleChange}
        style={{ width: matches ? "100%" : 410 }}
      />
    </>
  );
};

export const CheckAviableOff = ({ name, checked, text, onHandleChange }) => {
  return (
    <>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox name={name} checked={checked} onChange={onHandleChange} />
          }
          label={text}
        />
      </FormGroup>
    </>
  );
};
