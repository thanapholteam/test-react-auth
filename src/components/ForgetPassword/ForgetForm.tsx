import React from "react";

type Props = {
  name: string;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setValue: (value: React.SetStateAction<string>) => void;
  loading: boolean;
  btnName?: string;
};

const ForgetForm: React.FC<Props> = ({
  name,
  handleSubmit,
  setValue,
  loading,
  btnName
}) => {
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <div className="mt-4">
        <label className="block font-medium">
          {name}
          <label>
            <input
              type="text"
              placeholder={name}
              name={name}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
              required
            />
          </label>
        </label>
      </div>
      <div className="text-center">
        <button
          className="px-6 py-2 mt-4 text-white font-semibold bg-emerald-600 rounded-lg hover:bg-black hover:text-white transition ease-linear duration-200"
          type="submit"
          disabled={loading}
        >
          {btnName ? btnName : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default ForgetForm;
