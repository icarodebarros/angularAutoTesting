import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AlertButtonComponent } from './alert-button.component';
import { MessageService } from '../services/message.service';
import { of } from 'rxjs';

describe('AlertButtonComponent', () => {
  let component: AlertButtonComponent;
  let fixture: ComponentFixture<AlertButtonComponent>;

  // How to deal with external services
  // 1) Use a SUB:
  // let messageServiceSTUB: any;

  // 2) Use the jasmine.Spy with the real service
  let messageService: MessageService;
  let spy: jasmine.Spy;

  beforeEach(async(() => {
    // messageServiceSTUB = {
    //   getContent: () => of('You have been warned!'),
    // };

    TestBed.configureTestingModule({
      declarations: [ AlertButtonComponent ],
      // providers: [{ provide: MessageService, useValue: messageServiceSTUB }] // provide the Stub instead of the real service
      providers: [ MessageService ] // provide the real service because now we're using Spy
    })
    .compileComponents(); // compiles template and css
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertButtonComponent);
    component = fixture.componentInstance;

    messageService = fixture.debugElement.injector.get(MessageService);
    spy = spyOn(messageService, 'getContent').and.returnValue(of('You have been warned!'));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should have a message with `warn`', () => {
  //   expect(component.content).toContain('warn'); // search for substring
  //   // expect(component.content).toBe('warn'); // search for the exact string
  // });

  it('should have a severity greater than 2', () => {
    expect(component.severity).toBeGreaterThan(2);
  });

  it('should have an H1 tag of `Alert Button`', () => {
    // const de = fixture.debugElement;
    // expect(de.query(By.css('h1')).nativeElement.innerText).toBe('Alert Button');
    const nativeElement = fixture.nativeElement;
    expect(nativeElement.querySelector('h1').textContent).toBe('Alert Button');
  });

  it('should toggle the message boolean', () => {
    expect(component.hideContent).toBeTruthy();
    component.toggle();
    expect(component.hideContent).toBeFalsy();
  });

  it('should toggle the message boolean asynchronously', fakeAsync(() => {
    expect(component.hideContent).toBeTruthy();
    component.toggleAsync();
    tick(500);
    expect(component.hideContent).toBeFalsy();
  }));

  it('should have message content defined from an observable', () => {
    component.content
      .subscribe(content => {
        expect(content).toBe('You have been warned!');
      });
  });

  it('should call getContent one time and update the view', () => {
    expect(spy).toHaveBeenCalled(); // make sure if the service's method was called
    expect(spy.calls.all().length).toEqual(1); // make sure it was colled once

    expect(fixture.debugElement.query(By.css('.message-body')).nativeElement.innerText)
      .toContain('warn'); // comfirm if the method return our message and change the html
  });

});
