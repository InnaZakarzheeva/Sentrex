import { useEffect, useState } from "react";

import { RequestStatus } from "../../state";

export const useRequestStatus = (
  requestStatus: RequestStatus,
  onSuccess?: () => void
) => {
  const [errorVisible, setErrorVisible] = useState(false);

  useEffect(() => {
    switch (requestStatus) {
      case "idle":
        setErrorVisible(false);
        break;
      case "success":
        if (onSuccess) {
          onSuccess();
        }
        break;
      case "failure":
        setErrorVisible(true);
        break;
    }
  }, [requestStatus]);

  return errorVisible;
};
