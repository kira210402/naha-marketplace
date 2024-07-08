import { NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { register } from "../../services/Auth";

const RegisterPage = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .matches(
          /^[a-zA-Z0-9_]+$/,
          "Username phải viết liền không dấu và không có ký tự đặc biệt",
        )
        .required("Vui lòng nhập username"),
      email: Yup.string()
        .email("Địa chỉ email không hợp lệ")
        .required("Vui lòng nhập địa chỉ email"),
      password: Yup.string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .matches(/[^a-zA-Z0-9]/, "Mật khẩu phải có ít nhất 1 ký tự đặc biệt")
        .required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await register(values);
        console.log(response);
        if (response) {
          navigate("/");
        }
      } catch (error) {
        console.error("Đăng ký thất bại:", error);
      }
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Đăng Ký</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                className={`relative block w-full rounded-md border ${
                  formik.touched.username && formik.errors.username
                    ? "border-red-500"
                    : "border-gray-300"
                } px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                placeholder="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="mt-2 text-sm text-red-500">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div className="mt-4">
              <label htmlFor="email-address" className="sr-only">
                Địa chỉ email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                className={`relative block w-full rounded-md border ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                placeholder="Địa chỉ email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="mt-2 text-sm text-red-500">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="sr-only">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className={`relative block w-full rounded-md border ${
                  formik.touched.password && formik.errors.password
                    ? "border-red-500"
                    : "border-gray-300"
                } px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm`}
                placeholder="Mật khẩu"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="mt-2 text-sm text-red-500">
                  {formik.errors.password}
                </div>
              ) : null}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Đăng ký
            </button>
          </div>
          <div className="p-0">
            <NavLink
              to="/login"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Đăng nhập
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
