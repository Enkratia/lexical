import React from "react";

import { setOverflowHidden } from "../../../../utils/customFunctions";

import cs from "../../../../scss/helpers.module.scss";
import s from "./confirmBoilerplate.module.scss";

type ConfirmBoilerplatePopupProps = {
  onConfirmClick: (value: boolean) => void;
  title: string;
};

export const ConfirmBoilerplatePopup: React.FC<ConfirmBoilerplatePopupProps> = ({
  onConfirmClick,
  title,
}) => {
  React.useEffect(() => {
    setOverflowHidden(true);

    return () => setOverflowHidden(false);
  }, []);

  return (
    <div className={s.root}>
      <div className={s.wrapper}>
        <div className={s.content}>
          <div className={s.icon} aria-hidden="true"></div>

          <h1 className={`${s.title} ${cs.title}`}>{title}</h1>

          <p className={s.descr}>Are you sure to proceed?</p>

          <div className={s.btns}>
            <button className={`${s.btn} ${cs.btn}`} onClick={() => onConfirmClick(false)}>
              No
            </button>

            <button className={`${s.btn} ${cs.btn}`} onClick={() => onConfirmClick(true)}>
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
