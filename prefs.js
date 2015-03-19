// -*- mode: js; js-indent-level: 4; indent-tabs-mode: nil -*-
/*jshint esnext: true */
/*jshint indent: 4 */

const Gio = imports.gi.Gio;
const GLib = imports.gi.GLib;
const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;
const Lang = imports.lang;
const Mainloop = imports.mainloop;

const Gettext = imports.gettext.domain('atomlauncher');
const _ = Gettext.gettext;
const N_ = function(e) { return e };

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();
const Convenience = Me.imports.convenience;


const AtomLauncherSettingsWidget = new GObject.Class({
    Name: 'AtomLauncher.AtomLauncherSettingsWidget',
    GTypeName: 'AtomLauncherSettingsWidget',
    Extends: Gtk.Box,

    _init: function(params) {
        this.parent(params);
        this.settings = Convenience.getSettings('org.gnome.shell.extensions.atom-launcher');

        /* Main Settins */
        let mainSettings = new Gtk.Box({orientation:Gtk.Orientation.VERTICAL});
        let mainSettingsTitle = new Gtk.Label({label:_("Main Settings")});
        mainSettings.add(mainSettingsTitle);

        /* Auto-show */
        let autoShowControl = new Gtk.Box({spacing:30, margin_left:10, margin_top:10, margin_right:10});
        let autoShowLabel = new Gtk.Label({label: _("Auto show when workspace is empty"),
                                            xalign: 0, hexpand:true});
        let autoShow = new Gtk.Switch({halign:Gtk.Align.END});
        autoShow.set_active(this.settings.get_boolean('auto-show'));
        autoShow.connect('notify::active', Lang.bind(this, function(check){
            this.settings.set_boolean('auto-show', check.get_active());
        }));
        autoShowControl.add(autoShowLabel);
        autoShowControl.add(autoShow);

        /* Add everything */
        mainSettings.add(autoShowControl);

        this.add(mainSettings);
    }
});

function init() {
    Convenience.initTranslations();
}

function buildPrefsWidget() {
    let widget = new AtomLauncherSettingsWidget({orientation: Gtk.Orientation.VERTICAL,
                                                spacing:5, border_width:5});
    widget.show_all();
    return widget;
}

/*
* Add a margin to the widget:
* left margin in LTR
* right margin in RTL
*/
function indentWidget(widget){
    let indent = 20;
    if(Gtk.Widget.get_default_direction() == Gtk.TextDirection.RTL){
        widget.set_margin_right(indent);
    } else {
        widget.set_margin_left(indent);
    }
}