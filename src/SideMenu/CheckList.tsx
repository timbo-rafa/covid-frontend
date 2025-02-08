import { Checkbox, FormControlLabel } from '@mui/material';

type RequiredColumn = {
  name: string;
  appendToLabel: string;
};

type CheckListProps = {
  items: string[];
  requiredItems?: RequiredColumn[];
  selectedItems: string[];
  onCheckboxChange: (item: string, isChecked: boolean) => void;
};

export function CheckList({ items, requiredItems, onCheckboxChange, selectedItems }: CheckListProps) {
  return (
    <>
      {items.map((name) => {
        const requiredColumn = requiredItems?.find((requiredColumn) => requiredColumn.name === name);
        const label = name + (requiredColumn?.appendToLabel || '');
        const isRequired = requiredColumn !== undefined;

        return (
          <FormControlLabel
            key={name}
            control={
              <Checkbox
                checked={isRequired || selectedItems.includes(name)}
                disabled={isRequired}
                onChange={(e) => onCheckboxChange(name, e.target.checked)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label={label}
          />
        );
      })}
    </>
  );
}
