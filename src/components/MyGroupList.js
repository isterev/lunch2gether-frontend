"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn } from 'react-md';

import { MyGroupListRow } from './MyGroupListRow';
import Page from './Page'

const dataTableStyle = {
  'margin-bottom': '36px'
};

export const MyGroupList = ({data, onDelete}) => (
    <Page>
        <DataTable plain style={dataTableStyle}>
            <TableHeader>
                <TableRow>
                    <TableColumn>Date/ Time</TableColumn>
                    <TableColumn>Place</TableColumn>
                    <TableColumn>Members</TableColumn>
                    <TableColumn>Edit</TableColumn>
                    <TableColumn>Remove</TableColumn>
                    <TableColumn>More Details</TableColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((group, i) => <MyGroupListRow key={i} group={group} onDelete={(id) => onDelete(id)} />)}
            </TableBody>
        </DataTable>
    </Page>
);

