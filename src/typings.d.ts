declare module 'html2pdf.js' {
  const html2pdf: any;
  export default html2pdf;
}

declare module 'file-saver' {
  const saveAs: any;
  export default saveAs;
}

declare module 'pdfmake/build/pdfmake' {
  const pdfMake: any;
  export = pdfMake;
}

declare module 'pdfmake/build/vfs_fonts' {
  const pdfFonts: any;
  export = pdfFonts;
}
