import React from "react";

interface OptionItemProps {
  value: string;
  onChange: (newValue: string) => void;
  onRemove: () => void;
}

const OptionItem: React.FC<OptionItemProps> = ({ value, onChange, onRemove }) => {
  return (
    <div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={onRemove}>Delete</button>
    </div>
  );
};

export default OptionItem;