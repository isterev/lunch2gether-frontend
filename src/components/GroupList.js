"use strict";

import React from 'react';
import { DataTable, TableHeader, TableBody, TableRow, TableColumn, Button } from 'react-md';

import { GroupListRow } from './GroupListRow';
import Page from './Page'

const dataTableStyle = {
  'margin-bottom': '36px'
};

export const GroupList = ({data, onDelete}) => (
    <Page>
        <DataTable plain style={dataTableStyle}>
            <TableHeader>
                <TableRow>
                    <TableColumn></TableColumn>
                    <TableColumn>Date/ Time</TableColumn>
                    <TableColumn>Place</TableColumn>
                    <TableColumn>Members</TableColumn>
                    <TableColumn>More Details</TableColumn>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((group, i) => <GroupListRow key={i} group={group} onDelete={(id) => onDelete(id)} />)}
            </TableBody>
        </DataTable>
    </Page>
);

