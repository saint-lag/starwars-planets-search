// React-select:
const AVAILABLE_OPTIONS = [
  { value: 'population', label: 'population' },
  { value: 'orbital_period', label: 'orbital_period' },
  { value: 'rotation_period', label: 'rotation_period' },
  { value: 'surface_water', label: 'surface_water' },
  { value: 'diameter', label: 'diameter' },
];
const REACT_SELECT_STYLES = {
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px dotted pink',
    color: state.isSelected ? 'red' : 'blue',
    padding: 20,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    width: 400,
    backgroundColor: 'white',
  }),
};

// Non React-select:
const AVAILABLE_OPTIONS_ARRAY = [
  'population',
  'orbital_period',
  'rotation_period',
  'surface_water',
  'diameter',
];

export { AVAILABLE_OPTIONS, REACT_SELECT_STYLES, AVAILABLE_OPTIONS_ARRAY };
