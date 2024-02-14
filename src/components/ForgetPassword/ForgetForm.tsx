import React from "react";

type Props = {
  name: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setValue: (value: React.SetStateAction<string>) => void;
  loading: boolean;
  placeholder?: string;
  btnName?: string;
  disabled?: boolean;
  showButton?: boolean;
};

const ForgetForm: React.FC<Props> = ({
  name,
  handleSubmit,
  setValue,
  loading,
  placeholder,
  btnName,
  disabled,
  showButton,
}) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="mt-4 w-full">
        <label className="block font-medium">{name}</label>
        <div className="flex flex-row items-end">
          <input
            type="text"
            placeholder={placeholder ? placeholder : name}
            name={name}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            className="px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 disabled:bg-slate-200"
            required
            disabled={disabled || loading}
          />
          {showButton ? (
            <button
              className="w-full px-3 py-2 mx-3 mt-4 text-white font-semibold bg-emerald-600 rounded-lg hover:bg-black hover:text-white transition ease-linear duration-200 disabled:bg-emerald-500 "
              type="submit"
              disabled={disabled || loading}
            >
              {btnName ? btnName : "Submit"}
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default ForgetForm;
