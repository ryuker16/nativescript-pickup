"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVtYkV2ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZHVtYkV2ZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXdJO0FBT3hJLElBQWEsYUFBYTtJQUd0QjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDN0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFN0IsQ0FBQztJQUVELHFDQUFhLEdBQWI7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFN0IsQ0FBQztJQUVELHdDQUFnQixHQUFoQjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUVwQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0wsb0JBQUM7QUFBRCxDQUFDLEFBeEJELElBd0JDO0FBdkJZO0lBQVIsWUFBSyxFQUFFOzs2Q0FBUTtBQURQLGFBQWE7SUFMekIsZ0JBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFFBQVEsRUFBRSwyR0FDa0Y7S0FDL0YsQ0FBQzs7R0FDVyxhQUFhLENBd0J6QjtBQXhCWSxzQ0FBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBJbnB1dCwgQWZ0ZXJWaWV3Q2hlY2tlZCwgT25Jbml0LCBBZnRlclZpZXdJbml0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwiZHVtYi1ldmVudFwiLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuICAgIDxMYWJlbCBjbGFzcz1cImgyXCIgdGV4dFdyYXA9XCJ0cnVlXCIgKm5nRm9yPVwiIGxldCBtb2RlbCBvZiBtb2RlbHNcIiBbdGV4dF09XCJtb2RlbHMuaWRcIj48L0xhYmVsPmAsXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEdW1iQ29tcG9uZW50IHtcclxuICAgIEBJbnB1dCgpIG1vZGVscztcclxuXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcImNvbnN0cnVjdG9yOiBcIik7XHJcbiAgICAgICAgY29uc29sZS5kaXIodGhpcy5tb2RlbHMpO1xyXG4gICAgICAgIGNvbnNvbGUuZGlyKHRoaXMubW9kZWxzKTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgQWZ0ZXJWaWV3SW5pdCgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkFmdGVyIHZpZXcgaW5pdDogXCIpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmRpcih0aGlzLm1vZGVscyk7XHJcbiAgICAgICAgY29uc29sZS5kaXIodGhpcy5tb2RlbHMpO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBBZnRlclZpZXdDaGVja2VkKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiYWZ0ZXIgdmlldyBjaGVja2VkOiBcIik7XHJcblxyXG4gICAgICAgIGNvbnNvbGUuZGlyKHRoaXMubW9kZWxzKTtcclxuICAgICAgICBjb25zb2xlLmRpcih0aGlzLm1vZGVscyk7XHJcbiAgICB9XHJcbn1cclxuIl19