import { InfoTippy } from "@/components/Tippy/InfoTippy";
import React, { ChangeEvent } from "react";
import { capitaliseString } from "../utils";
import styles from "./page.module.css";

type Props = {
  id: string;
  title: string;
  value: number;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  selected: boolean;
  result: string | number;
  onCompute?: () => void;
  isTippy?: React.ReactNode;
};

export function TvmInput({
  id,
  title,
  value,
  onChange,
  selected,
  result,
  onCompute,
  isTippy = undefined,
}: Props) {
  return (
    <div className={`${styles.tvmWrapper} ${selected ? styles.tvmCpt : ""}`}>
      <div style={{ position: "relative" }}>
        <label className={styles.tvmLabel} htmlFor={id}>
          {capitaliseString(title)}
        </label>
        {!!isTippy ? (
          <div className={styles.absolute}>
            <InfoTippy iconId="alert-circle" placement="top">
              {title}
              {isTippy}
            </InfoTippy>
          </div>
        ) : null}
      </div>
      {selected ? (
        <div>{result}</div>
      ) : (
        <input
          id={id}
          type="number"
          title={title}
          className={styles.tvmInput}
          value={value}
          onChange={onChange}
        />
      )}
      {!selected && onCompute ? (
        <button title={`compute ${title}`} onClick={onCompute}>
          Cpt
        </button>
      ) : null}
    </div>
  );
}
