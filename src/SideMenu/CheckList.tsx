import { Checkbox, FormControlLabel, Typography } from '@mui/material';

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
      <Typography variant="h5" color="inherit" noWrap sx={{ flexGrow: 1 }}>
        Columns
      </Typography>
      {items.map((name) => {
        const requiredColumn = requiredItems?.find((requiredColumn) => requiredColumn.name === name);
        const label = name + (requiredColumn?.appendToLabel || '');
        const isRequired = requiredItems !== null;

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
