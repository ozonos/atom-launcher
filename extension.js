const St = imports.gi.St;
const Main = imports.ui.main;
const Tweener = imports.ui.tweener;

const Me = imports.misc.extensionUtils.getCurrentExtension();
const FreqView = Me.imports.freqView;
const Convenience = Me.imports.convenience;

let settings;
let freqAllView, prevAllView;


function init() {
}

function enable() {
    settings = Convenience.getSettings('org.gnome.shell.extensions.atom-launcher');

    freqAllView = new FreqView.FreqAllView(settings);
    prevAllView = Main.overview.viewSelector.appDisplay._views[1].view;

    Main.overview.viewSelector.appDisplay._views[1].view = freqAllView;
    Main.overview.viewSelector.appDisplay._views[0].view.actor.hide();
    Main.overview.viewSelector.appDisplay._viewStack.remove_actor(prevAllView.actor);
    Main.overview.viewSelector.appDisplay._viewStack.add_actor(freqAllView.actor);
    Main.overview.viewSelector.appDisplay._views[0].view._redisplay();
    Main.overview.viewSelector.appDisplay._views[1].view._redisplay();
    Main.overview.viewSelector.appDisplay._controls.hide();
}

function disable() {
    Main.overview.viewSelector.appDisplay._views[1].view = prevAllView;
    Main.overview.viewSelector.appDisplay._views[0].view.actor.show();
    Main.overview.viewSelector.appDisplay._viewStack.remove_actor(freqAllView.actor);
    Main.overview.viewSelector.appDisplay._viewStack.add_actor(prevAllView.actor);
    Main.overview.viewSelector.appDisplay._views[0].view._redisplay();
    Main.overview.viewSelector.appDisplay._views[1].view._redisplay();
    Main.overview.viewSelector.appDisplay._controls.show();

    freqAllView.destroy();
    settings.run_dispose();
    freqAllView = null;
}
