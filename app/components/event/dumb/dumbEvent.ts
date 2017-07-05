import {Component, ElementRef, ViewChild, ChangeDetectionStrategy, Input, AfterViewChecked, OnInit, AfterViewInit} from '@angular/core';

@Component({
    selector: "dumb-event",
    template: `
    <Label class="h2" textWrap="true" *ngFor=" let model of models" [text]="models.id"></Label>`,
})
export class DumbComponent {
    @Input() models;

    constructor() {
        console.log("constructor: ");
        console.dir(this.models);
        console.dir(this.models);

    }

    AfterViewInit() {
        console.log("After view init: ");

        console.dir(this.models);
        console.dir(this.models);

    }

    AfterViewChecked() {
        console.log("after view checked: ");

        console.dir(this.models);
        console.dir(this.models);
    }
}
