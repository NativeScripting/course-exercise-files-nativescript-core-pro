import * as app from 'tns-core-modules/application';
import { setNativeEvents } from '~/globals/app-events/app-events-native';

export const setAppEvents = () => {
  setNativeEvents();

  app.on(app.launchEvent, function(_args: app.ApplicationEventData) {
    console.log('launchEvent');
  });

  app.on(app.displayedEvent, function(_args: app.ApplicationEventData) {
    console.log('displayedEvent');
  });

  app.on(app.suspendEvent, function(_args: app.ApplicationEventData) {
    console.log('suspendEvent');
  });

  app.on(app.resumeEvent, function(_args: app.ApplicationEventData) {
    console.log('resumeEvent');
  });

  app.on(app.exitEvent, function(_args: app.ApplicationEventData) {
    console.log('exitEvent');
  });

  app.on(app.lowMemoryEvent, function(_args: app.ApplicationEventData) {
    console.log('lowMemoryEvent');
  });

  app.on(app.uncaughtErrorEvent, function(_args: app.ApplicationEventData) {
    console.log('uncaughtErrorEvent');
  });

  app.on(app.orientationChangedEvent, function(
    _args: app.ApplicationEventData
  ) {
    console.log('orientationChangedEvent');
  });
};
