interface Props {
  label: string;
  value: string;
  breakline?: boolean;
}

export const RideListText = ({ label, value, breakline = false }: Props) => {
  if (!label && !value) return <></>;
  return (
    <p className="text-sm/6 font-semibold text-gray-900">
      {label}:{breakline ? <br /> : <>&nbsp;</>}
      <span className="text-sm/6 font-normal text-gray-900">{value}</span>
    </p>
  );
};
