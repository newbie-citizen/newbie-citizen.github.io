const escpos = require('escpos');
// install escpos-usb adapter module manually
escpos.USB = require('escpos-usb');
// Select the adapter based on your printer type
const device  = new escpos.USB();
// const device  = new escpos.Network('localhost');
// const device  = new escpos.Serial('/dev/usb/lp0');

const options = { encoding: "GB18030" /* default */ }
// encoding is optional

const printer = new escpos.Printer(device, options);

device.open(function(error){
  printer
.size(1, 1)
.align("ct")
.text('AFIFA MART')
.style("none")
.font("A")
.size(0.5, 0.5)
.text('JL. MEDAN BANDA ACEH')
.text('MONTASIK')
.text('08123456789')
.text('')
.size(1, 0.5)
.text('NO.123-12345-12')
.text('')
.size(0.5, 0.5)
.align("rt").text('KAMIS 08/08/2024    JAM 12:12:12')
.text('================================')
.text('ITEM                       HARGA')
.text('--------------------------------')
.text('SABUN X 1                 12.000')
.text('MAGNUM 12 X 1             25.000')
.text('SUSU BENDERA SKM X 2       5.000')
.text('-------------------------------=')
.text('TOTAL                     42.000')
.text('--------------------------------')
.text('TUNAI                     50.000')
.text('KEMBALI                    8.000')
.text('================================')
.text('')
.align("ct")
.text('TERIMA KASIH')
.text('SELAMAT KEMBALI LAGI')
.text('')








// .table(["ITEM", "", "HARGA"])
// .tableCustom([
// {text:"SABUN", align:"LEFT", width:0.33, style: 'B'},
// {text:":", align:"CENTER", width:0.33},
// {text:"999.999", align:"RIGHT", width:0.33}
// ],{ encoding: 'utf8', size: [1, 1] })
  // .barcode('1234567', 'EAN8')
  // .table(["One", "Two", "Three"])
  // .tableCustom(
  //   [
  //     { text:"Left", align:"LEFT", width:0.33, style: 'B' },
  //     { text:"Center", align:"CENTER", width:0.33},
  //     { text:"Right", align:"RIGHT", width:0.33 }
  //   ],
  //   { encoding: 'cp857', size: [1, 1] } // Optional
  // )
  // .qrimage('https://github.com/song940/node-escpos', function(err){
  //   this.cut();
  //   this.close();
  // })
	.cut()
.cashdraw(2)
.close();
});
