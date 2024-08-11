const {app, BrowserWindow, ipcMain} = require ("electron");
var path = require ("node:path");

function electron (url, context) {
	var createWindow = function () {
		win = new BrowserWindow ({
			title: "AFIFA Mart | Cashier POS",
			width: 1024,
			height: 600,
			autoHideMenuBar: true,
			center: true,
			icon:  path.join (__dirname, "icon.ico"),
			webPreferences: {
				preload: path.join (__dirname, "preload.js"),
				nodeIntegration: true,
				contextIsolation: false,
				webSecurity: false,
				},
			});
		win.loadURL (url);
		}
	app.whenReady ().then (function () {
		createWindow ();
		app.on ("activate", function () {
			if (BrowserWindow.getAllWindows ().length === 0) {
				createWindow ();
				}
			});
		});
	for (var i in context) {
		ipcMain.on (i, context [i]);
		}
	}

const thermal = require ("escpos");
thermal.USB = require ("escpos-usb");
function thermal_space (variable, left, right) {
	var space = 32 - (left + right).length;
	variable.text (left + (" ").repeat (space) + right);
	}

if (true) {
	electron ("https://cashier-pos-001.newbizen.com", {
		thermal: function (event, input) {
			var thermal_device = new thermal.USB ();
			var thermal_option = {encoding: "GB18030"}
			var thermal_printer = new thermal.Printer (thermal_device, thermal_option);
			if (input.action === "cash-draw:open") {
				thermal_device.open (function (error) {
					thermal_printer.cashdraw (2);
					thermal_printer.close ();
					});
				}
			if (input.action === "print") {
				thermal_device.open (function (error) {
					if (input.custom) {
						for (var i in input.custom) {
							var method = input.custom [i].method;
							var value = input.custom [i].value;
							if (method === "space") thermal_space (thermal_printer, ... value);
							else thermal_printer [method] (... value);
							}
						}
					else {
						thermal_printer.size (1, 1);
						thermal_printer.align ("ct");
						thermal_printer.text (input.store.name);
						thermal_printer.style ("none");
						thermal_printer.font ("A");
						thermal_printer.size (0.5, 0.5);
						for (var i in input.store.address) thermal_printer.text (input.store.address [i]);
						thermal_printer.text (input.store.phone);
						thermal_printer.text ("");
						thermal_printer.size (1, 0.5);
						thermal_printer.text (input.transaction.id);
						thermal_printer.text ("");
						thermal_printer.size (0.5, 0.5);
						thermal_space (thermal_printer, input.date, input.time);
						thermal_printer.text ("================================");
						thermal_space (thermal_printer, "NAMA", "HARGA");
						thermal_printer.text ("--------------------------------");
						for (var i in input.item) thermal_space (thermal_printer, input.item [i].name, input.item [i].price);
						thermal_printer.text ("--------------------------------");
						thermal_space (thermal_printer, "TOTAL", input.total);
						thermal_printer.text ("--------------------------------");
						thermal_space (thermal_printer, "TUNAI", input.cash);
						thermal_space (thermal_printer, "KEMBALI", input.exchange);
						thermal_printer.text ("================================");
						thermal_printer.text ("");
						for (var i in input.footer) thermal_printer.text (input.footer [i]);
						thermal_printer.text ("");
						thermal_printer.cut ();
						thermal_printer.cashdraw (2);
						thermal_printer.close ();
						}
					});
				}
			},
		})
	}
