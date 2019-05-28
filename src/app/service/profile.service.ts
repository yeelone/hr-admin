import { Injectable } from '@angular/core';
import { Profile } from '../model/profile';
import { Group } from '../model/group';
import { Tag } from '../model/tag';
import { TransferRecord } from '../model/transfer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { MyService } from './service';
class ProfileResponse {
  totalCount: number;
  profileList: Profile[];
}

class Response {
  code: number;
  message: string;
  data: ProfileResponse; 
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends MyService{
  constructor(private http: HttpClient) {super() }

  getProfiles(offset:number,limit:number,freezed:string): Observable<Profile[]> {
    let url = '/api/v1/profile?freezed='+freezed;

    if ( limit ){
      url += "&offset="+String(offset)+"&limit="+String(limit);
    }
    return this.http.get<Profile[]>(url)
      .pipe(
        tap(response => this.log('fetched profiles')),
        catchError(this.handleError('getProfiles', []))
    );
  }
  
  getProfile(id:number): Observable<Profile[]> {
    let url = '/api/v1/profile/' + String(id);

    return this.http.get<Profile[]>(url)
      .pipe(
        tap(response => this.log('get single profile')),
        catchError(this.handleError('getProfile', []))
    );
  }

  getProfileDetail(id:number): Observable<Profile[]> {
    let url = '/api/v1/profile/' + String(id)+"/detail";

    return this.http.get<Profile[]>(url)
      .pipe(
        tap(response => this.log('get profile')),
        catchError(this.handleError('getProfileDetail', []))
    );
  }

  getProfileWithTags(id:number): Observable<Response[]> {
    let url = '/api/v1/profile/' + String(id) + '/tags';

    return this.http.get<Response[]>(url)
      .pipe(
        tap(response => this.log('get profile with tags ')),
        catchError(this.handleError('getProfileWithTags', []))
    );
  }

  searchProfiles(key:string,value:string, offset:number,limit:number): Observable<Profile[]> {
    let url = '/api/v1/profile';

    if ( limit ){
      url += "?offset="+String(offset)+"&limit="+String(limit)+"&key="+key+"&value=" + value;
    }

    return this.http.get<Profile[]>(url)
      .pipe(
        tap(response => this.log('search profiles')),
        catchError(this.handleError('searchProfiles', []))
    );
  }

  deleteProfile(id:number, remark:string): Observable<Response[]> {
    let url = '/api/v1/profile/' + String(id)+"/delete";
    let data ={
      remark
    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('delete profiles' + String(id))),
        catchError(this.handleError('deleteProfile', []))
    );
  }
  createProfile(profile:Profile, remark:string): Observable<Response[]> {
    let url = '/api/v1/profile';
    let data = {
      profile, 
      remark
    }

    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('create profiles')),
        catchError(this.handleError('createProfile', []))
    );
  }

  updateProfile(p:Profile, remark:string):Observable<Response[]>{
    let url = "/api/v1/profile/" + p.id;
    let data = {
      profile:p, 
      remark
    }
    return this.http.put<Response[]>(url,data)
      .pipe(
        tap(response => this.log('update group')),
        catchError(this.handleError('updateGroup', []))
      );
  }

  getProfilesByGroup(id:number,offset:number,limit:number,freezed:string): Observable<Profile[]> {
    let url = "/api/v1/group/"+String(id)+"/profiles";

    if ( limit ){
      url += "?offset="+String(offset)+"&limit="+String(limit)+"&freezed="+freezed;
    }
    return this.http.get<Profile[]>(url)
      .pipe(
        tap(response => this.log('fetched profiles by group id ' + String(id))),
        catchError(this.handleError('getProfilesByGroup', []))
      );
  }

  addProfilesToGroup(g:Group,profile_id_list:number[],remark:string):Observable<Response[]>{
    let url = "/api/v1/group/" + g.id + "/profiles";
    let data = {
      id:g.id,
      profile_id_list,
      remark,
    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('add relate profile')),
        catchError(this.handleError('addProfilesToGroup', []))
      );
  }

  removeProfilesToGroup(g:Group,profile_id_list:number[], remark:string):Observable<Response[]>{
    let url = "/api/v1/group/" + g.id + "/profiles/remove";
    let data = {
      id:g.id,
      profile_id_list,
      remark,
    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('update group')),
        catchError(this.handleError('removeProfilesToGroup', []))
      );
  }


  getProfilesByTag(id:number,offset:number,limit:number): Observable<Profile[]> {
    let url = "/api/v1/tag/"+String(id)+"/profiles";

    if ( limit ){
      url += "?offset="+String(offset)+"&limit="+String(limit);
    }
    return this.http.get<Profile[]>(url)
      .pipe(
        tap(response => this.log('fetched profiles by tag id ' + String(id))),
        catchError(this.handleError('getProfilesByTag', []))
      );
  }

  addProfilesToTag(t:Tag,profile_id_list:number[], remark:string):Observable<Response[]>{
    let url = "/api/v1/tag/" + t.id + "/profiles";
    let data = {
      id:t.id,
      profile_id_list,
      remark,
    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('add relate profile')),
        catchError(this.handleError('addProfilesToTag', []))
      );
  }

  addProfileTagRelationship(profile_id:number, tag_id_list:number[]):Observable<Response[]>{
    let url = "/api/v1/profile/" + profile_id + "/tags";
    let data = {
      profile:profile_id ,
      tags:tag_id_list
    }
    return this.http.put<Response[]>(url,data)
      .pipe(
        tap(response => this.log('add relate profile')),
        catchError(this.handleError('addProfilesToTag', []))
      );
  }


  removeProfilesToTag(t:Tag,profile_id_list:number[], remark:string):Observable<Response[]>{
    let url = "/api/v1/tag/" + t.id + "/profiles/remove";
    let data = {
      id:t.id,
      profile_id_list,
      remark,
    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('remove profiles with tag ')),
        catchError(this.handleError('removeProfilesToTag', []))
      );
  }

  moveProfile(pid:number, old_group_id:number,new_group_id:number,description:string, remark:string):Observable<Response[]>{
    let url = "/api/v1/profile/transfer";
    let data = {
      profile_id:pid,
      old_group_id,
      new_group_id,
      description,
      remark

    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('remove profiles with tag ')),
        catchError(this.handleError('removeProfilesToTag', []))
      );
  }

  freezeProfile(ids:number[],remark:string):Observable<Response[]>{
    let url = "/api/v1/profile/freeze";
    let data = {
      profiles:ids,
      remark
    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('freeze profile')),
        catchError(this.handleError('freezeProfile', []))
      );
  }

  unFreezeProfile(ids:number[],remark:string):Observable<Response[]>{
    let url = "/api/v1/profile/unfreeze";
    let data = {
      profiles:ids,
      remark
    }
    return this.http.post<Response[]>(url,data)
      .pipe(
        tap(response => this.log('unfreeze profile')),
        catchError(this.handleError('unFreezeProfile', []))
      );
  }

  getProfileTransferRecord(id:number):Observable<TransferRecord[]>{
    let url = "/api/v1/profile/" + String(id) + "/transfer";
    return this.http.get<TransferRecord[]>(url)
      .pipe(
        tap(response => this.log('unfreeze profile')),
        catchError(this.handleError('unFreezeProfile', []))
      );
  }
}
