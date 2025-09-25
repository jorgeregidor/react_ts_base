import { useState } from "react";
import { useTranslation } from "react-i18next";
import CancelAccountModal from "./CancelAccountModal";
import Button from "../../../components/forms/Button";

const CancelAccountForm = () => {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Button
        variant="danger"
        onClick={() => setShowModal(true)}
        className="bg-red-200 hover:bg-red-500"
      >
        {t("my_account.cancel_account.button")}
      </Button>
      <CancelAccountModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default CancelAccountForm;
