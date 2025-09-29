import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useValidPasswordToken from "../../hooks/auth/useValidPasswordToken";
import useResetPassword from "../../hooks/auth/useResetPassword";
import AuthTitle from "./../../components/LayoutAuth/AuthTitle";
import Input from "../../components/forms/Input";
import Button from "../../components/forms/Button";
import showError from "../../lib/messages/ShowError";

const ResetPassword = () => {
  const {
    validPasswordToken,
    loading: tokenLoading,
    error: tokenError,
  } = useValidPasswordToken();
  const {
    resetPassword,
    loading: resetLoading,
    error: resetError,
  } = useResetPassword();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [validToken, setValidToken] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onLoad = async () => {
    const email = searchParams.get("email") || "";
    const token = searchParams.get("token") || "";
    await validPasswordToken({ email, token });
    if (!tokenLoading && tokenError) {
      showError(t(tokenError));
    } else {
      setValidToken(true);
    }
  };

  const onSubmit = async (data: any) => {
    await resetPassword({
      ...data,
      email: searchParams.get("email"),
      token: searchParams.get("token"),
    });
    if (!resetLoading && resetError) {
      showError(t(resetError));
    } else {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <>
      {!tokenLoading && !tokenError && (
        <>
          <div className="flex justify-center w-full">
            <div className="flex flex-col items-center w-full">
              <AuthTitle title={t("reset_password.title")} />
              <div className="h-[50px] pt-4 text-sm text-red-600">
                {errors.password && (
                  <p>{errors.password?.message?.toString()} </p>
                )}
                {errors.password_confirmation && (
                  <p>{errors.password_confirmation?.message?.toString()} </p>
                )}
              </div>
            </div>
          </div>
          {validToken && (
            <form
              className="bg-white rounded-lg p-8 space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                id="password"
                type="password"
                register={register}
                label={t("reset_password.labels.password")}
                error={errors.password}
                validation={{
                  required: t("reset_password.errors.password.blank"),
                  minLength: {
                    value: 8,
                    message: t("reset_password.errors.password.format"),
                  },
                }}
              />
              <Input
                id="password_confirmation"
                type="password"
                register={register}
                label={t("reset_password.labels.password_confirmation")}
                error={errors.password_confirmation}
                validation={{
                  required: t(
                    "reset_password.errors.password_confirmation.blank",
                  ),
                  validate: (value: string) => {
                    if (watch("password") != value) {
                      return t(
                        "reset_password.errors.password_confirmation.different",
                      );
                    }
                  },
                }}
              />
              <Button type="submit" variant="primary">
                {t("reset_password.labels.submit")}
              </Button>
            </form>
          )}
        </>
      )}
    </>
  );
};

export default ResetPassword;
