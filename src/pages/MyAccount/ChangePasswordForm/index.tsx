import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import UserContext from "../../../contexts/UserContext";
import Input from "../../../components/forms/Input";
import Button from "../../../components/forms/Button";
import useUpdatePassword from "../../../hooks/user/useUpdatePassword";

const ChangePasswordForm = () => {
  const [serverError, setServerError] = useState<string | undefined>(undefined);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserContextProvider");
  }

  const { userData } = context;
  const { error, loading, updatePassword } = useUpdatePassword();

  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const oldPassword = watch("old_password");
  const password = watch("password");
  const passwordConfirmation = watch("password_confirmation");

  useEffect(() => {
    const hasAnyValue = oldPassword || password || passwordConfirmation;
    setDisabled(!hasAnyValue || loading);
  }, [oldPassword, password, passwordConfirmation]);

  const onSubmit = async (data: any) => {
    setServerError(undefined);
    data = { ...data, id: userData?.id };
    await updatePassword(data);
    if (error) {
      setServerError(t(error));
    } else {
      setSuccess(t("my_account.change_password.success"));
      reset();
    }
  };

  return (
    <>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <div className="pb-2">
          <Input
            id="old_password"
            type="password"
            register={register}
            label={t("my_account.change_password.labels.old_password")}
            error={errors.old_password}
            validation={{
              required: t(
                "my_account.change_password.errors.old_password.blank",
              ),
            }}
          />
        </div>
        <div className="pb-2">
          <Input
            id="password"
            type="password"
            register={register}
            label={t("my_account.change_password.labels.password")}
            error={errors.password}
            validation={{
              required: t("my_account.change_password.errors.password.blank"),
              minLength: {
                value: 8,
                message: t("my_account.change_password.errors.password.format"),
              },
            }}
          />
        </div>
        <div className="pb-2">
          <Input
            id="password_confirmation"
            type="password"
            register={register}
            label={t("my_account.change_password.labels.password_confirmation")}
            error={errors.password_confirmation}
            validation={{
              required: t(
                "my_account.change_password.errors.password_confirmation.blank",
              ),
              validate: (value: string) => {
                if (watch("password") != value) {
                  return t(
                    "my_account.change_password.errors.password_confirmation.different",
                  );
                }
              },
            }}
          />
        </div>
        <div className="my-2">
          <div className="text-sm text-red-600 ">
            {errors.old_password && (
              <p>{errors.old_password?.message?.toString()} </p>
            )}
            {errors.password && <p>{errors.password?.message?.toString()} </p>}
            {errors.password_confirmation && (
              <p>{errors.password_confirmation?.message?.toString()} </p>
            )}
            {serverError && <p>{t(serverError)}</p>}
          </div>
          <div className="text-sm text-blue-600">
            {success && <p>{success} </p>}
          </div>
        </div>
        <Button
          type="submit"
          variant="primary"
          disabled={disabled}
          onClick={() => setServerError(undefined)}
          className={disabled ? "bg-blue-200" : ""}
        >
          {t("my_account.change_password.labels.submit")}
        </Button>
      </form>
    </>
  );
};

export default ChangePasswordForm;
