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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNDQUEwQztBQUcxQyxtREFBcUQ7QUFDckQsMENBQXlDO0FBR3pDLHFDQUFvQztBQUNwQywyQ0FBNEM7QUFDNUMsNENBQTRDO0FBTzVDLElBQWEsWUFBWTtJQUVyQixzQkFBb0IsTUFBYyxFQUFVLEtBQWlCLEVBQVUsVUFBc0I7UUFBekUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVk7UUFBVSxlQUFVLEdBQVYsVUFBVSxDQUFZO0lBQUksQ0FBQztJQUMzRixpQ0FBVSxHQUFqQjtRQUNJLGNBQWMsQ0FBQyxLQUFLLEVBQUU7YUFDakIsSUFBSSxDQUFDLFVBQUMsSUFBUztZQUNkLElBQUksS0FBSyxHQUFHLGNBQWMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUN2QyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV2QixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxFQUFFO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1lBQ3RELE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2hCLDZCQUE2QjtRQUNqQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDTSxnQ0FBUyxHQUFoQjtRQUNDLDJDQUEyQztRQUQ1QyxpQkF1QkM7UUFwQkcsY0FBYyxDQUFDLGdCQUFnQixFQUFFO2FBQzVCLElBQUksQ0FBQyxVQUFDLEtBQWE7WUFDaEIsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDO2lCQUMvQixTQUFTLENBQ1YsVUFBQSxLQUFLLElBQUssT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLEVBQXRDLENBQXNDLEVBQ2hELFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsR0FBRyxLQUFLLENBQUMsRUFBeEQsQ0FBd0QsRUFDakUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsRUFBckMsQ0FBcUMsQ0FDNUMsQ0FBQztZQUVBLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO1lBQy9CLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUM7UUFHTixDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQyxFQUFFO1lBQ04sT0FBTyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sa0NBQVcsR0FBbEI7UUFBQSxpQkFTQztRQVJHLGNBQWMsQ0FBQyxNQUFNLEVBQUU7YUFDbEIsSUFBSSxDQUFDO1lBQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN2QyxLQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQy9CLENBQUMsQ0FBQzthQUNDLEtBQUssQ0FBQyxVQUFDLEVBQUU7WUFDTixPQUFPLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDbkMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFDTCxtQkFBQztBQUFELENBQUMsQUFyREQsSUFxREM7QUFyRFksWUFBWTtJQUx4QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1FBQ25CLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7S0FDcEMsQ0FBQztxQ0FHOEIsZUFBTSxFQUFpQixhQUFLLEVBQTJCLG1CQUFVO0dBRnBGLFlBQVksQ0FxRHhCO0FBckRZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbi8vaW1wb3J0IHsgTlNEb2NrTW9uaXRvciB9IGZyb20gXCJuZ3J4LWRldnRvb2xzLW5hdGl2ZXNjcmlwdFwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5pbXBvcnQgKiBhcyB0bnNPQXV0aE1vZHVsZSBmcm9tICduYXRpdmVzY3JpcHQtb2F1dGgnO1xuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHtyZWdpc3RlckVsZW1lbnR9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9lbGVtZW50LXJlZ2lzdHJ5XCI7XG5pbXBvcnQgeyBNYXBWaWV3IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nb29nbGUtbWFwcy1zZGtcIjtcbmltcG9ydCB7IFN0b3JlIH0gZnJvbSAnQG5ncngvc3RvcmUnO1xuaW1wb3J0IHtNYXBTZXJ2aWNlfSBmcm9tICcuL2FjdGlvbnMvYWN0aW9uJztcbi8vcmVnaXN0ZXJFbGVtZW50KFwiTWFwVmlld1wiLCAoKSA9PiBNYXBWaWV3KTtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogXCJucy1hcHBcIixcbiAgICB0ZW1wbGF0ZVVybDogXCJhcHAuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcm91dGVyOiBSb3V0ZXIsIHByaXZhdGUgc3RvcmU6IFN0b3JlPGFueT4sIHByaXZhdGUgbWFwU2VydmljZTogTWFwU2VydmljZSkgeyB9XG4gICAgcHVibGljIG9uVGFwTG9naW4oKSB7XG4gICAgICAgIHRuc09BdXRoTW9kdWxlLmxvZ2luKClcbiAgICAgICAgICAgIC50aGVuKChkYXRhOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgbGV0IHRva2VuID0gdG5zT0F1dGhNb2R1bGUuYWNjZXNzVG9rZW4oKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbG9nZ2VkIGluIGF0dGVtcHQnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0b2tlbik7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkaWRudCBsb2cgaW4gdmlhIGZhY2Vib29rIHN1Y2Nlc3NmdWxseScpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yIGxvZ2dpbmcgaW4nKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcik7XG4gICAgICAgICAgICAgICAgLy9kbyBzb21ldGhpbmcgd2l0aCB0aGUgZXJyb3JcbiAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgICBwdWJsaWMgb25UYXBUZXN0KCkge1xuICAgICAvLyB0aGlzLnJvdXRlci5uYXZpZ2F0ZShbJy91c2VycHJvZmlsZS8nXSk7XG5cbiAgICAgICAgdG5zT0F1dGhNb2R1bGUuZW5zdXJlVmFsaWRUb2tlbigpXG4gICAgICAgICAgICAudGhlbigodG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwU2VydmljZS5sb2dpblVzZXIodG9rZW4pXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICB2YWx1ZSA9PiAgY29uc29sZS5sb2coXCJoZXJlJ3MgdXNlciBkYXRhIGNvbWluZ1wiKSxcbiAgICAgICAgICAgICAgICBlcnJvciA9PiBjb25zb2xlLmxvZyhcIlRyaWVkIExvZ2dlZCBpbnRvIGZhY2Vib29rIGJ1dC4uOlwiICsgZXJyb3IpLFxuICAgICAgICAgICAgICAgICgpID0+IGNvbnNvbGUubG9nKCdzdWNjZXNzZnVsbHkgbG9nZ2VkIGluJylcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygndG9rZW46ICcgKyB0b2tlbik7XG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycvdXNlcnByb2ZpbGUvJ10pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKCgpID0+IHtcblxuXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ2Vycm9yIHRlc3RpbmcgJyk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uVGFwTG9nb3V0KCkge1xuICAgICAgICB0bnNPQXV0aE1vZHVsZS5sb2dvdXQoKVxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge2NvbnNvbGUubG9nKCdsb2dnZWQgb3V0Jyk7XG4gICAgICAgICAgICB0aGlzLm1hcFNlcnZpY2UubG9nb3V0VXNlcigpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVyKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignZXJyb3IgbG9nZ2luZyBvdXQnKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcik7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=