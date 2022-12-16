import {
  Box,
  Flex,
  Table,
  TableCellProps,
  TableColumnHeaderProps,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import React, { FC, ReactElement } from 'react';
import { HeaderGroup, Row } from 'react-table';
import * as _ from 'lodash';

interface CustomerTableProps<T extends object> {
  headerGroups: HeaderGroup<T>[];
  rows: Row<T | any>[];
  prepareRow: (row: Row<T>) => void;
  renderRowSubComponent?: ({ row }: any) => JSX.Element;
  haveSubTable?: boolean;
  icon?: ReactElement;
  message?: string;
}

export const CustomTable = <T extends object>(
  headerStyles?: TableColumnHeaderProps,
  cellStyles?: TableCellProps
) => {
  const Instance: FC<CustomerTableProps<T>> = ({
    headerGroups,
    rows,
    prepareRow,
    renderRowSubComponent,
    haveSubTable,
    icon,
    message = 'No Data to show currently',
  }) => {
    return (
      <Box h="100%" w="100%">
        <Table shadow="tableShadow">
          <Thead position="sticky" top="0" bgColor="table.head.background">
            {headerGroups.map((headerGroup, index) => (
              <Tr key={index}>
                {_.map(headerGroup.headers, (column, index) => (
                  <Th
                    key={index}
                    fontSize="md"
                    textTransform="capitalize"
                    textAlign="left"
                    color="table.head.text"
                    fontWeight="semibold"
                    {...headerStyles}
                  >
                    {column.render('Header')}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody bgColor="table.body.background">
            {rows.map((row, index) => {
              prepareRow(row);
              const rowProps = row.getRowProps();
              return (
                <React.Fragment key={rowProps.key}>
                  <Tr
                    fontWeight="normal"
                    bgColor={
                      index % 2
                        ? 'table.row.odd.background'
                        : 'table.row.even.background'
                    }
                    key={index}
                  >
                    {_.map(row.cells, (cell, index) => {
                      return (
                        <Td textAlign="left" key={index} {...cellStyles}>
                          {cell.render('Cell')}
                        </Td>
                      );
                    })}
                  </Tr>
                  {haveSubTable &&
                    row?.original?.SubChecklistItems?.length > 0 &&
                    renderRowSubComponent &&
                    renderRowSubComponent({
                      row: row?.original?.SubChecklistItems,
                    })}
                </React.Fragment>
              );
            })}
          </Tbody>
        </Table>
        {rows?.length <= 0 && (
          <Flex
            alignContent="center"
            bgColor="white"
            flex={1}
            height="500px"
            alignItems="center"
            justifyContent="center"
            flexDir="column"
          >
            {icon}
            <Text color="#7A7A7AB2" textAlign="center">
              {message}
            </Text>
          </Flex>
        )}
      </Box>
    );
  };

  return Instance;
};
