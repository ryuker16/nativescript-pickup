"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var tnsOAuthModule = require("nativescript-oauth");
var router_1 = require("@angular/router");
var store_1 = require("@ngrx/store");
var action_1 = require("./actions/action");
//registerElement("MapView", () => MapView);
var AppComponent = (function () {
    function AppComponent(router, store, mapService) {
        this.router = router;
        this.store = store;
        this.mapService = mapService;
    }
    AppComponent.prototype.onTapLogin = function () {
        tnsOAuthModule.login()
            .then(function (data) {
            var token = tnsOAuthModule.accessToken();
            console.log('logged in attempt');
            console.log(token);
        })
            .catch(function (er) {
            console.log('didnt log in via facebook successfully');
            console.error('error logging in');
            console.log(er);
            //do something with the error
        });
    };
    AppComponent.prototype.onTapTest = function () {
        // this.router.navigate(['/userprofile/']);
        var _this = this;
        tnsOAuthModule.ensureValidToken()
            .then(function (token) {
            _this.mapService.loginUser(token)
                .subscribe(function (value) { return console.log("here's user data coming"); }, function (error) { return console.log("Tried Logged into facebook but..:" + error); }, function () { return console.log('successfully logged in'); });
            console.log('token: ' + token);
            _this.router.navigate(['/userprofile/']);
        })
            .then(function () {
        })
            .catch(function (er) {
            console.error('error testing ');
            console.log(er);
        });
    };
    AppComponent.prototype.onTapLogout = function () {
        var _this = this;
        tnsOAuthModule.logout()
            .then(function () {
            console.log('logged out');
            _this.mapService.logoutUser();
        })
            .catch(function (er) {
            console.error('error logging out');
            console.log(er);
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "ns-app",
        templateUrl: "app.component.html",
    }),
    __metadata("design:paramtypes", [router_1.Router, store_1.Store, action_1.MapService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFHMUMsbURBQXFEO0FBQ3JELDBDQUF5QztBQUd6QyxxQ0FBb0M7QUFDcEMsMkNBQTRDO0FBQzVDLDRDQUE0QztBQU81QyxJQUFhLFlBQVk7SUFFckIsc0JBQW9CLE1BQWMsRUFBVSxLQUFpQixFQUFVLFVBQXNCO1FBQXpFLFdBQU0sR0FBTixNQUFNLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFZO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFJLENBQUM7SUFDM0YsaUNBQVUsR0FBakI7UUFDSSxjQUFjLENBQUMsS0FBSyxFQUFFO2FBQ2pCLElBQUksQ0FBQyxVQUFDLElBQVM7WUFDZCxJQUFJLEtBQUssR0FBRyxjQUFjLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDdkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFdkIsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsRUFBRTtZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQztZQUN0RCxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoQiw2QkFBNkI7UUFDakMsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBQ00sZ0NBQVMsR0FBaEI7UUFDQywyQ0FBMkM7UUFENUMsaUJBc0JDO1FBbkJHLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRTthQUM1QixJQUFJLENBQUMsVUFBQyxLQUFhO1lBQ2hCLEtBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztpQkFDL0IsU0FBUyxDQUNWLFVBQUEsS0FBSyxJQUFLLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxFQUF0QyxDQUFzQyxFQUNoRCxVQUFBLEtBQUssSUFBSSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEdBQUcsS0FBSyxDQUFDLEVBQXhELENBQXdELEVBQ2pFLGNBQU0sT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLEVBQXJDLENBQXFDLENBQzVDLENBQUM7WUFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUMvQixLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDO1FBR04sQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLFVBQUMsRUFBRTtZQUNOLE9BQU8sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNoQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVNLGtDQUFXLEdBQWxCO1FBQUEsaUJBU0M7UUFSRyxjQUFjLENBQUMsTUFBTSxFQUFFO2FBQ2xCLElBQUksQ0FBQztZQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdkMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUMvQixDQUFDLENBQUM7YUFDQyxLQUFLLENBQUMsVUFBQyxFQUFFO1lBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBQ0wsbUJBQUM7QUFBRCxDQUFDLEFBcERELElBb0RDO0FBcERZLFlBQVk7SUFMeEIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtRQUNuQixRQUFRLEVBQUUsUUFBUTtRQUNsQixXQUFXLEVBQUUsb0JBQW9CO0tBQ3BDLENBQUM7cUNBRzhCLGVBQU0sRUFBaUIsYUFBSyxFQUEyQixtQkFBVTtHQUZwRixZQUFZLENBb0R4QjtBQXBEWSxvQ0FBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG4vL2ltcG9ydCB7IE5TRG9ja01vbml0b3IgfSBmcm9tIFwibmdyeC1kZXZ0b29scy1uYXRpdmVzY3JpcHRcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzL09ic2VydmFibGUnO1xuaW1wb3J0ICogYXMgdG5zT0F1dGhNb2R1bGUgZnJvbSAnbmF0aXZlc2NyaXB0LW9hdXRoJztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7cmVnaXN0ZXJFbGVtZW50fSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xuaW1wb3J0IHsgTWFwVmlldyB9IGZyb20gXCJuYXRpdmVzY3JpcHQtZ29vZ2xlLW1hcHMtc2RrXCI7XG5pbXBvcnQgeyBTdG9yZSB9IGZyb20gJ0BuZ3J4L3N0b3JlJztcbmltcG9ydCB7TWFwU2VydmljZX0gZnJvbSAnLi9hY3Rpb25zL2FjdGlvbic7XG4vL3JlZ2lzdGVyRWxlbWVudChcIk1hcFZpZXdcIiwgKCkgPT4gTWFwVmlldyk7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6IFwibnMtYXBwXCIsXG4gICAgdGVtcGxhdGVVcmw6IFwiYXBwLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJvdXRlcjogUm91dGVyLCBwcml2YXRlIHN0b3JlOiBTdG9yZTxhbnk+LCBwcml2YXRlIG1hcFNlcnZpY2U6IE1hcFNlcnZpY2UpIHsgfVxuICAgIHB1YmxpYyBvblRhcExvZ2luKCkge1xuICAgICAgICB0bnNPQXV0aE1vZHVsZS5sb2dpbigpXG4gICAgICAgICAgICAudGhlbigoZGF0YTogYW55KSA9PiB7XG4gICAgICAgICAgICAgIGxldCB0b2tlbiA9IHRuc09BdXRoTW9kdWxlLmFjY2Vzc1Rva2VuKCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2xvZ2dlZCBpbiBhdHRlbXB0Jyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codG9rZW4pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGlkbnQgbG9nIGluIHZpYSBmYWNlYm9vayBzdWNjZXNzZnVsbHknKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdlcnJvciBsb2dnaW5nIGluJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXIpO1xuICAgICAgICAgICAgICAgIC8vZG8gc29tZXRoaW5nIHdpdGggdGhlIGVycm9yXG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgcHVibGljIG9uVGFwVGVzdCgpIHtcbiAgICAgLy8gdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvdXNlcnByb2ZpbGUvJ10pO1xuXG4gICAgICAgIHRuc09BdXRoTW9kdWxlLmVuc3VyZVZhbGlkVG9rZW4oKVxuICAgICAgICAgICAgLnRoZW4oKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcFNlcnZpY2UubG9naW5Vc2VyKHRva2VuKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgdmFsdWUgPT4gIGNvbnNvbGUubG9nKFwiaGVyZSdzIHVzZXIgZGF0YSBjb21pbmdcIiksXG4gICAgICAgICAgICAgICAgZXJyb3IgPT4gY29uc29sZS5sb2coXCJUcmllZCBMb2dnZWQgaW50byBmYWNlYm9vayBidXQuLjpcIiArIGVycm9yKSxcbiAgICAgICAgICAgICAgICAoKSA9PiBjb25zb2xlLmxvZygnc3VjY2Vzc2Z1bGx5IGxvZ2dlZCBpbicpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3Rva2VuOiAnICsgdG9rZW4pO1xuICAgICAgICAgICAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnL3VzZXJwcm9maWxlLyddKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG5cblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYXRjaCgoZXIpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdlcnJvciB0ZXN0aW5nICcpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIHB1YmxpYyBvblRhcExvZ291dCgpIHtcbiAgICAgICAgdG5zT0F1dGhNb2R1bGUubG9nb3V0KClcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtjb25zb2xlLmxvZygnbG9nZ2VkIG91dCcpO1xuICAgICAgICAgICAgdGhpcy5tYXBTZXJ2aWNlLmxvZ291dFVzZXIoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yIGxvZ2dpbmcgb3V0Jyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxufVxuIl19