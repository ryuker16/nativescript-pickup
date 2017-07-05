import {
    Injectable
} from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import "rxjs/add/operator/do";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as tnsOAuthModule from 'nativescript-oauth';


import {
    Action
} from '@ngrx/store';
import {marker} from '../components/interface/marker';
import {user} from '../components/interface/user';
// const http = require("http");
import { Store } from '@ngrx/store';


export const MARKER_RENEW = 'MARKER_RENEW';
// const MARKER_GET = 'MARKER_GET';
export const MARKER_ADD = 'MARKER_ADD';
export const MARKER_REMOVE = 'MARKER_REMOVE';
export const MARKER_LEAVE = 'MARKER_LEAVE';
export const MARKER_JOIN = 'MARKER_JOIN';
export const LOGIN_USER ='LOGIN_USER';
export const LOGOUT_USER ='LOGOUT_USER';
@Injectable()
export class MapService {

    constructor(public http: Http, private store: Store<any>) { }
    /**
     * [listSports list of sports to export]
     * @type {string[]}
     */
    listSports: string[] = ['baseball', 'football', 'paddle', 'soccer', 'boxing',
        'golf', 'hockey', 'fencing', 'rugby', 'bowling', 'powerlifting', 'darts', 'fitness',
        'tennis', 'volleyball', 'skateboard', 'kickball', 'bowling', 'billiard',
        'offroad', 'diving', 'ballet', 'chess', 'curling', 'pingpong', 'skiing', 'iceskating', 'skydiving',
        'running', 'hiking', 'skating', 'dance', 'hockey', 'yoga', 'wrestling',
        'squash', 'swimming', 'horseriding', 'fishing', 'billards',
        'softball', 'sailing', 'skiing', 'shooting', 'bike', 'hunting', 'archery',
        'karting', 'kayak', 'climbing', 'snowboarding', 'cricket', 'motorcycle', 'rugby', 'judo', 'scuba', 'barre', 'atv', 'basketball',
        'rowing', 'karate', 'mma', 'equestrian', 'gymnastics'
    ];


    loginUser(token:string): Observable<user.UserProfile> {
        let headers = new Headers({ 'Content-Type': 'application/json',
      'Authorization': 'OAuth ' + token });
        let options = new RequestOptions({ headers: headers });
        let fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name',
          'friends'
        ];
        let graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
        return this.http.get(graphApiUrl
        , options)
            .map((res: Response) => {
              let profile = res.json();
              let subData: any = {};
              subData.lastName = profile.last_name;
              subData.firstName = profile.first_name;
              subData.displayName = profile.first_name + " " + profile.last_name;
              subData.link = profile.link;
              subData.email = profile.email;
              subData.friends = profile.friends;
              subData.facebook = profile.id;
              subData.picture = 'https://graph.facebook.com/v2.8/' + profile.id + '/picture?type=small';
              subData.bigPicture = 'https://graph.facebook.com/v2.8/' + profile.id + '/picture?type=large';
                console.log('here comes response');
                console.dir(subData);
                this.store.dispatch({'type': LOGIN_USER, 'payload': subData});
                return subData;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Login attempt error'));
          }

          logoutUser(): void {
              this.store.dispatch({'type': LOGOUT_USER});
            console.log('logged out user: user store data empty');
          }

    /**
     * [getEvent used to grab user data]
     * @param  {string}          eventId [event string id]
     * @return {Observable<any>}         [Response]
     */
    getEvent(eventId: any): Observable<Array<marker.MapMarker>> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(eventId + ' retrieval started');
        return this.http.get('http://52.27.228.148:4000/api/events/' + eventId, options)
            .map((res: Response) => {
                let eventData = res.json();
                //console.dir(res.json());
               // this.store.dispatch({'type': MARKER_RENEW, payload: eventData});
                console.log('here comes response');
                return eventData;
            })
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    /**
     * [deleteEvent used to delete event from database]
     * @param  {string}          eventId [event string id]
     * @return {Observable<any>}         [Response]
     */
    deleteEvent(eventId: string): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log('event' + eventId + 'deleted event');
        return this.http.delete('http://52.27.228.148:4000/api/events/' + eventId, options)
            .map((res: Response) => res.json())
            .catch((err) => err);

    }
    /**
     * [leaveEvent leave an event, removes user from event data]
     * @param  {any}             event   [event data]
     * @param  {string}          eventId [event id]
     * @return {Observable<any>}         [response]
     */
    leaveEvent(event: any, eventId: any): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log('event' + eventId + 'updated');
        return this.http.put('http://52.27.228.148:4000/api/leave/' + eventId, JSON.stringify(event), options)
            .map((res: Response) => res.json())
            .catch((err) => err);

    }
    /**
     * [joinEvent add user to event]
     * @param  {marker.RsvpSample} member  [member to add]
     * @param  {string}            eventId [event id string]
     * @return {Observable<any>}           [response]
     */

    joinEvent(member: marker.RsvpSample, eventId: string, event: any): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log('event' + eventId + 'updated');
        return this.http.put('http://52.27.228.148:4000/api/events/' + eventId, JSON.stringify(member), options)
            .map((res: Response) => res.json())
            .catch((err) => err);

    }
    /**
     * [postEvent create new event]
     * @param  {marker.MapMarker} event [event to be created]
     * @return {Observable<any>}        [response]
     */
    postEvent(event: marker.MapMarker): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log(event.name + ' creation started');
        return this.http.post('http://52.27.228.148:4000/api/events', JSON.stringify(event), options)
            .map((res: Response) => res.json())
            .catch((err) => err);
    }
    handleErrors(error: Response) {
        console.log(JSON.stringify(error.json()));
        return Observable.throw(error);
    };


    /**
     * [getMapData return event map data from server, searches text to determines
     * sport since meetup API doesn't tell you what sport type it is. User
     * created events have sports already ]
     * @param  {string[]}                       chosen [only find matching sports]
     * @return {Observable<marker.MapMarker[]>}        [Observable array of events]
     */
    getMapData(chosen?: string[]): Observable<Array<marker.MapMarker>> {

        let sports: string[] = ['baseball', 'football', 'paddle', 'soccer', 'boxing',
            'golf', 'hockey', 'fencing', 'rugby', 'bowling', 'powerlifting', 'darts', 'fitness',
            'tennis', 'volleyball', 'skateboard', 'kickball', 'bowling', 'billiard',
            'offroad', 'diving', 'ballet', 'chess', 'curling', 'pingpong', 'skiing', 'iceskating', 'skydiving',
            'running', 'hiking', 'skating', 'dance', 'hockey', 'yoga', 'wrestling',
            'squash', 'swimming', 'horseriding', 'fishing', 'billards',
            'softball', 'sailing', 'skiing', 'shooting', 'bike', 'hunting', 'archery',
            'karting', 'kayak', 'climbing', 'snowboarding',
            'cricket', 'motorcycle', 'rugby', 'judo', 'scuba', 'barre', 'atv', 'basketball',
            'rowing', 'karate', 'mma', 'equestrian', 'gymnastics'
        ];


        let sportChoices: string[] = chosen !== undefined ? chosen : sports;
        //let finalResult: Array<any> = ['test'];
        // returns all we need to to make googe map markers and populate out menus
        return this.http.get('http://52.27.228.148:4000/api/events')
            .map((result: Response) => {
                //console.log("Hi" + result);
                let finalArray = result.json();
                //console.log(finalArray);
                //console.log(JSON.parse(result));
                // this looks odd but makes sense; RxJS map
                finalArray.map((response: marker.MapMarker) => {
                    // introduce random offset to give icons space from each other
                    if (response.venue !== undefined) {
                        response.venue.lon += Math.random() * 0.001;
                        response.venue.lat += Math.random() * 0.001;
                    }

                    // get sport choice match to identify sport
                    for (let i = 0; i < sportChoices.length; i++) {
                        // add description if not existing or empty string
                        if (response.description === undefined) {
                            response.description = 'No Description Provided';
                        }
                        // set yes_rsvp_count
                        response.yes_rsvp_count = response.rsvp_sample.length;
                        // set default visibility
                        response.options = {
                            visible: true
                        };

                        let search1 = response.group.name.toLowerCase().search(sportChoices[i].toLowerCase());

                        let search2 = response.description.toLowerCase().search(sportChoices[i].toLowerCase());

                        // find match to identify sports -- if user created, sport type will //exist
                        if (!response.sport) {

                            if (search1 !==
                                -1 || search2 !== -1) {
                                // console.log(sportChoices[i]);
                                response.sport = sportChoices[i];
                            }
                        }
                    }
                    return response;
                });

                //console.log(finalArray);
                let lastArray = finalArray.filter((ele) => {
                    //console.log(ele.name);
                    if (ele.venue !== undefined && ele.venue !== null) {
                        return true;
                    }
                });
                //console.log(lastArray);
                this.store.dispatch({ 'type': MARKER_RENEW, 'payload': lastArray });
                //finalResult = ['hello'];
                return lastArray;
            });

        //this.store.dispatch({ type: MARKER_RENEW, payload: "hoi" });

        //console.log("end of get map results");
        // return {
        //     type: MARKER_RENEW, payload: finalResult
        // };

    }
}

//
//  class allAction {
//   //login ACTION types
//   const LOGIN_REQUEST = 'LOGIN_REQUEST'
//   const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
//   const LOGIN_FAILURE = 'LOGIN_FAILURE'
//   //logout ACTION types
//   const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
//   const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
//   //sentiments ACTION types
//   const SENTIMENT_REQUEST = 'SENTIMENT_REQUEST'
//   const SENTIMENT_SUCCESS = 'SENTIMENT_SUCCESS'
//   const SENTIMENT_FAILURE = 'SENTIMENT_FAILURE'
//
//   requestLogin(creds) {
//     return {
//       type: allAction.LOGIN_REQUEST,
//       isFetching: true,
//       isAuthenticated: false,
//       creds
//     }
//   }
//
//   receiveLogin(user) {
//     return {
//       type: allAction.LOGIN_SUCCESS,
//       isFetching: false,
//       isAuthenticated: true,
//       token: user.token,
//       username: user.username
//     }
//   }
//
//   loginError(message) {
//     return {
//       type: allAction.LOGIN_FAILURE,
//       isFetching: false,
//       isAuthenticated: false,
//       message: message
//     }
//   }
//
//
//   requestLogout() {
//     return {
//       type: allAction.LOGOUT_REQUEST,
//       isFetching: true,
//       isAuthenticated: true
//     }
//   }
//
//   receiveLogout() {
//     return {
//       type: allAction.LOGOUT_SUCCESS,
//       isFetching: false,
//       isAuthenticated: false
//     }
//   }
//
//
//   // Logs the user out
//   logoutUser() {
//     return dispatch => {
//       dispatch(requestLogout())
//       localStorage.removeItem('satellizer_token');
//       localStorage.removeItem('facebookId');
//       dispatch(receiveLogout())
//     }
//   }
//
//
//   login(): void {
//     this.loginFacebook()
//       .subscribe({
//         next: (value) => {
//           console.log(value);
//           localStorage.setItem('facebookId', value.facebook.id);
//           //this.mapService.setMarkers(value.facebook.id);
//         },
//         error: (err: any) => console.log(err),
//         complete: () => {
//           this.setAuth();
//           console.log('Logged IN');
//         }
//       });
//   }
//   // /**
//   //  * [logout logs out, sets authstatus]
//   //  */
//   // logMeOut(): void {
//   //   this.logout();
//   //
//   // }
//   /**
//    * [setAuth checks to see if user is logged in already onInit, will get his data if so]
//    */
//   setAuth(): void {
//     if (this.authorized()) {
//       if (localStorage.getItem('facebookId') === undefined) {
//         this.authStatus = false;
//         this.logout();
//       } else {
//         this.getUser(localStorage.getItem('facebookId') ||
//           this.userData.facebook)
//           .subscribe({
//             next: (value) => {
//               this.userData = value[0];
//               console.log(this.userData);
//               // set user events
//             },
//             error: (err: any) => console.log(err),
//             complete: () => {
//               this.authStatus = true;
//               console.log('Authorized already');
//             }
//
//           });
//       }
//     } else {
//       this.authStatus = false;
//     }
//   }
//
//   /**
//    * [loginFacebook  logs in to facebooks OAuth Service, will also place]
//    * @return {Observable<any>}
//    */
//   loginFacebook(): Observable<any> {
//     return this.auth.authenticate('facebook')
//       .map(this.extractData)
//       .catch((err: any) => { console.log('error logging into facebook'); return err; });
//   }
//   /**
//    * [authorized  Sattelizer's service to check if user is already logged in]
//    * @return {[boolean]} [if loggined in, returns true]
//    */
//   authorized(): boolean {
//     return this.auth.isAuthenticated();
//   }
//   /**
//    * [getPayload get addition facebook user details, not needed or used]
//    * @return {[any]}
//    */
//   getPayload(): any {
//     return this.auth.getPayload();
//   }
//   /**
//    * [getUser get data and their events from our database]
//    * @param  {string}          facebookId [user id string]
//    * @return {Observable<any>}
//    */
//   getUser(facebookId: string): Observable<any> {
//     return this.http.get(`http://52.27.228.148:4000/api/me/?id=${facebookId}`)
//       .map(this.extractData)
//       .catch((err: any) => { console.log('error with http request getuser'); return err; });
//   }
//   /**
//    * [logout logs out user account ]
//    */
//   logout(): void {
//     this.auth.logout()
//       .subscribe({
//         error: (err: any) => console.log(err),
//         complete: () => {
//           this.authStatus = false;
//           localStorage.clear();
//           console.log('logged out');
//         }
//       });
//   }
// };
//
// }

//
// }
