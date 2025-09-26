import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useStorage from "../../hooks/useStorage";
import useForgotPassword from "../../hooks/auth/useForgotPassword";
import AuthTitle from "./../../components/LayoutAuth/AuthTitle";
import Input from "../../components/forms/Input";
import Button from "../../components/forms/Button";

const ForgotPassword = () => {
  const { isLogged } = useStorage();
  const [requested, setRequested] = useState(false);
  const { forgotPassword, loading, error } = useForgotPassword();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged()) navigate("/dashboard");
  }, [isLogged, navigate]);

  const onSubmit = async (user: any) => {
    setServerError(undefined);
    await forgotPassword(user);
    if (error) {
      setServerError(t(error));
    } else {
      setRequested(true);
    }
  };
  return (
    <>
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center w-full">
          <AuthTitle title={t("forgot_password.title")} />
          <div className="h-[50px] pt-4 text-sm text-red-600">
            {errors.email && <p>{errors.email?.message?.toString()} </p>}
            {serverError && <p>{t(serverError)}</p>}
          </div>
        </div>
      </div>
      <form
        className="bg-white rounded-lg p-8 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {!requested && (
          <>
            <Input
              id="email"
              type="email"
              register={register}
              label={t("forgot_password.labels.email")}
              error={errors.email}
              validation={{
                required: t("forgot_password.errors.email.blank"),
              }}
            />
            <Button
              type="submit"
              variant="primary"
              onClick={() => setServerError(undefined)}
              disabled={loading}
            >
              {loading
                ? t("common.loading")
                : t("forgot_password.labels.submit")}
            </Button>
          </>
        )}
        {requested && (
          <>
            <div className="h-min-[50px] p-4 mb-20 text-sm text-blue-500 text-center border border-blue-500 rounded-lg bg-blue-100">
              {t("forgot_password.requested")}
            </div>
          </>
        )}
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate("/login")}
        >
          {t("forgot_password.labels.back")}
        </Button>
      </form>
    </>
  );
};

export default ForgotPassword;
