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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FFdUI7QUFDdkIsc0NBQXNFO0FBQ3RFLDhDQUE2QztBQUM3QyxnQ0FBOEI7QUFDOUIsaUNBQStCO0FBQy9CLG1DQUFpQztBQVNqQyxnQ0FBZ0M7QUFDaEMscUNBQW9DO0FBR3ZCLFFBQUEsWUFBWSxHQUFHLGNBQWMsQ0FBQztBQUMzQyxtQ0FBbUM7QUFDdEIsUUFBQSxVQUFVLEdBQUcsWUFBWSxDQUFDO0FBQzFCLFFBQUEsYUFBYSxHQUFHLGVBQWUsQ0FBQztBQUNoQyxRQUFBLFlBQVksR0FBRyxjQUFjLENBQUM7QUFDOUIsUUFBQSxXQUFXLEdBQUcsYUFBYSxDQUFDO0FBQzVCLFFBQUEsVUFBVSxHQUFFLFlBQVksQ0FBQztBQUN6QixRQUFBLFdBQVcsR0FBRSxhQUFhLENBQUM7QUFFeEMsSUFBYSxVQUFVO0lBRW5CLG9CQUFtQixJQUFVLEVBQVUsS0FBaUI7UUFBckMsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDeEQ7OztXQUdHO1FBQ0gsZUFBVSxHQUFhLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVE7WUFDeEUsTUFBTSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsT0FBTyxFQUFFLFNBQVM7WUFDbkYsUUFBUSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxVQUFVO1lBQ3ZFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsV0FBVztZQUNsRyxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFB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QzNGLE1BQU07QUFDTixRQUFRO0FBQ1IsZ0ZBQWdGO0FBQ2hGLDBEQUEwRDtBQUMxRCxRQUFRO0FBQ1IsNEJBQTRCO0FBQzVCLDBDQUEwQztBQUMxQyxNQUFNO0FBQ04sUUFBUTtBQUNSLDJFQUEyRTtBQUMzRSx1QkFBdUI7QUFDdkIsUUFBUTtBQUNSLHdCQUF3QjtBQUN4QixxQ0FBcUM7QUFDckMsTUFBTTtBQUNOLFFBQVE7QUFDUiw2REFBNkQ7QUFDN0QsNkRBQTZEO0FBQzdELGlDQUFpQztBQUNqQyxRQUFRO0FBQ1IsbURBQW1EO0FBQ25ELGlGQUFpRjtBQUNqRiwrQkFBK0I7QUFDL0IsK0ZBQStGO0FBQy9GLE1BQU07QUFDTixRQUFRO0FBQ1IsdUNBQXVDO0FBQ3ZDLFFBQVE7QUFDUixxQkFBcUI7QUFDckIseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQixpREFBaUQ7QUFDakQsNEJBQTRCO0FBQzVCLHFDQUFxQztBQUNyQyxrQ0FBa0M7QUFDbEMsdUNBQXVDO0FBQ3ZDLFlBQVk7QUFDWixZQUFZO0FBQ1osTUFBTTtBQUNOLEtBQUs7QUFDTCxFQUFFO0FBQ0YsSUFBSTtBQUVKLEVBQUU7QUFDRixJQUFJIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICAgIEluamVjdGFibGVcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtIdHRwLCBSZXNwb25zZSwgSGVhZGVycywgUmVxdWVzdE9wdGlvbnN9IGZyb20gJ0Bhbmd1bGFyL2h0dHAnO1xyXG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvZG9cIjtcclxuaW1wb3J0ICdyeGpzL2FkZC9vcGVyYXRvci9tYXAnO1xyXG5pbXBvcnQgJ3J4anMvYWRkL29wZXJhdG9yL2NhdGNoJztcclxuaW1wb3J0ICogYXMgdG5zT0F1dGhNb2R1bGUgZnJvbSAnbmF0aXZlc2NyaXB0LW9hdXRoJztcclxuXHJcblxyXG5pbXBvcnQge1xyXG4gICAgQWN0aW9uXHJcbn0gZnJvbSAnQG5ncngvc3RvcmUnO1xyXG5pbXBvcnQge21hcmtlcn0gZnJvbSAnLi4vY29tcG9uZW50cy9pbnRlcmZhY2UvbWFya2VyJztcclxuaW1wb3J0IHt1c2VyfSBmcm9tICcuLi9jb21wb25lbnRzL2ludGVyZmFjZS91c2VyJztcclxuLy8gY29uc3QgaHR0cCA9IHJlcXVpcmUoXCJodHRwXCIpO1xyXG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcclxuXHJcblxyXG5leHBvcnQgY29uc3QgTUFSS0VSX1JFTkVXID0gJ01BUktFUl9SRU5FVyc7XHJcbi8vIGNvbnN0IE1BUktFUl9HRVQgPSAnTUFSS0VSX0dFVCc7XHJcbmV4cG9ydCBjb25zdCBNQVJLRVJfQUREID0gJ01BUktFUl9BREQnO1xyXG5leHBvcnQgY29uc3QgTUFSS0VSX1JFTU9WRSA9ICdNQVJLRVJfUkVNT1ZFJztcclxuZXhwb3J0IGNvbnN0IE1BUktFUl9MRUFWRSA9ICdNQVJLRVJfTEVBVkUnO1xyXG5leHBvcnQgY29uc3QgTUFSS0VSX0pPSU4gPSAnTUFSS0VSX0pPSU4nO1xyXG5leHBvcnQgY29uc3QgTE9HSU5fVVNFUiA9J0xPR0lOX1VTRVInO1xyXG5leHBvcnQgY29uc3QgTE9HT1VUX1VTRVIgPSdMT0dPVVRfVVNFUic7XHJcbkBJbmplY3RhYmxlKClcclxuZXhwb3J0IGNsYXNzIE1hcFNlcnZpY2Uge1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBodHRwOiBIdHRwLCBwcml2YXRlIHN0b3JlOiBTdG9yZTxhbnk+KSB7IH1cclxuICAgIC8qKlxyXG4gICAgICogW2xpc3RTcG9ydHMgbGlzdCBvZiBzcG9ydHMgdG8gZXhwb3J0XVxyXG4gICAgICogQHR5cGUge3N0cmluZ1tdfVxyXG4gICAgICovXHJcbiAgICBsaXN0U3BvcnRzOiBzdHJpbmdbXSA9IFsnYmFzZWJhbGwnLCAnZm9vdGJhbGwnLCAncGFkZGxlJywgJ3NvY2NlcicsICdib3hpbmcnLFxyXG4gICAgICAgICdnb2xmJywgJ2hvY2tleScsICdmZW5jaW5nJywgJ3J1Z2J5JywgJ2Jvd2xpbmcnLCAncG93ZXJsaWZ0aW5nJywgJ2RhcnRzJywgJ2ZpdG5lc3MnLFxyXG4gICAgICAgICd0ZW5uaXMnLCAndm9sbGV5YmFsbCcsICdza2F0ZWJvYXJkJywgJ2tpY2tiYWxsJywgJ2Jvd2xpbmcnLCAnYmlsbGlhcmQnLFxyXG4gICAgICAgICdvZmZyb2FkJywgJ2RpdmluZycsICdiYWxsZXQnLCAnY2hlc3MnLCAnY3VybGluZycsICdwaW5ncG9uZycsICdza2lpbmcnLCAnaWNlc2thdGluZycsICdza3lkaXZpbmcnLFxyXG4gICAgICAgICdydW5uaW5nJywgJ2hpa2luZycsICdza2F0aW5nJywgJ2RhbmNlJywgJ2hvY2tleScsICd5b2dhJywgJ3dyZXN0bGluZycsXHJcbiAgICAgICAgJ3NxdWFzaCcsICdzd2ltbWluZycsICdob3JzZXJpZGluZycsICdmaXNoaW5nJywgJ2JpbGxhcmRzJyxcclxuICAgICAgICAnc29mdGJhbGwnLCAnc2FpbGluZycsICdza2lpbmcnLCAnc2hvb3RpbmcnLCAnYmlrZScsICdodW50aW5nJywgJ2FyY2hlcnknLFxyXG4gICAgICAgICdrYXJ0aW5nJywgJ2theWFrJywgJ2NsaW1iaW5nJywgJ3Nub3dib2FyZGluZycsICdjcmlja2V0JywgJ21vdG9yY3ljbGUnLCAncnVnYnknLCAnanVkbycsICdzY3ViYScsICdiYXJyZScsICdhdHYnLCAnYmFza2V0YmFsbCcsXHJcbiAgICAgICAgJ3Jvd2luZycsICdrYXJhdGUnLCAnbW1hJywgJ2VxdWVzdHJpYW4nLCAnZ3ltbmFzdGljcydcclxuICAgIF07XHJcblxyXG5cclxuICAgIGxvZ2luVXNlcih0b2tlbjpzdHJpbmcpOiBPYnNlcnZhYmxlPHVzZXIuVXNlclByb2ZpbGU+IHtcclxuICAgICAgICBsZXQgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgJ0F1dGhvcml6YXRpb24nOiAnT0F1dGggJyArIHRva2VuIH0pO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgICAgICBsZXQgZmllbGRzID0gWydpZCcsICdlbWFpbCcsICdmaXJzdF9uYW1lJywgJ2xhc3RfbmFtZScsICdsaW5rJywgJ25hbWUnLFxyXG4gICAgICAgICAgJ2ZyaWVuZHMnXHJcbiAgICAgICAgXTtcclxuICAgICAgICBsZXQgZ3JhcGhBcGlVcmwgPSAnaHR0cHM6Ly9ncmFwaC5mYWNlYm9vay5jb20vdjIuNS9tZT9maWVsZHM9JyArIGZpZWxkcy5qb2luKCcsJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoZ3JhcGhBcGlVcmxcclxuICAgICAgICAsIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICBsZXQgcHJvZmlsZSA9IHJlcy5qc29uKCk7XHJcbiAgICAgICAgICAgICAgbGV0IHN1YkRhdGE6IGFueSA9IHt9O1xyXG4gICAgICAgICAgICAgIHN1YkRhdGEubGFzdE5hbWUgPSBwcm9maWxlLmxhc3RfbmFtZTtcclxuICAgICAgICAgICAgICBzdWJEYXRhLmZpcnN0TmFtZSA9IHByb2ZpbGUuZmlyc3RfbmFtZTtcclxuICAgICAgICAgICAgICBzdWJEYXRhLmRpc3BsYXlOYW1lID0gcHJvZmlsZS5maXJzdF9uYW1lICsgXCIgXCIgKyBwcm9maWxlLmxhc3RfbmFtZTtcclxuICAgICAgICAgICAgICBzdWJEYXRhLmxpbmsgPSBwcm9maWxlLmxpbms7XHJcbiAgICAgICAgICAgICAgc3ViRGF0YS5lbWFpbCA9IHByb2ZpbGUuZW1haWw7XHJcbiAgICAgICAgICAgICAgc3ViRGF0YS5mcmllbmRzID0gcHJvZmlsZS5mcmllbmRzO1xyXG4gICAgICAgICAgICAgIHN1YkRhdGEuZmFjZWJvb2sgPSBwcm9maWxlLmlkO1xyXG4gICAgICAgICAgICAgIHN1YkRhdGEucGljdHVyZSA9ICdodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS92Mi44LycgKyBwcm9maWxlLmlkICsgJy9waWN0dXJlP3R5cGU9c21hbGwnO1xyXG4gICAgICAgICAgICAgIHN1YkRhdGEuYmlnUGljdHVyZSA9ICdodHRwczovL2dyYXBoLmZhY2Vib29rLmNvbS92Mi44LycgKyBwcm9maWxlLmlkICsgJy9waWN0dXJlP3R5cGU9bGFyZ2UnO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2hlcmUgY29tZXMgcmVzcG9uc2UnKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHN1YkRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7J3R5cGUnOiBMT0dJTl9VU0VSLCAncGF5bG9hZCc6IHN1YkRhdGF9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdWJEYXRhO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycm9yOiBhbnkpID0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpLmVycm9yIHx8ICdMb2dpbiBhdHRlbXB0IGVycm9yJykpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGxvZ291dFVzZXIoKTogdm9pZCB7XHJcbiAgICAgICAgICAgICAgdGhpcy5zdG9yZS5kaXNwYXRjaCh7J3R5cGUnOiBMT0dPVVRfVVNFUn0pO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnbG9nZ2VkIG91dCB1c2VyOiB1c2VyIHN0b3JlIGRhdGEgZW1wdHknKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFtnZXRFdmVudCB1c2VkIHRvIGdyYWIgdXNlciBkYXRhXVxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICBldmVudElkIFtldmVudCBzdHJpbmcgaWRdXHJcbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59ICAgICAgICAgW1Jlc3BvbnNlXVxyXG4gICAgICovXHJcbiAgICBnZXRFdmVudChldmVudElkOiBhbnkpOiBPYnNlcnZhYmxlPEFycmF5PG1hcmtlci5NYXBNYXJrZXI+PiB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50SWQgKyAnIHJldHJpZXZhbCBzdGFydGVkJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoJ2h0dHA6Ly81Mi4yNy4yMjguMTQ4OjQwMDAvYXBpL2V2ZW50cy8nICsgZXZlbnRJZCwgb3B0aW9ucylcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGV2ZW50RGF0YSA9IHJlcy5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUuZGlyKHJlcy5qc29uKCkpO1xyXG4gICAgICAgICAgICAgICAvLyB0aGlzLnN0b3JlLmRpc3BhdGNoKHsndHlwZSc6IE1BUktFUl9SRU5FVywgcGF5bG9hZDogZXZlbnREYXRhfSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnaGVyZSBjb21lcyByZXNwb25zZScpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2ZW50RGF0YTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnJvcjogYW55KSA9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKS5lcnJvciB8fCAnU2VydmVyIGVycm9yJykpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIFtkZWxldGVFdmVudCB1c2VkIHRvIGRlbGV0ZSBldmVudCBmcm9tIGRhdGFiYXNlXVxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nfSAgICAgICAgICBldmVudElkIFtldmVudCBzdHJpbmcgaWRdXHJcbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59ICAgICAgICAgW1Jlc3BvbnNlXVxyXG4gICAgICovXHJcbiAgICBkZWxldGVFdmVudChldmVudElkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZygnZXZlbnQnICsgZXZlbnRJZCArICdkZWxldGVkIGV2ZW50Jyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGUoJ2h0dHA6Ly81Mi4yNy4yMjguMTQ4OjQwMDAvYXBpL2V2ZW50cy8nICsgZXZlbnRJZCwgb3B0aW9ucylcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGVycik7XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBbbGVhdmVFdmVudCBsZWF2ZSBhbiBldmVudCwgcmVtb3ZlcyB1c2VyIGZyb20gZXZlbnQgZGF0YV1cclxuICAgICAqIEBwYXJhbSAge2FueX0gICAgICAgICAgICAgZXZlbnQgICBbZXZlbnQgZGF0YV1cclxuICAgICAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgZXZlbnRJZCBbZXZlbnQgaWRdXHJcbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPGFueT59ICAgICAgICAgW3Jlc3BvbnNlXVxyXG4gICAgICovXHJcbiAgICBsZWF2ZUV2ZW50KGV2ZW50OiBhbnksIGV2ZW50SWQ6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdldmVudCcgKyBldmVudElkICsgJ3VwZGF0ZWQnKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCgnaHR0cDovLzUyLjI3LjIyOC4xNDg6NDAwMC9hcGkvbGVhdmUvJyArIGV2ZW50SWQsIEpTT04uc3RyaW5naWZ5KGV2ZW50KSwgb3B0aW9ucylcclxuICAgICAgICAgICAgLm1hcCgocmVzOiBSZXNwb25zZSkgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IGVycik7XHJcblxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAgKiBbam9pbkV2ZW50IGFkZCB1c2VyIHRvIGV2ZW50XVxyXG4gICAgICogQHBhcmFtICB7bWFya2VyLlJzdnBTYW1wbGV9IG1lbWJlciAgW21lbWJlciB0byBhZGRdXHJcbiAgICAgKiBAcGFyYW0gIHtzdHJpbmd9ICAgICAgICAgICAgZXZlbnRJZCBbZXZlbnQgaWQgc3RyaW5nXVxyXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fSAgICAgICAgICAgW3Jlc3BvbnNlXVxyXG4gICAgICovXHJcblxyXG4gICAgam9pbkV2ZW50KG1lbWJlcjogbWFya2VyLlJzdnBTYW1wbGUsIGV2ZW50SWQ6IHN0cmluZywgZXZlbnQ6IGFueSk6IE9ic2VydmFibGU8YW55PiB7XHJcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSBuZXcgUmVxdWVzdE9wdGlvbnMoeyBoZWFkZXJzOiBoZWFkZXJzIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdldmVudCcgKyBldmVudElkICsgJ3VwZGF0ZWQnKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5odHRwLnB1dCgnaHR0cDovLzUyLjI3LjIyOC4xNDg6NDAwMC9hcGkvZXZlbnRzLycgKyBldmVudElkLCBKU09OLnN0cmluZ2lmeShtZW1iZXIpLCBvcHRpb25zKVxyXG4gICAgICAgICAgICAubWFwKChyZXM6IFJlc3BvbnNlKSA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4gZXJyKTtcclxuXHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICAqIFtwb3N0RXZlbnQgY3JlYXRlIG5ldyBldmVudF1cclxuICAgICAqIEBwYXJhbSAge21hcmtlci5NYXBNYXJrZXJ9IGV2ZW50IFtldmVudCB0byBiZSBjcmVhdGVkXVxyXG4gICAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fSAgICAgICAgW3Jlc3BvbnNlXVxyXG4gICAgICovXHJcbiAgICBwb3N0RXZlbnQoZXZlbnQ6IG1hcmtlci5NYXBNYXJrZXIpOiBPYnNlcnZhYmxlPGFueT4ge1xyXG4gICAgICAgIGxldCBoZWFkZXJzID0gbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gbmV3IFJlcXVlc3RPcHRpb25zKHsgaGVhZGVyczogaGVhZGVycyB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhldmVudC5uYW1lICsgJyBjcmVhdGlvbiBzdGFydGVkJyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KCdodHRwOi8vNTIuMjcuMjI4LjE0ODo0MDAwL2FwaS9ldmVudHMnLCBKU09OLnN0cmluZ2lmeShldmVudCksIG9wdGlvbnMpXHJcbiAgICAgICAgICAgIC5tYXAoKHJlczogUmVzcG9uc2UpID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiBlcnIpO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlRXJyb3JzKGVycm9yOiBSZXNwb25zZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KGVycm9yLmpzb24oKSkpO1xyXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlLnRocm93KGVycm9yKTtcclxuICAgIH07XHJcblxyXG5cclxuICAgIC8qKlxyXG4gICAgICogW2dldE1hcERhdGEgcmV0dXJuIGV2ZW50IG1hcCBkYXRhIGZyb20gc2VydmVyLCBzZWFyY2hlcyB0ZXh0IHRvIGRldGVybWluZXNcclxuICAgICAqIHNwb3J0IHNpbmNlIG1lZXR1cCBBUEkgZG9lc24ndCB0ZWxsIHlvdSB3aGF0IHNwb3J0IHR5cGUgaXQgaXMuIFVzZXJcclxuICAgICAqIGNyZWF0ZWQgZXZlbnRzIGhhdmUgc3BvcnRzIGFscmVhZHkgXVxyXG4gICAgICogQHBhcmFtICB7c3RyaW5nW119ICAgICAgICAgICAgICAgICAgICAgICBjaG9zZW4gW29ubHkgZmluZCBtYXRjaGluZyBzcG9ydHNdXHJcbiAgICAgKiBAcmV0dXJuIHtPYnNlcnZhYmxlPG1hcmtlci5NYXBNYXJrZXJbXT59ICAgICAgICBbT2JzZXJ2YWJsZSBhcnJheSBvZiBldmVudHNdXHJcbiAgICAgKi9cclxuICAgIGdldE1hcERhdGEoY2hvc2VuPzogc3RyaW5nW10pOiBPYnNlcnZhYmxlPEFycmF5PG1hcmtlci5NYXBNYXJrZXI+PiB7XHJcblxyXG4gICAgICAgIGxldCBzcG9ydHM6IHN0cmluZ1tdID0gWydiYXNlYmFsbCcsICdmb290YmFsbCcsICdwYWRkbGUnLCAnc29jY2VyJywgJ2JveGluZycsXHJcbiAgICAgICAgICAgICdnb2xmJywgJ2hvY2tleScsICdmZW5jaW5nJywgJ3J1Z2J5JywgJ2Jvd2xpbmcnLCAncG93ZXJsaWZ0aW5nJywgJ2RhcnRzJywgJ2ZpdG5lc3MnLFxyXG4gICAgICAgICAgICAndGVubmlzJywgJ3ZvbGxleWJhbGwnLCAnc2thdGVib2FyZCcsICdraWNrYmFsbCcsICdib3dsaW5nJywgJ2JpbGxpYXJkJyxcclxuICAgICAgICAgICAgJ29mZnJvYWQnLCAnZGl2aW5nJywgJ2JhbGxldCcsICdjaGVzcycsICdjdXJsaW5nJywgJ3Bpbmdwb25nJywgJ3NraWluZycsICdpY2Vza2F0aW5nJywgJ3NreWRpdmluZycsXHJcbiAgICAgICAgICAgICdydW5uaW5nJywgJ2hpa2luZycsICdza2F0aW5nJywgJ2RhbmNlJywgJ2hvY2tleScsICd5b2dhJywgJ3dyZXN0bGluZycsXHJcbiAgICAgICAgICAgICdzcXVhc2gnLCAnc3dpbW1pbmcnLCAnaG9yc2VyaWRpbmcnLCAnZmlzaGluZycsICdiaWxsYXJkcycsXHJcbiAgICAgICAgICAgICdzb2Z0YmFsbCcsICdzYWlsaW5nJywgJ3NraWluZycsICdzaG9vdGluZycsICdiaWtlJywgJ2h1bnRpbmcnLCAnYXJjaGVyeScsXHJcbiAgICAgICAgICAgICdrYXJ0aW5nJywgJ2theWFrJywgJ2NsaW1iaW5nJywgJ3Nub3dib2FyZGluZycsXHJcbiAgICAgICAgICAgICdjcmlja2V0JywgJ21vdG9yY3ljbGUnLCAncnVnYnknLCAnanVkbycsICdzY3ViYScsICdiYXJyZScsICdhdHYnLCAnYmFza2V0YmFsbCcsXHJcbiAgICAgICAgICAgICdyb3dpbmcnLCAna2FyYXRlJywgJ21tYScsICdlcXVlc3RyaWFuJywgJ2d5bW5hc3RpY3MnXHJcbiAgICAgICAgXTtcclxuXHJcblxyXG4gICAgICAgIGxldCBzcG9ydENob2ljZXM6IHN0cmluZ1tdID0gY2hvc2VuICE9PSB1bmRlZmluZWQgPyBjaG9zZW4gOiBzcG9ydHM7XHJcbiAgICAgICAgLy9sZXQgZmluYWxSZXN1bHQ6IEFycmF5PGFueT4gPSBbJ3Rlc3QnXTtcclxuICAgICAgICAvLyByZXR1cm5zIGFsbCB3ZSBuZWVkIHRvIHRvIG1ha2UgZ29vZ2UgbWFwIG1hcmtlcnMgYW5kIHBvcHVsYXRlIG91dCBtZW51c1xyXG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KCdodHRwOi8vNTIuMjcuMjI4LjE0ODo0MDAwL2FwaS9ldmVudHMnKVxyXG4gICAgICAgICAgICAubWFwKChyZXN1bHQ6IFJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiSGlcIiArIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmluYWxBcnJheSA9IHJlc3VsdC5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGZpbmFsQXJyYXkpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnBhcnNlKHJlc3VsdCkpO1xyXG4gICAgICAgICAgICAgICAgLy8gdGhpcyBsb29rcyBvZGQgYnV0IG1ha2VzIHNlbnNlOyBSeEpTIG1hcFxyXG4gICAgICAgICAgICAgICAgZmluYWxBcnJheS5tYXAoKHJlc3BvbnNlOiBtYXJrZXIuTWFwTWFya2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gaW50cm9kdWNlIHJhbmRvbSBvZmZzZXQgdG8gZ2l2ZSBpY29ucyBzcGFjZSBmcm9tIGVhY2ggb3RoZXJcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UudmVudWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS52ZW51ZS5sb24gKz0gTWF0aC5yYW5kb20oKSAqIDAuMDAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS52ZW51ZS5sYXQgKz0gTWF0aC5yYW5kb20oKSAqIDAuMDAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IHNwb3J0IGNob2ljZSBtYXRjaCB0byBpZGVudGlmeSBzcG9ydFxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3BvcnRDaG9pY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFkZCBkZXNjcmlwdGlvbiBpZiBub3QgZXhpc3Rpbmcgb3IgZW1wdHkgc3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kZXNjcmlwdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNwb25zZS5kZXNjcmlwdGlvbiA9ICdObyBEZXNjcmlwdGlvbiBQcm92aWRlZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2V0IHllc19yc3ZwX2NvdW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLnllc19yc3ZwX2NvdW50ID0gcmVzcG9uc2UucnN2cF9zYW1wbGUubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzZXQgZGVmYXVsdCB2aXNpYmlsaXR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlLm9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc2VhcmNoMSA9IHJlc3BvbnNlLmdyb3VwLm5hbWUudG9Mb3dlckNhc2UoKS5zZWFyY2goc3BvcnRDaG9pY2VzW2ldLnRvTG93ZXJDYXNlKCkpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlYXJjaDIgPSByZXNwb25zZS5kZXNjcmlwdGlvbi50b0xvd2VyQ2FzZSgpLnNlYXJjaChzcG9ydENob2ljZXNbaV0udG9Mb3dlckNhc2UoKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBmaW5kIG1hdGNoIHRvIGlkZW50aWZ5IHNwb3J0cyAtLSBpZiB1c2VyIGNyZWF0ZWQsIHNwb3J0IHR5cGUgd2lsbCAvL2V4aXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzcG9uc2Uuc3BvcnQpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2VhcmNoMSAhPT1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAtMSB8fCBzZWFyY2gyICE9PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHNwb3J0Q2hvaWNlc1tpXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Uuc3BvcnQgPSBzcG9ydENob2ljZXNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhmaW5hbEFycmF5KTtcclxuICAgICAgICAgICAgICAgIGxldCBsYXN0QXJyYXkgPSBmaW5hbEFycmF5LmZpbHRlcigoZWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhlbGUubmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsZS52ZW51ZSAhPT0gdW5kZWZpbmVkICYmIGVsZS52ZW51ZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cobGFzdEFycmF5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmUuZGlzcGF0Y2goeyAndHlwZSc6IE1BUktFUl9SRU5FVywgJ3BheWxvYWQnOiBsYXN0QXJyYXkgfSk7XHJcbiAgICAgICAgICAgICAgICAvL2ZpbmFsUmVzdWx0ID0gWydoZWxsbyddO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxhc3RBcnJheTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vdGhpcy5zdG9yZS5kaXNwYXRjaCh7IHR5cGU6IE1BUktFUl9SRU5FVywgcGF5bG9hZDogXCJob2lcIiB9KTtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImVuZCBvZiBnZXQgbWFwIHJlc3VsdHNcIik7XHJcbiAgICAgICAgLy8gcmV0dXJuIHtcclxuICAgICAgICAvLyAgICAgdHlwZTogTUFSS0VSX1JFTkVXLCBwYXlsb2FkOiBmaW5hbFJlc3VsdFxyXG4gICAgICAgIC8vIH07XHJcblxyXG4gICAgfVxyXG59XHJcblxyXG4vL1xyXG4vLyAgY2xhc3MgYWxsQWN0aW9uIHtcclxuLy8gICAvL2xvZ2luIEFDVElPTiB0eXBlc1xyXG4vLyAgIGNvbnN0IExPR0lOX1JFUVVFU1QgPSAnTE9HSU5fUkVRVUVTVCdcclxuLy8gICBjb25zdCBMT0dJTl9TVUNDRVNTID0gJ0xPR0lOX1NVQ0NFU1MnXHJcbi8vICAgY29uc3QgTE9HSU5fRkFJTFVSRSA9ICdMT0dJTl9GQUlMVVJFJ1xyXG4vLyAgIC8vbG9nb3V0IEFDVElPTiB0eXBlc1xyXG4vLyAgIGNvbnN0IExPR09VVF9SRVFVRVNUID0gJ0xPR09VVF9SRVFVRVNUJ1xyXG4vLyAgIGNvbnN0IExPR09VVF9TVUNDRVNTID0gJ0xPR09VVF9TVUNDRVNTJ1xyXG4vLyAgIC8vc2VudGltZW50cyBBQ1RJT04gdHlwZXNcclxuLy8gICBjb25zdCBTRU5USU1FTlRfUkVRVUVTVCA9ICdTRU5USU1FTlRfUkVRVUVTVCdcclxuLy8gICBjb25zdCBTRU5USU1FTlRfU1VDQ0VTUyA9ICdTRU5USU1FTlRfU1VDQ0VTUydcclxuLy8gICBjb25zdCBTRU5USU1FTlRfRkFJTFVSRSA9ICdTRU5USU1FTlRfRkFJTFVSRSdcclxuLy9cclxuLy8gICByZXF1ZXN0TG9naW4oY3JlZHMpIHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgIHR5cGU6IGFsbEFjdGlvbi5MT0dJTl9SRVFVRVNULFxyXG4vLyAgICAgICBpc0ZldGNoaW5nOiB0cnVlLFxyXG4vLyAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IGZhbHNlLFxyXG4vLyAgICAgICBjcmVkc1xyXG4vLyAgICAgfVxyXG4vLyAgIH1cclxuLy9cclxuLy8gICByZWNlaXZlTG9naW4odXNlcikge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgdHlwZTogYWxsQWN0aW9uLkxPR0lOX1NVQ0NFU1MsXHJcbi8vICAgICAgIGlzRmV0Y2hpbmc6IGZhbHNlLFxyXG4vLyAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IHRydWUsXHJcbi8vICAgICAgIHRva2VuOiB1c2VyLnRva2VuLFxyXG4vLyAgICAgICB1c2VybmFtZTogdXNlci51c2VybmFtZVxyXG4vLyAgICAgfVxyXG4vLyAgIH1cclxuLy9cclxuLy8gICBsb2dpbkVycm9yKG1lc3NhZ2UpIHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgIHR5cGU6IGFsbEFjdGlvbi5MT0dJTl9GQUlMVVJFLFxyXG4vLyAgICAgICBpc0ZldGNoaW5nOiBmYWxzZSxcclxuLy8gICAgICAgaXNBdXRoZW50aWNhdGVkOiBmYWxzZSxcclxuLy8gICAgICAgbWVzc2FnZTogbWVzc2FnZVxyXG4vLyAgICAgfVxyXG4vLyAgIH1cclxuLy9cclxuLy9cclxuLy8gICByZXF1ZXN0TG9nb3V0KCkge1xyXG4vLyAgICAgcmV0dXJuIHtcclxuLy8gICAgICAgdHlwZTogYWxsQWN0aW9uLkxPR09VVF9SRVFVRVNULFxyXG4vLyAgICAgICBpc0ZldGNoaW5nOiB0cnVlLFxyXG4vLyAgICAgICBpc0F1dGhlbnRpY2F0ZWQ6IHRydWVcclxuLy8gICAgIH1cclxuLy8gICB9XHJcbi8vXHJcbi8vICAgcmVjZWl2ZUxvZ291dCgpIHtcclxuLy8gICAgIHJldHVybiB7XHJcbi8vICAgICAgIHR5cGU6IGFsbEFjdGlvbi5MT0dPVVRfU1VDQ0VTUyxcclxuLy8gICAgICAgaXNGZXRjaGluZzogZmFsc2UsXHJcbi8vICAgICAgIGlzQXV0aGVudGljYXRlZDogZmFsc2VcclxuLy8gICAgIH1cclxuLy8gICB9XHJcbi8vXHJcbi8vXHJcbi8vICAgLy8gTG9ncyB0aGUgdXNlciBvdXRcclxuLy8gICBsb2dvdXRVc2VyKCkge1xyXG4vLyAgICAgcmV0dXJuIGRpc3BhdGNoID0+IHtcclxuLy8gICAgICAgZGlzcGF0Y2gocmVxdWVzdExvZ291dCgpKVxyXG4vLyAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnc2F0ZWxsaXplcl90b2tlbicpO1xyXG4vLyAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgnZmFjZWJvb2tJZCcpO1xyXG4vLyAgICAgICBkaXNwYXRjaChyZWNlaXZlTG9nb3V0KCkpXHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG4vL1xyXG4vL1xyXG4vLyAgIGxvZ2luKCk6IHZvaWQge1xyXG4vLyAgICAgdGhpcy5sb2dpbkZhY2Vib29rKClcclxuLy8gICAgICAgLnN1YnNjcmliZSh7XHJcbi8vICAgICAgICAgbmV4dDogKHZhbHVlKSA9PiB7XHJcbi8vICAgICAgICAgICBjb25zb2xlLmxvZyh2YWx1ZSk7XHJcbi8vICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmFjZWJvb2tJZCcsIHZhbHVlLmZhY2Vib29rLmlkKTtcclxuLy8gICAgICAgICAgIC8vdGhpcy5tYXBTZXJ2aWNlLnNldE1hcmtlcnModmFsdWUuZmFjZWJvb2suaWQpO1xyXG4vLyAgICAgICAgIH0sXHJcbi8vICAgICAgICAgZXJyb3I6IChlcnI6IGFueSkgPT4gY29uc29sZS5sb2coZXJyKSxcclxuLy8gICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xyXG4vLyAgICAgICAgICAgdGhpcy5zZXRBdXRoKCk7XHJcbi8vICAgICAgICAgICBjb25zb2xlLmxvZygnTG9nZ2VkIElOJyk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICB9KTtcclxuLy8gICB9XHJcbi8vICAgLy8gLyoqXHJcbi8vICAgLy8gICogW2xvZ291dCBsb2dzIG91dCwgc2V0cyBhdXRoc3RhdHVzXVxyXG4vLyAgIC8vICAqL1xyXG4vLyAgIC8vIGxvZ01lT3V0KCk6IHZvaWQge1xyXG4vLyAgIC8vICAgdGhpcy5sb2dvdXQoKTtcclxuLy8gICAvL1xyXG4vLyAgIC8vIH1cclxuLy8gICAvKipcclxuLy8gICAgKiBbc2V0QXV0aCBjaGVja3MgdG8gc2VlIGlmIHVzZXIgaXMgbG9nZ2VkIGluIGFscmVhZHkgb25Jbml0LCB3aWxsIGdldCBoaXMgZGF0YSBpZiBzb11cclxuLy8gICAgKi9cclxuLy8gICBzZXRBdXRoKCk6IHZvaWQge1xyXG4vLyAgICAgaWYgKHRoaXMuYXV0aG9yaXplZCgpKSB7XHJcbi8vICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmFjZWJvb2tJZCcpID09PSB1bmRlZmluZWQpIHtcclxuLy8gICAgICAgICB0aGlzLmF1dGhTdGF0dXMgPSBmYWxzZTtcclxuLy8gICAgICAgICB0aGlzLmxvZ291dCgpO1xyXG4vLyAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgIHRoaXMuZ2V0VXNlcihsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZmFjZWJvb2tJZCcpIHx8XHJcbi8vICAgICAgICAgICB0aGlzLnVzZXJEYXRhLmZhY2Vib29rKVxyXG4vLyAgICAgICAgICAgLnN1YnNjcmliZSh7XHJcbi8vICAgICAgICAgICAgIG5leHQ6ICh2YWx1ZSkgPT4ge1xyXG4vLyAgICAgICAgICAgICAgIHRoaXMudXNlckRhdGEgPSB2YWx1ZVswXTtcclxuLy8gICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnVzZXJEYXRhKTtcclxuLy8gICAgICAgICAgICAgICAvLyBzZXQgdXNlciBldmVudHNcclxuLy8gICAgICAgICAgICAgfSxcclxuLy8gICAgICAgICAgICAgZXJyb3I6IChlcnI6IGFueSkgPT4gY29uc29sZS5sb2coZXJyKSxcclxuLy8gICAgICAgICAgICAgY29tcGxldGU6ICgpID0+IHtcclxuLy8gICAgICAgICAgICAgICB0aGlzLmF1dGhTdGF0dXMgPSB0cnVlO1xyXG4vLyAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBdXRob3JpemVkIGFscmVhZHknKTtcclxuLy8gICAgICAgICAgICAgfVxyXG4vL1xyXG4vLyAgICAgICAgICAgfSk7XHJcbi8vICAgICAgIH1cclxuLy8gICAgIH0gZWxzZSB7XHJcbi8vICAgICAgIHRoaXMuYXV0aFN0YXR1cyA9IGZhbHNlO1xyXG4vLyAgICAgfVxyXG4vLyAgIH1cclxuLy9cclxuLy8gICAvKipcclxuLy8gICAgKiBbbG9naW5GYWNlYm9vayAgbG9ncyBpbiB0byBmYWNlYm9va3MgT0F1dGggU2VydmljZSwgd2lsbCBhbHNvIHBsYWNlXVxyXG4vLyAgICAqIEByZXR1cm4ge09ic2VydmFibGU8YW55Pn1cclxuLy8gICAgKi9cclxuLy8gICBsb2dpbkZhY2Vib29rKCk6IE9ic2VydmFibGU8YW55PiB7XHJcbi8vICAgICByZXR1cm4gdGhpcy5hdXRoLmF1dGhlbnRpY2F0ZSgnZmFjZWJvb2snKVxyXG4vLyAgICAgICAubWFwKHRoaXMuZXh0cmFjdERhdGEpXHJcbi8vICAgICAgIC5jYXRjaCgoZXJyOiBhbnkpID0+IHsgY29uc29sZS5sb2coJ2Vycm9yIGxvZ2dpbmcgaW50byBmYWNlYm9vaycpOyByZXR1cm4gZXJyOyB9KTtcclxuLy8gICB9XHJcbi8vICAgLyoqXHJcbi8vICAgICogW2F1dGhvcml6ZWQgIFNhdHRlbGl6ZXIncyBzZXJ2aWNlIHRvIGNoZWNrIGlmIHVzZXIgaXMgYWxyZWFkeSBsb2dnZWQgaW5dXHJcbi8vICAgICogQHJldHVybiB7W2Jvb2xlYW5dfSBbaWYgbG9nZ2luZWQgaW4sIHJldHVybnMgdHJ1ZV1cclxuLy8gICAgKi9cclxuLy8gICBhdXRob3JpemVkKCk6IGJvb2xlYW4ge1xyXG4vLyAgICAgcmV0dXJuIHRoaXMuYXV0aC5pc0F1dGhlbnRpY2F0ZWQoKTtcclxuLy8gICB9XHJcbi8vICAgLyoqXHJcbi8vICAgICogW2dldFBheWxvYWQgZ2V0IGFkZGl0aW9uIGZhY2Vib29rIHVzZXIgZGV0YWlscywgbm90IG5lZWRlZCBvciB1c2VkXVxyXG4vLyAgICAqIEByZXR1cm4ge1thbnldfVxyXG4vLyAgICAqL1xyXG4vLyAgIGdldFBheWxvYWQoKTogYW55IHtcclxuLy8gICAgIHJldHVybiB0aGlzLmF1dGguZ2V0UGF5bG9hZCgpO1xyXG4vLyAgIH1cclxuLy8gICAvKipcclxuLy8gICAgKiBbZ2V0VXNlciBnZXQgZGF0YSBhbmQgdGhlaXIgZXZlbnRzIGZyb20gb3VyIGRhdGFiYXNlXVxyXG4vLyAgICAqIEBwYXJhbSAge3N0cmluZ30gICAgICAgICAgZmFjZWJvb2tJZCBbdXNlciBpZCBzdHJpbmddXHJcbi8vICAgICogQHJldHVybiB7T2JzZXJ2YWJsZTxhbnk+fVxyXG4vLyAgICAqL1xyXG4vLyAgIGdldFVzZXIoZmFjZWJvb2tJZDogc3RyaW5nKTogT2JzZXJ2YWJsZTxhbnk+IHtcclxuLy8gICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0KGBodHRwOi8vNTIuMjcuMjI4LjE0ODo0MDAwL2FwaS9tZS8/aWQ9JHtmYWNlYm9va0lkfWApXHJcbi8vICAgICAgIC5tYXAodGhpcy5leHRyYWN0RGF0YSlcclxuLy8gICAgICAgLmNhdGNoKChlcnI6IGFueSkgPT4geyBjb25zb2xlLmxvZygnZXJyb3Igd2l0aCBodHRwIHJlcXVlc3QgZ2V0dXNlcicpOyByZXR1cm4gZXJyOyB9KTtcclxuLy8gICB9XHJcbi8vICAgLyoqXHJcbi8vICAgICogW2xvZ291dCBsb2dzIG91dCB1c2VyIGFjY291bnQgXVxyXG4vLyAgICAqL1xyXG4vLyAgIGxvZ291dCgpOiB2b2lkIHtcclxuLy8gICAgIHRoaXMuYXV0aC5sb2dvdXQoKVxyXG4vLyAgICAgICAuc3Vic2NyaWJlKHtcclxuLy8gICAgICAgICBlcnJvcjogKGVycjogYW55KSA9PiBjb25zb2xlLmxvZyhlcnIpLFxyXG4vLyAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XHJcbi8vICAgICAgICAgICB0aGlzLmF1dGhTdGF0dXMgPSBmYWxzZTtcclxuLy8gICAgICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xyXG4vLyAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ2dlZCBvdXQnKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgIH0pO1xyXG4vLyAgIH1cclxuLy8gfTtcclxuLy9cclxuLy8gfVxyXG5cclxuLy9cclxuLy8gfVxyXG4iXX0=