import React from 'react'
import OtpInput from 'react-otp-input'

type Props = {
  inputNumber: number
  onChange: (value: string) => void
  value: string
}

const NumberOTPInput = ({ inputNumber, onChange, value }: Props) => {
  return (
    <OtpInput
      value={value}
      onChange={onChange}
      numInputs={inputNumber}
      renderInput={props => (
        <input
          {...props}
          className="w-10 h-12 ml-3 rounded font-bold text-xl border-solid border-smokeyGrey"
        />
      )}
      shouldAutoFocus
    />
  )
}

export default NumberOTPInput
