const Select = ({
  id = '',
  label = '',
  options = [],
  value,
  onChange,
  disabled,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="mt-2 block w-full p-2 border border-gray-300 rounded-md"
      >
        <option value="">Select {label.toLowerCase()}</option>
        {!!options.length ? (
          options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No one {label.toLowerCase()}...
          </option>
        )}
      </select>
    </div>
  );
};

export default Select;
