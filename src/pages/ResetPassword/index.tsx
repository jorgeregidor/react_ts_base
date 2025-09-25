import { useForm } from "react-hook-form";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useAuth from "../../hooks/useAuth";
import AuthTitle from "./../../components/LayoutAuth/AuthTitle";
import Input from "../../components/forms/Input";
import Button from "../../components/forms/Button";

const ResetPassword = () => {
  const { validPasswordToken, resetPassword } = useAuth();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(true);
  const [validToken, setValidToken] = useState(false);
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onLoad = useCallback(async () => {
    if (loading) {
      setServerError(undefined);
      const email = searchParams.get("email") || "";
      const token = searchParams.get("token") || "";
      const result = await validPasswordToken({ email, token });
      console.log(result);
      if (result?.error) {
        setServerError(result?.error);
      } else {
        setValidToken(true);
      }
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: any) => {
    setServerError(undefined);
    const result = await resetPassword({
      ...data,
      email: searchParams.get("email"),
      token: searchParams.get("token"),
    });
    console.log(result);
    if (result?.error) {
      setServerError(result?.error);
    } else {
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    onLoad();
  }, [onLoad]);

  return (
    <>
      {!loading && (
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
                {serverError && <p>{t(serverError)}</p>}
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
              <Button
                type="submit"
                variant="primary"
                onClick={() => setServerError(undefined)}
              >
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
