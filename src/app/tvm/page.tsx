"use client"

import { useState } from "react"
import {
  annualRateFromEAR,
  computeFutureValue,
  computeN,
  computePMT,
  computePresentValue,
  computeR,
  continuousCompoundingFV,
  formatCurrency,
  formatYearsToHumanReadable,
} from "../utils"
import { NumberLine } from "./NumberLine"
import { TvmInput } from "./TvmInput"
import styles from "./page.module.css"

type ComputeType = "fv" | "pv" | "n" | "r" | "pmt"

export default function Home() {
  const [fv, setFv] = useState(0)
  const [pv, setPv] = useState(0)
  const [n, setN] = useState(0)
  const [r, setR] = useState(0)
  const [pmt, setPmt] = useState(0)
  const [m, setM] = useState(1)
  const [compute, setCompute] = useState<ComputeType>("fv")

  const cptFv =
    pv && n && `FV: ${formatCurrency(computeFutureValue({ pv, r, n, pmt, m }))}`
  const cptPv =
    fv && n && `PV ${formatCurrency(computePresentValue({ fv, r, n, pmt }))}`
  const cptN =
    pv &&
    fv &&
    `N: ${formatYearsToHumanReadable(computeN({ pv, fv, r, pmt }), true)}}`
  const cptR = fv && pv && n && `I/Y: ${computeR({ fv, pv, n, pmt })}`
  const cptPmt =
    fv && pv && n && `PMT: ${formatCurrency(computePMT({ fv, pv, r, n }))}`

  return (
    <main className={styles.main}>
      <div className={styles.userInputs}>
        <TvmInput
          id="presentValue"
          title="present value"
          value={pv}
          onChange={(e: any) => setPv(parseFloat(e.target.value))}
          selected={compute === "pv"}
          result={cptPv}
          onCompute={() => setCompute("pv")}
        />

        <TvmInput
          id="futureValue"
          title="future value"
          value={fv}
          onChange={(e: any) => setFv(parseFloat(e.target.value))}
          selected={compute === "fv"}
          result={cptFv}
          onCompute={() => setCompute("fv")}
        />

        <TvmInput
          id="n"
          title="n years"
          value={n}
          onChange={(e: any) => setN(parseFloat(e.target.value))}
          selected={compute === "n"}
          result={cptN}
          onCompute={() => setCompute("n")}
        />

        <TvmInput
          id="i/y"
          title="interest rate"
          value={r}
          onChange={(e: any) => setR(parseFloat(e.target.value))}
          selected={compute === "r"}
          result={cptR}
          onCompute={() => setCompute("r")}
          isTippy={
            <ul>
              <li>required rate of return</li>
              <li>discount rate</li>
              <li>opportunity cost</li>
              <li>cost of capital</li>
            </ul>
          }
        />

        <TvmInput
          id="pmt"
          title="payment"
          value={pmt}
          onChange={(e: any) => setPmt(parseFloat(e.target.value))}
          selected={compute === "pmt"}
          result={cptPmt}
          onCompute={() => setCompute("pmt")}
        />
      </div>

      {/* expect 5% */}
      <div>{annualRateFromEAR({ ear: 0.0509, m: 4 })}</div>

      <div className={styles.userInputsExtra}>
        <div className={styles.tvmWrapper}></div>
        <div className={styles.tvmWrapper}></div>
        <div>
          <TvmInput
            id="m"
            title="m periods / y"
            value={m}
            onChange={(e: any) => setM(e.target.value)}
            selected={false}
            result={cptPmt}
            onCompute={undefined}
          />
        </div>
        <div className={styles.tvmWrapper}></div>
        <div className={styles.tvmWrapper}>irregular cash flow</div>
      </div>

      <NumberLine n={n} pv={pv} />

      <div>{continuousCompoundingFV({ pv, r, n })}</div>
    </main>
  )
}
