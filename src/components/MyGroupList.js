"use strict";

import React from 'react';
import {DataTable, TableHeader, TableBody, TableRow, TableColumn, Card} from 'react-md';

import { MyGroupListRow } from './MyGroupListRow';
import Page from './Page'

const dataTableStyle = {
  'margin-bottom': '36px'
};

export const MyGroupList = ({data, onDelete}) => (
    <Page>
        <br/><br/><br/>
        <Card style={style} className="md-block-centered" >
        <DataTable plain style={dataTableStyle} tableStyle={{backgroundColor: 'rgb(255, 255, 255, 0.7)', maxWidth: '1000'}}>
            <TableHeader style={{backgroundColor: 'rgb(255, 255, 255, 0.8)'}}>
                <TableRow>
                    <TableColumn>Date/ Time</TableColumn>
                    <TableColumn>Place</TableColumn>
                    <TableColumn>Members</TableColumn>
                    <TableColumn>Edit</TableColumn>
                    <TableColumn>Remove</TableColumn>
                    <TableColumn>More Details</TableColumn>
                </TableRow>
            </TableHeader>
            <TableBody style={{backgroundColor: 'rgb(255, 255, 255, 0)',maxWidth: '1000', borderRadius: '25px'}}>
                {data.map((group, i) => <MyGroupListRow key={i} group={group} onDelete={(id) => onDelete(id)} />)}
            </TableBody>
        </DataTable>
        </Card>
            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

    </Page>
);

const style = {
    maxWidth: 1000,
    backgroundColor: 'rgb(0, 0, 0, 0)',
};