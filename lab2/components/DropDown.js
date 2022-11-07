import React from 'react';
import {Box, Center, CheckIcon, Select} from 'native-base';
import {useStore} from 'effector-react';
import {$styles} from '../state/store';

function DropDown({items, onValueChanged, selected, placeholder}) {
  const styles = useStore($styles);

  return (
    <Center>
      <Box maxW="200">
        <Select
          defaultValue={selected}
          selectedValue={selected}
          minWidth="150"
          accessibilityLabel={placeholder}
          placeholder={placeholder}
          _selectedItem={{
            bg: 'teal.600',
            endIcon: <CheckIcon size="5" />,
          }}
          style={styles.text}
          mt={1}
          mb={2}
          onValueChange={onValueChanged}>
          {items.map(({label, value}, index) => (
            <Select.Item key={index} label={label} value={value} />
          ))}
        </Select>
      </Box>
    </Center>
  );
}

export default DropDown;
