import { FormValues } from "../../types/types";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import * as Yup from "yup";

const initialValues: FormValues = {
  firstName: "",
  lastName: "",
  experience: 0,
  desiredPosition: "",
  email: "",
  password: "",
  about: "",
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Заповніть і'мя"),
  lastName: Yup.string().required("Заповніть прізвище"),
  experience: Yup.string().required("Заповніть досвід роботи"),
  desiredPosition: Yup.string().required("Заповніть бажану посаду"),
  email: Yup.string().email("Неправильний Email").required("Заповніть Email"),
  password: Yup.string()
    .min(6, "Пароль має містити мінімум 6 символів")
    .required("Заповніть пароль"),
  about: Yup.string().required("Напишіть про себе"),
});

const LoginForm: React.FC = () => {
  const router = useRouter();
  const handleSubmit = (values: FormValues) => {
    const userInfoString = JSON.stringify(values);
    localStorage.setItem("userInfo", userInfoString);
    router.reload();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className="m-auto max-w-2xl px-10 py-16 rounded-xl border-black border border-solid">
        <div className="h-16">
          <div className="flex justify-between">
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              id="email"
              name="email"
              className="border-solid border-black border rounded-md px-2 py-0.5 ml-5 w-3/4"
            />
          </div>
          <ErrorMessage
            name="email"
            component="div"
            className="text-red-600 text-right"
          />
        </div>
        <div className="h-16">
          <div className="flex justify-between">
            <label htmlFor="password">Пароль</label>
            <Field
              type="password"
              id="password"
              name="password"
              className="border-solid border-black border rounded-md px-2 ml-5 py-0.5 w-3/4"
            />
          </div>
          <ErrorMessage
            name="password"
            component="div"
            className="text-red-600 text-right"
          />
        </div>
        <div className="h-16">
          <div className="flex justify-between">
            <label htmlFor="firstName" className="w-9">
              Ім'я
            </label>
            <Field
              type="text"
              id="firstName"
              name="firstName"
              className="border-solid border-black border rounded-md px-2 py-0.5 ml-5 w-3/4"
            />
          </div>

          <ErrorMessage
            name="firstName"
            component="div"
            className="text-red-600 text-right"
          />
        </div>
        <div className="h-16">
          <div className="flex justify-between">
            <label htmlFor="lastName">Прізвище</label>
            <Field
              type="text"
              id="lastName"
              name="lastName"
              className="border-solid border-black border rounded-md px-2 py-0.5 ml-5 w-3/4"
            />
          </div>
          <ErrorMessage
            name="lastName"
            component="div"
            className="text-red-600 text-right"
          />
        </div>
        <div className="h-16">
          <div className="flex justify-between">
            <label htmlFor="desiredPosition">Бажана посада</label>
            <Field
              type="text"
              id="desiredPosition"
              name="desiredPosition"
              className="border-solid border-black border rounded-md px-2 py-0.5 ml-5 w-3/4"
            />
          </div>
          <ErrorMessage
            name="desiredPosition"
            component="div"
            className="text-red-600 text-right"
          />
        </div>
        <div className="h-16">
          <div className="flex justify-between">
            <label htmlFor="experience">Досвід роботи</label>
            <Field
              type="number"
              id="experience"
              name="experience"
              className="border-solid border-black border rounded-md px-2 py-0.5 ml-5 w-3/4"
            />
          </div>

          <ErrorMessage
            name="experience"
            component="div"
            className="text-red-600 text-right"
          />
        </div>

        <div>
          <div className="flex justify-between">
            <label htmlFor="about">Про себе</label>
            <Field
              as="textarea"
              id="about"
              name="about"
              className="border-solid border-black border rounded-md px-2 ml-5 py-0.5 w-3/4 min-h-20"
            />
          </div>
          <ErrorMessage
            name="about"
            component="div"
            className="text-red-600 text-right"
          />
        </div>
        <button
          type="submit"
          className="float-right border border-black border-solid w-48 py-1 rounded-lg hover:bg-fuchsia-200 transition-all mt-3"
        >
          Зареєструватись
        </button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
