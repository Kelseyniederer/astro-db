import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  color?: "primary" | "secondary" | "info" | "danger" | "warning";
  onClick: () => void;
}
const Button = ({ children, color = "info", onClick }: Props) => {
  return (
    <button className={"btn btn-" + color} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
