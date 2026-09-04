import { ButtonProps } from "./buttonTypes";

export const Button = <T,>({
  onClick,
  className,
  text,
  submit,
}: ButtonProps<T>) => {
  return (
    <div className="flex justify-start flex-row items-center">
      <button
        onClick={onClick ? onClick : undefined}
        className={className}
        type={submit ? 'submit' : undefined}
      >
        {text}
      </button>
    </div>
  )
}