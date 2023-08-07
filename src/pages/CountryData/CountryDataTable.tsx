import { CountryCovidTableDto } from '@generated-graphql-hooks'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useCountryCovidTableDataApiQuery } from './use-country-covid-table-data'
import React from 'react'
import moment from 'moment'
import { formatToDate } from '@time-utils'
import { setWithAllCountryCovidTableFields } from './available-table-fields'

const columnHelper = createColumnHelper<CountryCovidTableDto>()

const columns = [
  columnHelper.accessor('name', {
    cell: info => info.getValue(),
    header: 'Country',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('date', {
    cell: info => formatToDate(info.getValue()),
    header: 'Date',
    footer: info => info.column.id,
  })
  ,
  columnHelper.accessor('newCases', {
    cell: info => info.getValue(),
    header: 'New Cases',
    footer: info => info.column.id,

  }),
  // columnHelper.accessor(row => row.lastName, {
  //   id: 'lastName',
  //   cell: info => <i>{info.getValue()}</i>,
  //   header: () => <span>Last Name</span>,
  //   footer: info => info.column.id,
  // }),
]

export function CountryDataTable() {
  const { countryCovidTableData, loading } = useCountryCovidTableDataApiQuery({ start: new Date('2020-01-01'), end: new Date('2021-01-01')}, setWithAllCountryCovidTableFields)

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