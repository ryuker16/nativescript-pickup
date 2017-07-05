Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DumbComponent = (function () {
    function DumbComponent() {
        console.log("constructor: ");
        console.dir(this.models);
        console.dir(this.models);
    }
    DumbComponent.prototype.AfterViewInit = function () {
        console.log("After view init: ");
        console.dir(this.models);
        console.dir(this.models);
    };
    DumbComponent.prototype.AfterViewChecked = function () {
        console.log("after view checked: ");
        console.dir(this.models);
        console.dir(this.models);
    };
    return DumbComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DumbComponent.prototype, "models", void 0);
DumbComponent = __decorate([
    core_1.Component({
        selector: "dumb-event",
        template: "\n    <Label class=\"h2\" textWrap=\"true\" *ngFor=\" let model of models\" [text]=\"models.id\"></Label>",
    }),
    __metadata("design:paramtypes", [])
], DumbComponent);
exports.DumbComponent = DumbComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtYkV2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZHVtYkV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQ0FBd0k7QUFPeEksSUFBYSxhQUFhO0lBR3RCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU3QixDQUFDO0lBRUQscUNBQWEsR0FBYjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVqQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU3QixDQUFDO0lBRUQsd0NBQWdCLEdBQWhCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBRXBDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF2Qlk7SUFBUixZQUFLLEVBQUU7OzZDQUFRO0FBRFAsYUFBYTtJQUx6QixnQkFBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFlBQVk7UUFDdEIsUUFBUSxFQUFFLDJHQUNrRjtLQUMvRixDQUFDOztHQUNXLGFBQWEsQ0F3QnpCO0FBeEJZLHNDQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBBZnRlclZpZXdDaGVja2VkLCBPbkluaXQsIEFmdGVyVmlld0luaXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogXCJkdW1iLWV2ZW50XCIsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG4gICAgPExhYmVsIGNsYXNzPVwiaDJcIiB0ZXh0V3JhcD1cInRydWVcIiAqbmdGb3I9XCIgbGV0IG1vZGVsIG9mIG1vZGVsc1wiIFt0ZXh0XT1cIm1vZGVscy5pZFwiPjwvTGFiZWw+YCxcclxufSlcclxuZXhwb3J0IGNsYXNzIER1bWJDb21wb25lbnQge1xyXG4gICAgQElucHV0KCkgbW9kZWxzO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiY29uc3RydWN0b3I6IFwiKTtcclxuICAgICAgICBjb25zb2xlLmRpcih0aGlzLm1vZGVscyk7XHJcbiAgICAgICAgY29uc29sZS5kaXIodGhpcy5tb2RlbHMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBBZnRlclZpZXdJbml0KCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiQWZ0ZXIgdmlldyBpbml0OiBcIik7XHJcblxyXG4gICAgICAgIGNvbnNvbGUuZGlyKHRoaXMubW9kZWxzKTtcclxuICAgICAgICBjb25zb2xlLmRpcih0aGlzLm1vZGVscyk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIEFmdGVyVmlld0NoZWNrZWQoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJhZnRlciB2aWV3IGNoZWNrZWQ6IFwiKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5kaXIodGhpcy5tb2RlbHMpO1xyXG4gICAgICAgIGNvbnNvbGUuZGlyKHRoaXMubW9kZWxzKTtcclxuICAgIH1cclxufVxyXG4iXX0=