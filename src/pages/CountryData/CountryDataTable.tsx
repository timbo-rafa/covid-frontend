import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React from 'react'
import moment from 'moment'
import { formatToDate } from 'src/utils/time'
import { AvailableCountryCovidTableFields, setWithAllCountryCovidTableFields } from './available-table-fields'
import { useCountryIdsFromQueryString } from './use-country-ids-query-string'

type CountryCovidTableDto = any;

const columnHelper = createColumnHelper<CountryCovidTableDto>()

const columns = [
  columnHelper.accessor('name', {
    cell: info => info.getValue(),
    header: 'Country',
  }),
  columnHelper.accessor('date', {
    cell: info => formatToDate(info.getValue<Date>()),
    header: 'Date',
  }),
  columnHelper.accessor('newCases', {
    cell: info => info.getValue(),
    header: 'New Cases',
  }),
  columnHelper.accessor('totalCases', {
    cell: info => info.getValue(),
    header: 'Total Cases',
  }),
  columnHelper.accessor('newDeaths', {
    cell: info => info.getValue(),
    header: 'New Deaths',
  }),
  columnHelper.accessor('totalDeaths', {
    cell: info => info.getValue(),
    header: 'Total Deaths',
  }),
  // columnHelper.accessor(row => row.lastName, {
  //   id: 'lastName',
  //   cell: info => <i>{info.getValue()}</i>,
  //   header: () => <span>Last Name</span>,
  //   footer: info => info.column.id,
  // }),
]

type CountryDataTableProps = {
  selectedFields: Set<AvailableCountryCovidTableFields>;
  countryCovidTableData: CountryCovidTableDto[];
}

export function CountryDataTable({countryCovidTableData}: CountryDataTableProps) {
  
  console.log("🚀 | CountryDataTable | countryCovidTableData:", countryCovidTableData)
  const table = useReactTable({ data: countryCovidTableData || [], columns, getCoreRowModel: getCoreRowModel() })
  const rerender = React.useReducer(() => ({}), {})[1]

  return <div className="p-2">
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        {table.getFooterGroups().map(footerGroup => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                    header.column.columnDef.footer,
                    header.getContext()
                  )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
    <div className="h-4" />
    <button onClick={() => rerender()} className="border p-2">
      Rerender
    </button>
  </div>
}