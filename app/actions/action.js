"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
// const http = require("http");
var store_1 = require("@ngrx/store");
exports.MARKER_RENEW = 'MARKER_RENEW';
// const MARKER_GET = 'MARKER_GET';
exports.MARKER_ADD = 'MARKER_ADD';
exports.MARKER_REMOVE = 'MARKER_REMOVE';
exports.MARKER_LEAVE = 'MARKER_LEAVE';
exports.MARKER_JOIN = 'MARKER_JOIN';
exports.LOGIN_USER = 'LOGIN_USER';
exports.LOGOUT_USER = 'LOGOUT_USER';
var MapService = (function () {
    function MapService(http, store) {
        this.http = http;
        this.store = store;
        /**
         * [listSports list of sports to export]
         * @type {string[]}
         */
        this.listSports = ['baseball', 'football', 'paddle', 'soccer', 'boxing',
            'golf', 'hockey', 'fencing', 'rugby', 'bowling', 'powerlifting', 'darts', 'fitness',
            'tennis', 'volleyball', 'skateboard', 'kickball', 'bowling', 'billiard',
            'offroad', 'diving', 'ballet', 'chess', 'curling', 'pingpong', 'skiing', 'iceskating', 'skydiving',
            'running', 'hiking', 'skating', 'dance', 'hockey', 'yoga', 'wrestling',
            'squash', 'swimming', 'horseriding', 'fishing', 'billards',
            'softball', 'sailing', 'skiing', 'shooting', 'bike', 'hunting', 'archery',
            'karting', 'kayak', 'climbing', 'snowboarding', 'cricket', 'motorcycle', 'rugby', 'judo', 'scuba', 'barre', 'atv', 'basketball',
            'rowing', 'karate', 'mma', 'equestrian', 'gymnastics'
        ];
    }
    MapService.prototype.loginUser = function (token) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json',
            'Authorization': 'OAuth ' + token });
        var options = new http_1.RequestOptions({ headers: headers });
        var fields = ['id', 'email', 'first_name', 'last_name', 'link', 'name',
            'friends'
        ];
        var graphApiUrl = 'https://graph.facebook.com/v2.5/me?fields=' + fields.join(',');
        return this.http.get(graphApiUrl, options)
            .map(function (res) {
            var profile = res.json();
            var subData = {};
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
            _this.store.dispatch({ 'type': exports.LOGIN_USER, 'payload': subData });
            return subData;
        })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Login attempt error'); });
    };
    MapService.prototype.logoutUser = function () {
        this.store.dispatch({ 'type': exports.LOGOUT_USER });
        console.log('logged out user: user store data empty');
    };
    /**
     * [getEvent used to grab user data]
     * @param  {string}          eventId [event string id]
     * @return {Observable<any>}         [Response]
     */
    MapService.prototype.getEvent = function (eventId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log(eventId + ' retrieval started');
        return this.http.get('http://52.27.228.148:4000/api/events/' + eventId, options)
            .map(function (res) {
            var eventData = res.json();
            //console.dir(res.json());
            // this.store.dispatch({'type': MARKER_RENEW, payload: eventData});
            console.log('here comes response');
            return eventData;
        })
            .catch(function (error) { return Observable_1.Observable.throw(error.json().error || 'Server error'); });
    };
    /**
     * [deleteEvent used to delete event from database]
     * @param  {string}          eventId [event string id]
     * @return {Observable<any>}         [Response]
     */
    MapService.prototype.deleteEvent = function (eventId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log('event' + eventId + 'deleted event');
        return this.http.delete('http://52.27.228.148:4000/api/events/' + eventId, options)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return err; });
    };
    /**
     * [leaveEvent leave an event, removes user from event data]
     * @param  {any}             event   [event data]
     * @param  {string}          eventId [event id]
     * @return {Observable<any>}         [response]
     */
    MapService.prototype.leaveEvent = function (event, eventId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log('event' + eventId + 'updated');
        return this.http.put('http://52.27.228.148:4000/api/leave/' + eventId, JSON.stringify(event), options)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return err; });
    };
    /**
     * [joinEvent add user to event]
     * @param  {marker.RsvpSample} member  [member to add]
     * @param  {string}            eventId [event id string]
     * @return {Observable<any>}           [response]
     */
    MapService.prototype.joinEvent = function (member, eventId, event) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log('event' + eventId + 'updated');
        return this.http.put('http://52.27.228.148:4000/api/events/' + eventId, JSON.stringify(member), options)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return err; });
    };
    /**
     * [postEvent create new event]
     * @param  {marker.MapMarker} event [event to be created]
     * @return {Observable<any>}        [response]
     */
    MapService.prototype.postEvent = function (event) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        console.log(event.name + ' creation started');
        return this.http.post('http://52.27.228.148:4000/api/events', JSON.stringify(event), options)
            .map(function (res) { return res.json(); })
            .catch(function (err) { return err; });
    };
    MapService.prototype.handleErrors = function (error) {
        console.log(JSON.stringify(error.json()));
        return Observable_1.Observable.throw(error);
    };
    ;
    /**
     * [getMapData return event map data from server, searches text to determines
     * sport since meetup API doesn't tell you what sport type it is. User
     * created events have sports already ]
     * @param  {string[]}                       chosen [only find matching sports]
     * @return {Observable<marker.MapMarker[]>}        [Observable array of events]
     */
    MapService.prototype.getMapData = function (chosen) {
        var _this = this;
        var sports = ['baseball', 'football', 'paddle', 'soccer', 'boxing',
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
        var sportChoices = chosen !== undefined ? chosen : sports;
        //let finalResult: Array<any> = ['test'];
        // returns all we need to to make googe map markers and populate out menus
        return this.http.get('http://52.27.228.148:4000/api/events')
            .map(function (result) {
            //console.log("Hi" + result);
            var finalArray = result.json();
            //console.log(finalArray);
            //console.log(JSON.parse(result));
            // this looks odd but makes sense; RxJS map
            finalArray.map(function (response) {
                // introduce random offset to give icons space from each other
                if (response.venue !== undefined) {
                    response.venue.lon += Math.random() * 0.001;
                    response.venue.lat += Math.random() * 0.001;
                }
                // get sport choice match to identify sport
                for (var i = 0; i < sportChoices.length; i++) {
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
                    var search1 = response.group.name.toLowerCase().search(sportChoices[i].toLowerCase());
                    var search2 = response.description.toLowerCase().search(sportChoices[i].toLowerCase());
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
            var lastArray = finalArray.filter(function (ele) {
                //console.log(ele.name);
                if (ele.venue !== undefined && ele.venue !== null) {
                    return true;
                }
            });
            //console.log(lastArray);
            _this.store.dispatch({ 'type': exports.MARKER_RENEW, 'payload': lastArray });
            //finalResult = ['hello'];
            return lastArray;
        });
        //this.store.dispatch({ type: MARKER_RENEW, payload: "hoi" });
        //console.log("end of get map results");
        // return {
        //     type: MARKER_RENEW, payload: finalResult
        // };
    };
    return MapService;
}());
MapService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, store_1.Store])
], MapService);
exports.MapService = MapService;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBRXVCO0FBQ3ZCLHNDQUFzRTtBQUN0RSw4Q0FBNkM7QUFDN0MsZ0NBQThCO0FBQzlCLGlDQUErQjtBQUMvQixtQ0FBaUM7QUFTakMsZ0NBQWdDO0FBQ2hDLHFDQUFvQztBQUd2QixRQUFBLFlBQVksR0FBRyxjQUFjLENBQUM7QUFDM0MsbUNBQW1DO0FBQ3RCLFFBQUEsVUFBVSxHQUFHLFlBQVksQ0FBQztBQUMxQixRQUFBLGFBQWEsR0FBRyxlQUFlLENBQUM7QUFDaEMsUUFBQSxZQUFZLEdBQUcsY0FBYyxDQUFDO0FBQzlCLFFBQUEsV0FBVyxHQUFHLGFBQWEsQ0FBQztBQUM1QixRQUFBLFVBQVUsR0FBRSxZQUFZLENBQUM7QUFDekIsUUFBQSxXQUFXLEdBQUUsYUFBYSxDQUFDO0FBRXhDLElBQWEsVUFBVTtJQUVuQixvQkFBbUIsSUFBVSxFQUFVLEtBQWlCO1FBQXJDLFNBQUksR0FBSixJQUFJLENBQU07UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQ3hEOzs7V0FHRztRQUNILGVBQVUsR0FBYSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRO1lBQ3hFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBRSxTQUFTO1lBQ25GLFFBQVEsRUFBRSxZQUFZLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUUsVUFBVTtZQUN2RSxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLFdBQVc7WUFDbEcsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVB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QUMzRixNQUFNO0FBQ04sUUFBUTtBQUNSLGdGQUFnRjtBQUNoRiwwREFBMEQ7QUFDMUQsUUFBUTtBQUNSLDRCQUE0QjtBQUM1QiwwQ0FBMEM7QUFDMUMsTUFBTTtBQUNOLFFBQVE7QUFDUiwyRUFBMkU7QUFDM0UsdUJBQXVCO0FBQ3ZCLFFBQVE7QUFDUix3QkFBd0I7QUFDeEIscUNBQXFDO0FBQ3JDLE1BQU07QUFDTixRQUFRO0FBQ1IsNkRBQTZEO0FBQzdELDZEQUE2RDtBQUM3RCxpQ0FBaUM7QUFDakMsUUFBUTtBQUNSLG1EQUFtRDtBQUNuRCxpRkFBaUY7QUFDakYsK0JBQStCO0FBQy9CLCtGQUErRjtBQUMvRixNQUFNO0FBQ04sUUFBUTtBQUNSLHVDQUF1QztBQUN2QyxRQUFRO0FBQ1IscUJBQXFCO0FBQ3JCLHlCQUF5QjtBQUN6QixxQkFBcUI7QUFDckIsaURBQWlEO0FBQ2pELDRCQUE0QjtBQUM1QixxQ0FBcUM7QUFDckMsa0NBQWtDO0FBQ2xDLHVDQUF1QztBQUN2QyxZQUFZO0FBQ1osWUFBWTtBQUNaLE1BQU07QUFDTixLQUFLO0FBQ0wsRUFBRTtBQUNGLElBQUk7QUFFSixFQUFFO0FBQ0YsSUFBSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgICBJbmplY3RhYmxlXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7SHR0cCwgUmVzcG9uc2UsIEhlYWRlcnMsIFJlcXVlc3RPcHRpb25zfSBmcm9tICdAYW5ndWxhci9odHRwJztcclxuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcbmltcG9ydCAncnhqcy9hZGQvb3BlcmF0b3IvbWFwJztcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9jYXRjaCc7XHJcbmltcG9ydCAqIGFzIHRuc09BdXRoTW9kdWxlIGZyb20gJ25hdGl2ZXNjcmlwdC1vYXV0aCc7XHJcblxyXG5cclxuaW1wb3J0IHtcclxuICAgIEFjdGlvblxyXG59IGZyb20gJ0BuZ3J4L3N0b3JlJztcclxuaW1wb3J0IHttYXJrZXJ9IGZyb20gJy4uL2NvbXBvbmVudHMvaW50ZXJmYWNlL21hcmtlcic7XHJcbmltcG9ydCB7dXNlcn0gZnJvbSAnLi4vY29tcG9uZW50cy9pbnRlcmZhY2UvdXNlcic7XHJcbi8vIGNvbnN0IGh0dHAgPSByZXF1aXJlKFwiaHR0cFwiKTtcclxuaW1wb3J0IHsgU3RvcmUgfSBmcm9tICdAbmdyeC9zdG9yZSc7XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IE1BUktFUl9SRU5FVyA9ICdNQVJLRVJfUkVORVcnO1xyXG4vLyBjb25zdCBNQVJLRVJfR0VUID0gJ01BUktFUl9HRVQnO1xyXG5leHBvcnQgY29uc3QgTUFSS0VSX0FERCA9ICdNQVJLRVJfQUREJztcclxuZXhwb3J0IGNvbnN0IE1BUktFUl9SRU1PVkUgPSAnTUFSS0VSX1JFTU9WRSc7XHJcbmV4cG9ydCBjb25zdCBNQVJLRVJfTEVBVkUgPSAnTUFSS0VSX0xFQVZFJztcclxuZXhwb3J0IGNvbnN0IE1BUktFUl9KT0lOID0gJ01BUktFUl9KT0lOJztcclxuZXhwb3J0IGNvbnN0IExPR0lOX1VTRVIgPSdMT0dJTl9VU0VSJztcclxuZXhwb3J0IGNvbnN0IExPR09VVF9VU0VSID0nTE9HT1VUX1VTRVInO1xyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBNYXBTZXJ2aWNlIHtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgaHR0cDogSHR0cCwgcHJpdmF0ZSBzdG9yZTogU3RvcmU8YW55PikgeyB9XHJcbiAgICAvKipcclxuICAgICAqIFtsaXN0U3BvcnRzIGxpc3Qgb2Ygc3BvcnRzIHRvIGV4cG9ydF1cclxuICAgICAqIEB0eXBlIHtzdHJpbmdbXX1cclxuICAgICAqL1xyXG4gICAgbGlzdFNwb3J0czogc3RyaW5nW10gPSBbJ2Jhc2ViYWxsJywgJ2Zvb3RiYWxsJywgJ3BhZGRsZScsICdzb2NjZXInLCAnYm94aW5nJyxcclxuICAgICAgICAnZ29sZicsICdob2NrZXknLCAnZmVuY2luZycsICdydWdieScsICdib3dsaW5nJywgJ3Bvd2VybGlmdGluZycsICdkYXJ0cycsICdmaXRuZXNzJyxcclxuICAgICAgICAndGVubmlzJywgJ3ZvbGxleWJhbGwnLCAnc2thdGVib2FyZCcsICdraWNrYmFsbCcsICdib3dsaW5nJywgJ2JpbGxpYXJkJyxcclxuICAgICAgICAnb2Zmcm9hZCcsICdkaXZpbmcnLCAnYmFsbGV0JywgJ2NoZXNzJywgJ2N1cmxpbmcnLCAncGluZ3BvbmcnLCAnc2tpaW5nJywgJ2ljZXNrYXRpbmcnLCAnc2t5ZGl2aW5nJyxcclxuICAgICAgICAncnVubmluZycsICdoaWtpbmcnLCAnc2thdGluZycsICdkYW5jZScsICdob2NrZXknLCAneW9nYScsICd3cmVzdGxpbmcnLFxyXG4gICAgICAgICdzcXVhc2gnLCAnc3dpbW1pbmcnLCAnaG9yc2VyaWRpbmcnLCAnZmlzaGluZycsICdiaWxsYXJkcycsXHJcbiAgICAgICAgJ3NvZnRiYWxsJywgJ3NhaWxpbmcnLCAnc2tpaW5nJywgJ3Nob290aW5nJywgJ2Jpa2UnLCAnaHVudGluZycsICdhcmNoZXJ5JyxcclxuICAgICAgICAna2FydGluZycsICdrYXlhaycsICdjbGltYmluZycsICdzbm93Ym9hcmRpbmcnLCAnY3JpY2tldCcsICdtb3RvcmN5Y2xlJywgJ3J1Z2J5JywgJ2p1ZG8nLCAnc2N1YmEnLCAnYmFycmUnLCAnYXR2JywgJ2Jhc2tldGJhbGwnLFxyXG4gICAgICAgICdyb3dpbmcnLCAna2FyYXRlJywgJ21tYScsICdlcXVlc3RyaWFuJywgJ2d5bW5hc3RpY3MnXHJcbiAgICBdO1xyXG5cclxuXHJcbiAgICBsb2dpblVzZXIodG9rZW46c3RyaW5nKTogT2JzZXJ2YWJsZTx1c2VyLlVzZXJQcm9maWxlPiB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICdBdXRob3JpemF0aW9uJzogJ09BdXRoICcgKyB0b2tlbiB9KTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgICAgICAgbGV0IGZpZWxkcyA9IFsnaWQnLCAnZW1haWwnLCAnZmlyc3RfbmFtZScsICdsYXN0X25hbWUnLCAnbGluaycsICduYW1lJyxcclxuICAgICAgICAgICdmcmllbmRzJ1xyXG4gICAgICAgIF07XHJcbiAgICAgICAgbGV0IGdyYXBoQXBpVXJsID0gJ2h0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tL3YyLjUvbWU/ZmllbGRzPScgKyBmaWVsZHMuam9pbignLCcpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGdyYXBoQXBpVXJsXHJcbiAgICAgICAgLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgbGV0IHByb2ZpbGUgPSByZXMuanNvbigpO1xyXG4gICAgICAgICAgICAgIGxldCBzdWJEYXRhOiBhbnkgPSB7fTtcclxuICAgICAgICAgICAgICBzdWJEYXRhLmxhc3ROYW1lID0gcHJvZmlsZS5sYXN0X25hbWU7XHJcbiAgICAgICAgICAgICAgc3ViRGF0YS5maXJzdE5hbWUgPSBwcm9maWxlLmZpcnN0X25hbWU7XHJcbiAgICAgICAgICAgICAgc3ViRGF0YS5kaXNwbGF5TmFtZSA9IHByb2ZpbGUuZmlyc3RfbmFtZSArIFwiIFwiICsgcHJvZmlsZS5sYXN0X25hbWU7XHJcbiAgICAgICAgICAgICAgc3ViRGF0YS5saW5rID0gcHJvZmlsZS5saW5rO1xyXG4gICAgICAgICAgICAgIHN1YkRhdGEuZW1haWwgPSBwcm9maWxlLmVtYWlsO1xyXG4gICAgICAgICAgICAgIHN1YkRhdGEuZnJpZW5kcyA9IHByb2ZpbGUuZnJpZW5kcztcclxuICAgICAgICAgICAgICBzdWJEYXRhLmZhY2Vib29rID0gcHJvZmlsZS5pZDtcclxuICAgICAgICAgICAgICBzdWJEYXRhLnBpY3R1cmUgPSAnaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vdjIuOC8nICsgcHJvZmlsZS5pZCArICcvcGljdHVyZT90eXBlPXNtYWxsJztcclxuICAgICAgICAgICAgICBzdWJEYXRhLmJpZ1BpY3R1cmUgPSAnaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vdjIuOC8nICsgcHJvZmlsZS5pZCArICcvcGljdHVyZT90eXBlPWxhcmdlJztcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdoZXJlIGNvbWVzIHJlc3BvbnNlJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihzdWJEYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goeyd0eXBlJzogTE9HSU5fVVNFUiwgJ3BheWxvYWQnOiBzdWJEYXRhfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3ViRGF0YTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcjogYW55KSA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKS5lcnJvciB8fCAnTG9naW4gYXR0ZW1wdCBlcnJvcicpKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBsb2dvdXRVc2VyKCk6IHZvaWQge1xyXG4gICAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goeyd0eXBlJzogTE9HT1VUX1VTRVJ9KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ2dlZCBvdXQgdXNlcjogdXNlciBzdG9yZSBkYXRhIGVtcHR5Jyk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBbZ2V0RXZlbnQgdXNlZCB0byBncmFiIHVzZXIgZGF0YV1cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgZXZlbnRJZCBbZXZlbnQgc3RyaW5nIGlkXVxyXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fSAgICAgICAgIFtSZXNwb25zZV1cclxuICAgICAqL1xyXG4gICAgZ2V0RXZlbnQoZXZlbnRJZDogYW55KTogT2JzZXJ2YWJsZTxBcnJheTxtYXJrZXIuTWFwTWFya2VyPj4ge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhldmVudElkICsgJyByZXRyaWV2YWwgc3RhcnRlZCcpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCdodHRwOi8vNTIuMjcuMjI4LjE0ODo0MDAwL2FwaS9ldmVudHMvJyArIGV2ZW50SWQsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBldmVudERhdGEgPSByZXMuanNvbigpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmRpcihyZXMuanNvbigpKTtcclxuICAgICAgICAgICAgICAgLy8gdGhpcy5zdG9yZS5kaXNwYXRjaCh7J3R5cGUnOiBNQVJLRVJfUkVORVcsIHBheWxvYWQ6IGV2ZW50RGF0YX0pO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2hlcmUgY29tZXMgcmVzcG9uc2UnKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBldmVudERhdGE7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyb3I6IGFueSkgPT4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvci5qc29uKCkuZXJyb3IgfHwgJ1NlcnZlciBlcnJvcicpKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBbZGVsZXRlRXZlbnQgdXNlZCB0byBkZWxldGUgZXZlbnQgZnJvbSBkYXRhYmFzZV1cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgZXZlbnRJZCBbZXZlbnQgc3RyaW5nIGlkXVxyXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fSAgICAgICAgIFtSZXNwb25zZV1cclxuICAgICAqL1xyXG4gICAgZGVsZXRlRXZlbnQoZXZlbnRJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2V2ZW50JyArIGV2ZW50SWQgKyAnZGVsZXRlZCBldmVudCcpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZGVsZXRlKCdodHRwOi8vNTIuMjcuMjI4LjE0ODo0MDAwL2FwaS9ldmVudHMvJyArIGV2ZW50SWQsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBlcnIpO1xyXG5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogW2xlYXZlRXZlbnQgbGVhdmUgYW4gZXZlbnQsIHJlbW92ZXMgdXNlciBmcm9tIGV2ZW50IGRhdGFdXHJcbiAgICAgKiBAcGFyYW0gIHthbnl9ICAgICAgICAgICAgIGV2ZW50ICAgW2V2ZW50IGRhdGFdXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgIGV2ZW50SWQgW2V2ZW50IGlkXVxyXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fSAgICAgICAgIFtyZXNwb25zZV1cclxuICAgICAqL1xyXG4gICAgbGVhdmVFdmVudChldmVudDogYW55LCBldmVudElkOiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZygnZXZlbnQnICsgZXZlbnRJZCArICd1cGRhdGVkJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoJ2h0dHA6Ly81Mi4yNy4yMjguMTQ4OjQwMDAvYXBpL2xlYXZlLycgKyBldmVudElkLCBKU09OLnN0cmluZ2lmeShldmVudCksIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBlcnIpO1xyXG5cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgICogW2pvaW5FdmVudCBhZGQgdXNlciB0byBldmVudF1cclxuICAgICAqIEBwYXJhbSAge21hcmtlci5Sc3ZwU2FtcGxlfSBtZW1iZXIgIFttZW1iZXIgdG8gYWRkXVxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICAgIGV2ZW50SWQgW2V2ZW50IGlkIHN0cmluZ11cclxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn0gICAgICAgICAgIFtyZXNwb25zZV1cclxuICAgICAqL1xyXG5cclxuICAgIGpvaW5FdmVudChtZW1iZXI6IG1hcmtlci5Sc3ZwU2FtcGxlLCBldmVudElkOiBzdHJpbmcsIGV2ZW50OiBhbnkpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZygnZXZlbnQnICsgZXZlbnRJZCArICd1cGRhdGVkJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wdXQoJ2h0dHA6Ly81Mi4yNy4yMjguMTQ4OjQwMDAvYXBpL2V2ZW50cy8nICsgZXZlbnRJZCwgSlNPTi5zdHJpbmdpZnkobWVtYmVyKSwgb3B0aW9ucylcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGVycik7XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBbcG9zdEV2ZW50IGNyZWF0ZSBuZXcgZXZlbnRdXHJcbiAgICAgKiBAcGFyYW0gIHttYXJrZXIuTWFwTWFya2VyfSBldmVudCBbZXZlbnQgdG8gYmUgY3JlYXRlZF1cclxuICAgICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn0gICAgICAgIFtyZXNwb25zZV1cclxuICAgICAqL1xyXG4gICAgcG9zdEV2ZW50KGV2ZW50OiBtYXJrZXIuTWFwTWFya2VyKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IG5ldyBSZXF1ZXN0T3B0aW9ucyh7IGhlYWRlcnM6IGhlYWRlcnMgfSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coZXZlbnQubmFtZSArICcgY3JlYXRpb24gc3RhcnRlZCcpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAucG9zdCgnaHR0cDovLzUyLjI3LjIyOC4xNDg6NDAwMC9hcGkvZXZlbnRzJywgSlNPTi5zdHJpbmdpZnkoZXZlbnQpLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gZXJyKTtcclxuICAgIH1cclxuICAgIGhhbmRsZUVycm9ycyhlcnJvcjogUmVzcG9uc2UpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShlcnJvci5qc29uKCkpKTtcclxuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZS50aHJvdyhlcnJvcik7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFtnZXRNYXBEYXRhIHJldHVybiBldmVudCBtYXAgZGF0YSBmcm9tIHNlcnZlciwgc2VhcmNoZXMgdGV4dCB0byBkZXRlcm1pbmVzXHJcbiAgICAgKiBzcG9ydCBzaW5jZSBtZWV0dXAgQVBJIGRvZXNuJ3QgdGVsbCB5b3Ugd2hhdCBzcG9ydCB0eXBlIGl0IGlzLiBVc2VyXHJcbiAgICAgKiBjcmVhdGVkIGV2ZW50cyBoYXZlIHNwb3J0cyBhbHJlYWR5IF1cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ1tdfSAgICAgICAgICAgICAgICAgICAgICAgY2hvc2VuIFtvbmx5IGZpbmQgbWF0Y2hpbmcgc3BvcnRzXVxyXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxtYXJrZXIuTWFwTWFya2VyW10+fSAgICAgICAgW09ic2VydmFibGUgYXJyYXkgb2YgZXZlbnRzXVxyXG4gICAgICovXHJcbiAgICBnZXRNYXBEYXRhKGNob3Nlbj86IHN0cmluZ1tdKTogT2JzZXJ2YWJsZTxBcnJheTxtYXJrZXIuTWFwTWFya2VyPj4ge1xyXG5cclxuICAgICAgICBsZXQgc3BvcnRzOiBzdHJpbmdbXSA9IFsnYmFzZWJhbGwnLCAnZm9vdGJhbGwnLCAncGFkZGxlJywgJ3NvY2NlcicsICdib3hpbmcnLFxyXG4gICAgICAgICAgICAnZ29sZicsICdob2NrZXknLCAnZmVuY2luZycsICdydWdieScsICdib3dsaW5nJywgJ3Bvd2VybGlmdGluZycsICdkYXJ0cycsICdmaXRuZXNzJyxcclxuICAgICAgICAgICAgJ3Rlbm5pcycsICd2b2xsZXliYWxsJywgJ3NrYXRlYm9hcmQnLCAna2lja2JhbGwnLCAnYm93bGluZycsICdiaWxsaWFyZCcsXHJcbiAgICAgICAgICAgICdvZmZyb2FkJywgJ2RpdmluZycsICdiYWxsZXQnLCAnY2hlc3MnLCAnY3VybGluZycsICdwaW5ncG9uZycsICdza2lpbmcnLCAnaWNlc2thdGluZycsICdza3lkaXZpbmcnLFxyXG4gICAgICAgICAgICAncnVubmluZycsICdoaWtpbmcnLCAnc2thdGluZycsICdkYW5jZScsICdob2NrZXknLCAneW9nYScsICd3cmVzdGxpbmcnLFxyXG4gICAgICAgICAgICAnc3F1YXNoJywgJ3N3aW1taW5nJywgJ2hvcnNlcmlkaW5nJywgJ2Zpc2hpbmcnLCAnYmlsbGFyZHMnLFxyXG4gICAgICAgICAgICAnc29mdGJhbGwnLCAnc2FpbGluZycsICdza2lpbmcnLCAnc2hvb3RpbmcnLCAnYmlrZScsICdodW50aW5nJywgJ2FyY2hlcnknLFxyXG4gICAgICAgICAgICAna2FydGluZycsICdrYXlhaycsICdjbGltYmluZycsICdzbm93Ym9hcmRpbmcnLFxyXG4gICAgICAgICAgICAnY3JpY2tldCcsICdtb3RvcmN5Y2xlJywgJ3J1Z2J5JywgJ2p1ZG8nLCAnc2N1YmEnLCAnYmFycmUnLCAnYXR2JywgJ2Jhc2tldGJhbGwnLFxyXG4gICAgICAgICAgICAncm93aW5nJywgJ2thcmF0ZScsICdtbWEnLCAnZXF1ZXN0cmlhbicsICdneW1uYXN0aWNzJ1xyXG4gICAgICAgIF07XHJcblxyXG5cclxuICAgICAgICBsZXQgc3BvcnRDaG9pY2VzOiBzdHJpbmdbXSA9IGNob3NlbiAhPT0gdW5kZWZpbmVkID8gY2hvc2VuIDogc3BvcnRzO1xyXG4gICAgICAgIC8vbGV0IGZpbmFsUmVzdWx0OiBBcnJheTxhbnk+ID0gWyd0ZXN0J107XHJcbiAgICAgICAgLy8gcmV0dXJucyBhbGwgd2UgbmVlZCB0byB0byBtYWtlIGdvb2dlIG1hcCBtYXJrZXJzIGFuZCBwb3B1bGF0ZSBvdXQgbWVudXNcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldCgnaHR0cDovLzUyLjI3LjIyOC4xNDg6NDAwMC9hcGkvZXZlbnRzJylcclxuICAgICAgICAgICAgLm1hcCgocmVzdWx0OiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIkhpXCIgKyByZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbmFsQXJyYXkgPSByZXN1bHQuanNvbigpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhmaW5hbEFycmF5KTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coSlNPTi5wYXJzZShyZXN1bHQpKTtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMgbG9va3Mgb2RkIGJ1dCBtYWtlcyBzZW5zZTsgUnhKUyBtYXBcclxuICAgICAgICAgICAgICAgIGZpbmFsQXJyYXkubWFwKChyZXNwb25zZTogbWFya2VyLk1hcE1hcmtlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGludHJvZHVjZSByYW5kb20gb2Zmc2V0IHRvIGdpdmUgaWNvbnMgc3BhY2UgZnJvbSBlYWNoIG90aGVyXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnZlbnVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudmVudWUubG9uICs9IE1hdGgucmFuZG9tKCkgKiAwLjAwMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UudmVudWUubGF0ICs9IE1hdGgucmFuZG9tKCkgKiAwLjAwMTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGdldCBzcG9ydCBjaG9pY2UgbWF0Y2ggdG8gaWRlbnRpZnkgc3BvcnRcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwb3J0Q2hvaWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhZGQgZGVzY3JpcHRpb24gaWYgbm90IGV4aXN0aW5nIG9yIGVtcHR5IHN0cmluZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UuZGVzY3JpcHRpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UuZGVzY3JpcHRpb24gPSAnTm8gRGVzY3JpcHRpb24gUHJvdmlkZWQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNldCB5ZXNfcnN2cF9jb3VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS55ZXNfcnN2cF9jb3VudCA9IHJlc3BvbnNlLnJzdnBfc2FtcGxlLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0IGRlZmF1bHQgdmlzaWJpbGl0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5vcHRpb25zID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlYXJjaDEgPSByZXNwb25zZS5ncm91cC5uYW1lLnRvTG93ZXJDYXNlKCkuc2VhcmNoKHNwb3J0Q2hvaWNlc1tpXS50b0xvd2VyQ2FzZSgpKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWFyY2gyID0gcmVzcG9uc2UuZGVzY3JpcHRpb24udG9Mb3dlckNhc2UoKS5zZWFyY2goc3BvcnRDaG9pY2VzW2ldLnRvTG93ZXJDYXNlKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmluZCBtYXRjaCB0byBpZGVudGlmeSBzcG9ydHMgLS0gaWYgdXNlciBjcmVhdGVkLCBzcG9ydCB0eXBlIHdpbGwgLy9leGlzdFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3BvbnNlLnNwb3J0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlYXJjaDEgIT09XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLTEgfHwgc2VhcmNoMiAhPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhzcG9ydENob2ljZXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnNwb3J0ID0gc3BvcnRDaG9pY2VzW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZmluYWxBcnJheSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGFzdEFycmF5ID0gZmluYWxBcnJheS5maWx0ZXIoKGVsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZWxlLm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbGUudmVudWUgIT09IHVuZGVmaW5lZCAmJiBlbGUudmVudWUgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGxhc3RBcnJheSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlLmRpc3BhdGNoKHsgJ3R5cGUnOiBNQVJLRVJfUkVORVcsICdwYXlsb2FkJzogbGFzdEFycmF5IH0pO1xyXG4gICAgICAgICAgICAgICAgLy9maW5hbFJlc3VsdCA9IFsnaGVsbG8nXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBsYXN0QXJyYXk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvL3RoaXMuc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiBNQVJLRVJfUkVORVcsIHBheWxvYWQ6IFwiaG9pXCIgfSk7XHJcblxyXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJlbmQgb2YgZ2V0IG1hcCByZXN1bHRzXCIpO1xyXG4gICAgICAgIC8vIHJldHVybiB7XHJcbiAgICAgICAgLy8gICAgIHR5cGU6IE1BUktFUl9SRU5FVywgcGF5bG9hZDogZmluYWxSZXN1bHRcclxuICAgICAgICAvLyB9O1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuLy9cclxuLy8gIGNsYXNzIGFsbEFjdGlvbiB7XHJcbi8vICAgLy9sb2dpbiBBQ1RJT04gdHlwZXNcclxuLy8gICBjb25zdCBMT0dJTl9SRVFVRVNUID0gJ0xPR0lOX1JFUVVFU1QnXHJcbi8vICAgY29uc3QgTE9HSU5fU1VDQ0VTUyA9ICdMT0dJTl9TVUNDRVNTJ1xyXG4vLyAgIGNvbnN0IExPR0lOX0ZBSUxVUkUgPSAnTE9HSU5fRkFJTFVSRSdcclxuLy8gICAvL2xvZ291dCBBQ1RJT04gdHlwZXNcclxuLy8gICBjb25zdCBMT0dPVVRfUkVRVUVTVCA9ICdMT0dPVVRfUkVRVUVTVCdcclxuLy8gICBjb25zdCBMT0dPVVRfU1VDQ0VTUyA9ICdMT0dPVVRfU1VDQ0VTUydcclxuLy8gICAvL3NlbnRpbWVudHMgQUNUSU9OIHR5cGVzXHJcbi8vICAgY29uc3QgU0VOVElNRU5UX1JFUVVFU1QgPSAnU0VOVElNRU5UX1JFUVVFU1QnXHJcbi8vICAgY29uc3QgU0VOVElNRU5UX1NVQ0NFU1MgPSAnU0VOVElNRU5UX1NVQ0NFU1MnXHJcbi8vICAgY29uc3QgU0VOVElNRU5UX0ZBSUxVUkUgPSAnU0VOVElNRU5UX0ZBSUxVUkUnXHJcbi8vXHJcbi8vICAgcmVxdWVzdExvZ2luKGNyZWRzKSB7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICB0eXBlOiBhbGxBY3Rpb24uTE9HSU5fUkVRVUVTVCxcclxuLy8gICAgICAgaXNGZXRjaGluZzogdHJ1ZSxcclxuLy8gICAgICAgaXNBdXRoZW50aWNhdGVkOiBmYWxzZSxcclxuLy8gICAgICAgY3JlZHNcclxuLy8gICAgIH1cclxuLy8gICB9XHJcbi8vXHJcbi8vICAgcmVjZWl2ZUxvZ2luKHVzZXIpIHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgIHR5cGU6IGFsbEFjdGlvbi5MT0dJTl9TVUNDRVNTLFxyXG4vLyAgICAgICBpc0ZldGNoaW5nOiBmYWxzZSxcclxuLy8gICAgICAgaXNBdXRoZW50aWNhdGVkOiB0cnVlLFxyXG4vLyAgICAgICB0b2tlbjogdXNlci50b2tlbixcclxuLy8gICAgICAgdXNlcm5hbWU6IHVzZXIudXNlcm5hbWVcclxuLy8gICAgIH1cclxuLy8gICB9XHJcbi8vXHJcbi8vICAgbG9naW5FcnJvcihtZXNzYWdlKSB7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICB0eXBlOiBhbGxBY3Rpb24uTE9HSU5fRkFJTFVSRSxcclxuLy8gICAgICAgaXNGZXRjaGluZzogZmFsc2UsXHJcbi8vICAgICAgIGlzQXV0aGVudGljYXRlZDogZmFsc2UsXHJcbi8vICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcclxuLy8gICAgIH1cclxuLy8gICB9XHJcbi8vXHJcbi8vXHJcbi8vICAgcmVxdWVzdExvZ291dCgpIHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgIHR5cGU6IGFsbEFjdGlvbi5MT0dPVVRfUkVRVUVTVCxcclxuLy8gICAgICAgaXNGZXRjaGluZzogdHJ1ZSxcclxuLy8gICAgICAgaXNBdXRoZW50aWNhdGVkOiB0cnVlXHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG4vL1xyXG4vLyAgIHJlY2VpdmVMb2dvdXQoKSB7XHJcbi8vICAgICByZXR1cm4ge1xyXG4vLyAgICAgICB0eXBlOiBhbGxBY3Rpb24uTE9HT1VUX1NVQ0NFU1MsXHJcbi8vICAgICAgIGlzRmV0Y2hpbmc6IGZhbHNlLFxyXG4vLyAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IGZhbHNlXHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG4vL1xyXG4vL1xyXG4vLyAgIC8vIExvZ3MgdGhlIHVzZXIgb3V0XHJcbi8vICAgbG9nb3V0VXNlcigpIHtcclxuLy8gICAgIHJldHVybiBkaXNwYXRjaCA9PiB7XHJcbi8vICAgICAgIGRpc3BhdGNoKHJlcXVlc3RMb2dvdXQoKSlcclxuLy8gICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3NhdGVsbGl6ZXJfdG9rZW4nKTtcclxuLy8gICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2ZhY2Vib29rSWQnKTtcclxuLy8gICAgICAgZGlzcGF0Y2gocmVjZWl2ZUxvZ291dCgpKVxyXG4vLyAgICAgfVxyXG4vLyAgIH1cclxuLy9cclxuLy9cclxuLy8gICBsb2dpbigpOiB2b2lkIHtcclxuLy8gICAgIHRoaXMubG9naW5GYWNlYm9vaygpXHJcbi8vICAgICAgIC5zdWJzY3JpYmUoe1xyXG4vLyAgICAgICAgIG5leHQ6ICh2YWx1ZSkgPT4ge1xyXG4vLyAgICAgICAgICAgY29uc29sZS5sb2codmFsdWUpO1xyXG4vLyAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2ZhY2Vib29rSWQnLCB2YWx1ZS5mYWNlYm9vay5pZCk7XHJcbi8vICAgICAgICAgICAvL3RoaXMubWFwU2VydmljZS5zZXRNYXJrZXJzKHZhbHVlLmZhY2Vib29rLmlkKTtcclxuLy8gICAgICAgICB9LFxyXG4vLyAgICAgICAgIGVycm9yOiAoZXJyOiBhbnkpID0+IGNvbnNvbGUubG9nKGVyciksXHJcbi8vICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcclxuLy8gICAgICAgICAgIHRoaXMuc2V0QXV0aCgpO1xyXG4vLyAgICAgICAgICAgY29uc29sZS5sb2coJ0xvZ2dlZCBJTicpO1xyXG4vLyAgICAgICAgIH1cclxuLy8gICAgICAgfSk7XHJcbi8vICAgfVxyXG4vLyAgIC8vIC8qKlxyXG4vLyAgIC8vICAqIFtsb2dvdXQgbG9ncyBvdXQsIHNldHMgYXV0aHN0YXR1c11cclxuLy8gICAvLyAgKi9cclxuLy8gICAvLyBsb2dNZU91dCgpOiB2b2lkIHtcclxuLy8gICAvLyAgIHRoaXMubG9nb3V0KCk7XHJcbi8vICAgLy9cclxuLy8gICAvLyB9XHJcbi8vICAgLyoqXHJcbi8vICAgICogW3NldEF1dGggY2hlY2tzIHRvIHNlZSBpZiB1c2VyIGlzIGxvZ2dlZCBpbiBhbHJlYWR5IG9uSW5pdCwgd2lsbCBnZXQgaGlzIGRhdGEgaWYgc29dXHJcbi8vICAgICovXHJcbi8vICAgc2V0QXV0aCgpOiB2b2lkIHtcclxuLy8gICAgIGlmICh0aGlzLmF1dGhvcml6ZWQoKSkge1xyXG4vLyAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2ZhY2Vib29rSWQnKSA9PT0gdW5kZWZpbmVkKSB7XHJcbi8vICAgICAgICAgdGhpcy5hdXRoU3RhdHVzID0gZmFsc2U7XHJcbi8vICAgICAgICAgdGhpcy5sb2dvdXQoKTtcclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICB0aGlzLmdldFVzZXIobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2ZhY2Vib29rSWQnKSB8fFxyXG4vLyAgICAgICAgICAgdGhpcy51c2VyRGF0YS5mYWNlYm9vaylcclxuLy8gICAgICAgICAgIC5zdWJzY3JpYmUoe1xyXG4vLyAgICAgICAgICAgICBuZXh0OiAodmFsdWUpID0+IHtcclxuLy8gICAgICAgICAgICAgICB0aGlzLnVzZXJEYXRhID0gdmFsdWVbMF07XHJcbi8vICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy51c2VyRGF0YSk7XHJcbi8vICAgICAgICAgICAgICAgLy8gc2V0IHVzZXIgZXZlbnRzXHJcbi8vICAgICAgICAgICAgIH0sXHJcbi8vICAgICAgICAgICAgIGVycm9yOiAoZXJyOiBhbnkpID0+IGNvbnNvbGUubG9nKGVyciksXHJcbi8vICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbi8vICAgICAgICAgICAgICAgdGhpcy5hdXRoU3RhdHVzID0gdHJ1ZTtcclxuLy8gICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQXV0aG9yaXplZCBhbHJlYWR5Jyk7XHJcbi8vICAgICAgICAgICAgIH1cclxuLy9cclxuLy8gICAgICAgICAgIH0pO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICB0aGlzLmF1dGhTdGF0dXMgPSBmYWxzZTtcclxuLy8gICAgIH1cclxuLy8gICB9XHJcbi8vXHJcbi8vICAgLyoqXHJcbi8vICAgICogW2xvZ2luRmFjZWJvb2sgIGxvZ3MgaW4gdG8gZmFjZWJvb2tzIE9BdXRoIFNlcnZpY2UsIHdpbGwgYWxzbyBwbGFjZV1cclxuLy8gICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59XHJcbi8vICAgICovXHJcbi8vICAgbG9naW5GYWNlYm9vaygpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4vLyAgICAgcmV0dXJuIHRoaXMuYXV0aC5hdXRoZW50aWNhdGUoJ2ZhY2Vib29rJylcclxuLy8gICAgICAgLm1hcCh0aGlzLmV4dHJhY3REYXRhKVxyXG4vLyAgICAgICAuY2F0Y2goKGVycjogYW55KSA9PiB7IGNvbnNvbGUubG9nKCdlcnJvciBsb2dnaW5nIGludG8gZmFjZWJvb2snKTsgcmV0dXJuIGVycjsgfSk7XHJcbi8vICAgfVxyXG4vLyAgIC8qKlxyXG4vLyAgICAqIFthdXRob3JpemVkICBTYXR0ZWxpemVyJ3Mgc2VydmljZSB0byBjaGVjayBpZiB1c2VyIGlzIGFscmVhZHkgbG9nZ2VkIGluXVxyXG4vLyAgICAqIEByZXR1cm4ge1tib29sZWFuXX0gW2lmIGxvZ2dpbmVkIGluLCByZXR1cm5zIHRydWVdXHJcbi8vICAgICovXHJcbi8vICAgYXV0aG9yaXplZCgpOiBib29sZWFuIHtcclxuLy8gICAgIHJldHVybiB0aGlzLmF1dGguaXNBdXRoZW50aWNhdGVkKCk7XHJcbi8vICAgfVxyXG4vLyAgIC8qKlxyXG4vLyAgICAqIFtnZXRQYXlsb2FkIGdldCBhZGRpdGlvbiBmYWNlYm9vayB1c2VyIGRldGFpbHMsIG5vdCBuZWVkZWQgb3IgdXNlZF1cclxuLy8gICAgKiBAcmV0dXJuIHtbYW55XX1cclxuLy8gICAgKi9cclxuLy8gICBnZXRQYXlsb2FkKCk6IGFueSB7XHJcbi8vICAgICByZXR1cm4gdGhpcy5hdXRoLmdldFBheWxvYWQoKTtcclxuLy8gICB9XHJcbi8vICAgLyoqXHJcbi8vICAgICogW2dldFVzZXIgZ2V0IGRhdGEgYW5kIHRoZWlyIGV2ZW50cyBmcm9tIG91ciBkYXRhYmFzZV1cclxuLy8gICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgIGZhY2Vib29rSWQgW3VzZXIgaWQgc3RyaW5nXVxyXG4vLyAgICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuLy8gICAgKi9cclxuLy8gICBnZXRVc2VyKGZhY2Vib29rSWQ6IHN0cmluZyk6IE9ic2VydmFibGU8YW55PiB7XHJcbi8vICAgICByZXR1cm4gdGhpcy5odHRwLmdldChgaHR0cDovLzUyLjI3LjIyOC4xNDg6NDAwMC9hcGkvbWUvP2lkPSR7ZmFjZWJvb2tJZH1gKVxyXG4vLyAgICAgICAubWFwKHRoaXMuZXh0cmFjdERhdGEpXHJcbi8vICAgICAgIC5jYXRjaCgoZXJyOiBhbnkpID0+IHsgY29uc29sZS5sb2coJ2Vycm9yIHdpdGggaHR0cCByZXF1ZXN0IGdldHVzZXInKTsgcmV0dXJuIGVycjsgfSk7XHJcbi8vICAgfVxyXG4vLyAgIC8qKlxyXG4vLyAgICAqIFtsb2dvdXQgbG9ncyBvdXQgdXNlciBhY2NvdW50IF1cclxuLy8gICAgKi9cclxuLy8gICBsb2dvdXQoKTogdm9pZCB7XHJcbi8vICAgICB0aGlzLmF1dGgubG9nb3V0KClcclxuLy8gICAgICAgLnN1YnNjcmliZSh7XHJcbi8vICAgICAgICAgZXJyb3I6IChlcnI6IGFueSkgPT4gY29uc29sZS5sb2coZXJyKSxcclxuLy8gICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xyXG4vLyAgICAgICAgICAgdGhpcy5hdXRoU3RhdHVzID0gZmFsc2U7XHJcbi8vICAgICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcclxuLy8gICAgICAgICAgIGNvbnNvbGUubG9nKCdsb2dnZWQgb3V0Jyk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICB9KTtcclxuLy8gICB9XHJcbi8vIH07XHJcbi8vXHJcbi8vIH1cclxuXHJcbi8vXHJcbi8vIH1cclxuIl19