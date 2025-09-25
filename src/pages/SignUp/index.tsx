import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthTitle from "./../../components/LayoutAuth/AuthTitle";
import { useTranslation } from "react-i18next";
import useAuth from "../../hooks/useAuth";
import Input from "../../components/forms/Input";
import Button from "../../components/forms/Button";

const SignUp = () => {
  const { isLogged } = useAuth();
  const [logged, setLogged] = useState(isLogged());
  const { signUp } = useAuth();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("isLogged", logged);
    if (logged) navigate("/dashboard");
  }, [logged, navigate]);

  const onSubmit = async (user: any) => {
    setServerError(undefined);
    const result = await signUp(user);
    console.log(result);
    if (result?.error) {
      setServerError(result?.error);
    } else {
      setLogged(true);
    }
  };
  //<img src={Logo} alt="Logo" className="w-30 h-30 absolute top-4 left-4" />
  return (
    <>
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center w-full">
          <AuthTitle title={t("sign_up.title")} />
          <div className="h-[50px] pt-4 text-sm text-red-600">
            {errors.email && <p>{errors.email?.message?.toString()} </p>}
            {errors.password && <p>{errors.password?.message?.toString()} </p>}
            {errors.password_confirmation && (
              <p>{errors.password_confirmation?.message?.toString()} </p>
            )}
            {serverError && <p>{t(serverError)}</p>}
          </div>
        </div>
      </div>
      <form
        className="bg-white rounded-lg p-8 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          id="email"
          type="email"
          register={register}
          label={t("sign_up.labels.email")}
          error={errors.email}
          validation={{
            required: t("sign_up.errors.email.blank"),
          }}
        />
        <Input
          id="password"
          type="password"
          register={register}
          label={t("sign_up.labels.password")}
          error={errors.password}
          validation={{
            required: t("sign_up.errors.password.blank"),
            minLength: {
              value: 8,
              message: t("sign_up.errors.password.format"),
            },
          }}
        />
        <Input
          id="password_confirmation"
          type="password"
          register={register}
          label={t("sign_up.labels.password_confirmation")}
          error={errors.password_confirmation}
          validation={{
            required: t("sign_up.errors.password_confirmation.blank"),
            validate: (value: string) => {
              if (watch("password") != value) {
                return t("sign_up.errors.password_confirmation.different");
              }
            },
          }}
        />
        <Link
          className="text-blue-500 hover:text-blue-800 text-center block"
          to="/forgot_password"
        >
          {t("login.labels.forgot_password")}
        </Link>
        <Button
          type="submit"
          variant="primary"
          onClick={() => setServerError(undefined)}
        >
          {t("login.labels.sign_up")}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate("/login")}
        >
          {t("sign_up.labels.login")}
        </Button>
      </form>
    </>
  );
};

export default SignUp;
