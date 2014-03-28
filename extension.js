const Me = imports.misc.extensionUtils.getCurrentExtension();
const FreqView = Me.imports.freqView;
const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

let freqAllView, prevAllView;


function init() {
}

function enable() {
    freqAllView = new FreqView.FreqAllView();
    prevAllView = Main.overview.viewSelector.appDisplay._views[1].view;
    Main.overview.viewSelector.appDisplay._views[1].view = freqAllView;
    Main.overview.viewSelector.appDisplay._views[0].view.actor.hide();
    Main.overview.viewSelector.appDisplay._viewStack.remove_actor(prevAllView.actor);
    Main.overview.viewSelector.appDisplay._viewStack.add_actor(freqAllView.actor);
    Main.overview.viewSelector.appDisplay._redisplay();
    Main.overview.viewSelector.appDisplay._controls.hide();
}

function disable() {
    Main.overview.viewSelector.appDisplay._viewStack.remove_actor(freqAllView.actor);
    Main.overview.viewSelector.appDisplay._views[1].view = prevAllView;
    Main.overview.viewSelector.appDisplay._viewStack.add_actor(prevAllView.actor);
    freqAllView = null;
    Main.overview.viewSelector.appDisplay._redisplay();
    Main.overview.viewSelector.appDisplay._controls.show();
}
