import { useState } from "react";
import { BaseModal } from "./BaseModal";

import { Button } from "./Form/Button.jsx";

export function createModal(fields, data, title, onSubmit) {
  const [modalStatus, setModalStatus] = useState(false);

  const handleModalStatus = (status) => {
    setModalStatus(status);
  };

  return (
    <>
      <Button
        text={title}
        color="success"
        type="button"
        action={() => handleModalStatus(true)}
      />
      <BaseModal
        fields={fields}
        data={data}
        title={title}
        status={modalStatus}
        changeStatus={handleModalStatus}
        onSubmit={onSubmit}
      />
    </>
  );
}
