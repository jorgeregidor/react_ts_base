import PageTitle from "./../../components/Layout/PageTitle";
import { FaEnvelope, FaLock, FaWindowClose } from "react-icons/fa";
import ChangeEmailForm from "./ChangeEmailForm";
import AccountSection from "./AccountSection";
import { useTranslation } from "react-i18next";
import ChangePasswordForm from "./ChangePasswordForm";
import CancelAccountForm from "./CancelAccountForm";

function MyAccount() {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle title={t("my_account.title")} />

      <hr className="mx-auto mb-10 bg-gray-300" />

      <AccountSection
        title={t("my_account.change_email.title")}
        icon={<FaEnvelope />}
        form={<ChangeEmailForm />}
      />

      <hr className="mx-auto my-10 bg-gray-300" />

      <AccountSection
        title={t("my_account.change_password.title")}
        icon={<FaLock />}
        form={<ChangePasswordForm />}
      />

      <hr className="mx-auto my-10 bg-gray-300" />

      <AccountSection
        title={t("my_account.cancel_account.title")}
        icon={<FaWindowClose />}
        iconColor="red"
        form={<CancelAccountForm />}
      />
    </>
  );
}

export default MyAccount;
