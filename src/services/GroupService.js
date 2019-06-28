"use strict";

import HttpService from './HttpService';
import UserService from "./UserService";

export default class GroupService {

    constructor(){
    }

    static baseURL() {return "http://localhost:3000/groups" }

    static getGroups(){
       return new Promise((resolve, reject) => {
           HttpService.get(this.baseURL(), function(data) {
               resolve(data);
           }, function(textStatus) {
               reject(textStatus);
           });
       });
    }

    static getGroup(id) {
        return new Promise((resolve, reject) => {
            HttpService.get(`${GroupService.baseURL()}/${id}`, function(data) {
                if(data != undefined || Object.keys(data).length !== 0) {
                    resolve(data);
                }
                else {
                    reject('Error while retrieving group');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static deleteGroup(id) {
        return new Promise((resolve, reject) => {
            HttpService.remove(`${GroupService.baseURL()}/${id}`, function(data) {
                if(data.message != undefined) {
                    resolve(data.message);
                }
                else {
                    reject('Error while deleting');
                }
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }

    static updateGroup(group) {
        return new Promise((resolve, reject) => {
            HttpService.put(`${this.baseURL()}/${group._id}`, group, function(data) {
                resolve(data);
            }, function(textStatus) {
               reject(textStatus);
            });
        });
    }

    static createGroup(group) {

        group.owner = UserService.getCurrentUser().id;
        return new Promise((resolve, reject) => {
            HttpService.post(GroupService.baseURL(), group, function(data) {
                resolve(data);
            }, function(textStatus) {
                reject(textStatus);
            });
        });
    }
}