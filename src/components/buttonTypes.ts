 export interface ButtonProps<T> {
  onClick?: (() => {}) | (() => React.SetStateAction<T>),
  className: string,
  text: string,
  submit?: boolean,
}