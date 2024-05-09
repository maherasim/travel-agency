export default function InputLabelRequire({ value, className = '', children, ...props}) {
    return (
        <label {...props} className={`block font-medium text-sm text-gray-700 ` + className}>
            {value ? value : children}<b className="text-danger">(*)</b>
        </label>
    );
}
